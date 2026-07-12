#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const contentFile = resolve(root, "content", "portfolio.json");
const accents = ["blue", "violet", "green", "orange", "red", "cyan"];

function loadPortfolio() {
  return JSON.parse(readFileSync(contentFile, "utf8"));
}

function savePortfolio(data) {
  writeFileSync(contentFile, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function parseArgs(raw) {
  const values = {};
  for (let index = 0; index < raw.length; index += 1) {
    const token = raw[index];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = raw[index + 1];
    if (!next || next.startsWith("--")) {
      values[key] = true;
    } else {
      values[key] = next;
      index += 1;
    }
  }
  return values;
}

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function splitStack(value) {
  return clean(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function titleFromRepo(name) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function repoSlug(value) {
  const match = clean(value).match(/github\.com[/:]([^/]+)\/([^/#]+?)(?:\.git)?$/i);
  return match ? `${match[1]}/${match[2]}` : "";
}

async function fetchRepoDetails(repoUrl) {
  const slug = repoSlug(repoUrl);
  if (!slug) return null;
  try {
    const response = await fetch(`https://api.github.com/repos/${slug}`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "portfolio-push-cli" },
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

function nextNumber(projects) {
  const max = projects.reduce((current, project) => {
    const value = Number.parseInt(project.number, 10);
    return Number.isFinite(value) ? Math.max(current, value) : current;
  }, 0);
  return String(max + 1).padStart(2, "0");
}

async function addProject(values) {
  const data = loadPortfolio();
  const repoUrl = clean(values.repo || values.source);
  const metadata = repoUrl ? await fetchRepoDetails(repoUrl) : null;
  const title = clean(values.title) || (metadata ? titleFromRepo(metadata.name) : "");
  const summary = clean(values.summary) || clean(metadata?.description);

  if (!title || !summary) {
    throw new Error("Project title and summary are required. Use --title and --summary, or provide a public --repo with a description.");
  }

  if (data.projects.some((project) => project.title.toLowerCase() === title.toLowerCase())) {
    throw new Error(`A project named \"${title}\" already exists.`);
  }

  const stack = splitStack(values.stack);
  if (stack.length === 0 && metadata?.language) stack.push(metadata.language);
  if (stack.length === 0) stack.push("Project");

  const accent = accents.includes(clean(values.accent)) ? clean(values.accent) : "blue";
  const project = {
    number: nextNumber(data.projects),
    title,
    type: clean(values.type) || "Selected project",
    summary,
    outcome: clean(values.outcome) || "See the repository for implementation details and current project status.",
    stack,
    ...(clean(values.live) ? { live: clean(values.live) } : {}),
    ...(repoUrl ? { source: metadata?.html_url || repoUrl } : {}),
    ...(clean(values.caseStudy) ? { caseStudy: clean(values.caseStudy) } : {}),
    accent,
    ...(values.featured === true || values.featured === "yes" ? { featured: true } : {}),
  };

  data.projects.push(project);
  savePortfolio(data);
  console.log(`\nAdded: ${project.number} — ${project.title}`);
  console.log("Next: npm run portfolio:push -- --message \"Add project to portfolio\"");
}

async function wizard() {
  const rl = createInterface({ input, output });
  console.log("\nPortfolio Project Wizard\n");
  try {
    const repo = await rl.question("GitHub repository URL (optional): ");
    const title = await rl.question("Project title: ");
    const type = await rl.question("Short type, e.g. Full-stack product · Live: ");
    const summary = await rl.question("One-sentence project summary: ");
    const outcome = await rl.question("Result / proof / metric: ");
    const stack = await rl.question("Tech stack, comma separated: ");
    const live = await rl.question("Live deployment URL (optional): ");
    const caseStudy = await rl.question("Case-study URL (optional): ");
    const accent = await rl.question(`Accent ${accents.join("/")} [blue]: `);
    const featured = await rl.question("Mark as featured? yes/no [no]: ");
    await addProject({ repo, title, type, summary, outcome, stack, live, caseStudy, accent, featured });
  } finally {
    rl.close();
  }
}

function listProjects() {
  const data = loadPortfolio();
  console.log("\nPortfolio projects\n");
  for (const project of data.projects) {
    const status = project.live ? "LIVE" : project.source ? "SOURCE" : "CASE STUDY";
    console.log(`${project.number}. ${project.title} [${status}]`);
  }
  console.log("");
}

function removeProject(values) {
  const title = clean(values.title);
  if (!title) throw new Error("Use --title \"Exact Project Name\".");
  const data = loadPortfolio();
  const before = data.projects.length;
  data.projects = data.projects.filter((project) => project.title.toLowerCase() !== title.toLowerCase());
  if (data.projects.length === before) throw new Error(`Project \"${title}\" was not found.`);
  data.projects = data.projects.map((project, index) => ({ ...project, number: String(index + 1).padStart(2, "0") }));
  savePortfolio(data);
  console.log(`Removed: ${title}`);
}

function run(command, args, options = {}) {
  const executable = process.platform === "win32" && command === "npm" ? "npm.cmd" : command;
  const result = spawnSync(executable, args, {
    cwd: root,
    stdio: options.capture ? "pipe" : "inherit",
    encoding: "utf8",
  });
  if (!options.allowFailure && result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed.`);
  }
  return result;
}

function doctor() {
  console.log("\nPortfolio Push Doctor\n");
  console.log(`Node: ${process.version}`);
  const git = run("git", ["--version"], { capture: true, allowFailure: true });
  console.log(`Git: ${git.status === 0 ? git.stdout.trim() : "not found"}`);
  const remote = run("git", ["remote", "get-url", "origin"], { capture: true, allowFailure: true });
  console.log(`Origin: ${remote.status === 0 ? remote.stdout.trim() : "not configured"}`);
  const branch = run("git", ["branch", "--show-current"], { capture: true, allowFailure: true });
  console.log(`Branch: ${branch.status === 0 && branch.stdout.trim() ? branch.stdout.trim() : "not available"}`);
  console.log(remote.status === 0 ? "\nReady to push." : "\nRun the one-time GitHub setup in PORTFOLIO_TOOL_GUIDE.md.");
}

function pushChanges(values) {
  const remote = run("git", ["remote", "get-url", "origin"], { capture: true, allowFailure: true });
  if (remote.status !== 0) throw new Error("GitHub remote 'origin' is not configured. Follow PORTFOLIO_TOOL_GUIDE.md first.");

  console.log("\n1/4 Checking portfolio…");
  run("npm", ["run", "lint"]);
  if (!values["skip-build"]) {
    console.log("\n2/4 Building production site…");
    run("npm", ["run", "build"]);
  } else {
    console.log("\n2/4 Build skipped by request.");
  }

  console.log("\n3/4 Creating Git commit…");
  run("git", values.all ? ["add", "-A"] : ["add", "content/portfolio.json"]);
  const staged = run("git", ["diff", "--cached", "--quiet"], { capture: true, allowFailure: true });
  if (staged.status === 0) {
    console.log("Nothing new to push.");
    return;
  }
  const message = clean(values.message) || "Update portfolio projects";
  run("git", ["commit", "-m", message]);

  console.log("\n4/4 Pushing to GitHub…");
  run("git", ["push", "origin", "HEAD"]);
  console.log("\nDone. GitHub received the update.");
}

function help() {
  console.log(`
Portfolio Push CLI

  npm run portfolio:wizard
  npm run portfolio:list
  npm run portfolio:add -- --title "My Project" --summary "What it does" --repo "https://github.com/user/repo" --live "https://example.com" --stack "React,Node.js"
  npm run portfolio:remove -- --title "My Project"
  npm run portfolio:doctor
  npm run portfolio:push -- --message "Add My Project"

Use portfolio:push -- --all to include every changed file, not only portfolio.json.
Read PORTFOLIO_TOOL_GUIDE.md for one-time GitHub and deployment setup.
`);
}

const [command = "help", ...rawArgs] = process.argv.slice(2);
const values = parseArgs(rawArgs);

try {
  if (command === "wizard") await wizard();
  else if (command === "add") await addProject(values);
  else if (command === "list") listProjects();
  else if (command === "remove") removeProject(values);
  else if (command === "doctor") doctor();
  else if (command === "push") pushChanges(values);
  else help();
} catch (error) {
  console.error(`\nError: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
