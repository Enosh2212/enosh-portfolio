import { ArchiveCase, archiveMetadata } from '../../../components/archive-case';

export const metadata = archiveMetadata('vibefix');

export default function Page() {
  return <ArchiveCase slug="vibefix" />;
}
