import Image from 'next/image';

export function BrandMascot({ size }: { size: number }) {
  return <Image
    className="brand-mascot"
    src="/assets/enosh-mascot-logo.webp"
    alt=""
    width={size}
    height={size}
    unoptimized
  />;
}
