import { ArchiveCase, archiveMetadata } from '../../../components/archive-case';

export const metadata = archiveMetadata('eeg-addiction-detection');

export default function Page() {
  return <ArchiveCase slug="eeg-addiction-detection" />;
}
