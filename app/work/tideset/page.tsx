import { CaseStudy, caseMetadata } from '../../../components/case-study';

export const metadata = caseMetadata('tideset');

export default function Page() {
  return <CaseStudy slug="tideset" />;
}
