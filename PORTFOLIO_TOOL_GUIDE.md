# Portfolio Push CLI

This portfolio is data-driven. Projects live in `content/portfolio.json`, and the included command-line tool updates that file for you. You do not need to edit React or CSS when adding routine project work.

## First-time setup

Open PowerShell inside the extracted portfolio folder.

```powershell
npm install
npm run portfolio:doctor
```

Create an empty repository in your GitHub account, then connect this folder once:

```powershell
git init
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_PORTFOLIO_REPO.git
git add .
git commit -m "Initial portfolio"
git push -u origin main
```

For automatic website deployment, import that GitHub repository into Vercel once. After the initial Vercel connection, every successful GitHub push triggers a new deployment automatically.

## Easiest way to add a project

Run the guided wizard:

```powershell
npm run portfolio:wizard
```

It asks for the project title, description, proof/result, stack, GitHub URL and live URL. When it finishes, preview the site:

```powershell
npm run dev
```

## Add a project with one command

```powershell
npm run portfolio:add -- --title "My New Project" --type "Full-stack product · Live" --summary "A short explanation of the real problem it solves." --outcome "The strongest result or proof." --stack "Next.js,Python,PostgreSQL" --repo "https://github.com/YOUR_USERNAME/my-new-project" --live "https://my-new-project.vercel.app" --accent "blue"
```

Allowed accent values: `blue`, `violet`, `green`, `orange`, `red`, `cyan`.

If the public GitHub repository has a good description, the tool can read its basic metadata:

```powershell
npm run portfolio:add -- --repo "https://github.com/YOUR_USERNAME/my-project" --live "https://my-project.vercel.app"
```

## Check and remove projects

```powershell
npm run portfolio:list
npm run portfolio:remove -- --title "Exact Project Name"
```

## Validate, commit and push

This runs code checks and a production build before committing the project data and pushing the current branch:

```powershell
npm run portfolio:push -- --message "Add My New Project"
```

By default, only `content/portfolio.json` is committed. To push every changed file in the repository:

```powershell
npm run portfolio:push -- --all --message "Update portfolio design and projects"
```

Use `--skip-build` only when you intentionally want a faster push and understand that the production build will not be checked locally:

```powershell
npm run portfolio:push -- --skip-build --message "Fix project link"
```

## Safety behavior

- The tool refuses duplicate project names.
- It refuses to push when the GitHub `origin` remote is missing.
- It runs lint and a production build before normal pushes.
- It commits only project data unless you explicitly pass `--all`.
- GitHub authentication remains handled by Git/GitHub Credential Manager; the tool never stores tokens.

## Recommended workflow

```powershell
npm run portfolio:wizard
npm run dev
npm run portfolio:push -- --message "Add project name"
```

That is the complete regular workflow: answer the wizard, review locally, then push.
