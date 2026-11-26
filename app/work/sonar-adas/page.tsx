import { ArchiveCase, archiveMetadata } from '../../../components/archive-case';

export const metadata = archiveMetadata('sonar-adas');

export default function Page() {
  return <ArchiveCase slug="sonar-adas" />;
}
