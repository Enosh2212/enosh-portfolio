import { ArchiveCase, archiveMetadata } from '../../../components/archive-case';

export const metadata = archiveMetadata('coffee-shop-dashboard');

export default function Page() {
  return <ArchiveCase slug="coffee-shop-dashboard" />;
}
