import { ArchiveCase, archiveMetadata } from '../../../components/archive-case';

export const metadata = archiveMetadata('rule-zero');

export default function Page() {
  return <ArchiveCase slug="rule-zero" />;
}
