import { ArchiveCase, archiveMetadata } from '../../../components/archive-case';

export const metadata = archiveMetadata('notely');

export default function Page() {
  return <ArchiveCase slug="notely" />;
}
