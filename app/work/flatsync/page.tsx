import { ArchiveCase, archiveMetadata } from '../../../components/archive-case';

export const metadata = archiveMetadata('flatsync');

export default function Page() {
  return <ArchiveCase slug="flatsync" />;
}
