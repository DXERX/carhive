"use client"

import Link from 'next/link';
import { CarhiveLogo } from './icons/carhive-logo';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';

interface BrandInfo {
  brandName: string;
  logoUrl: string;
}

export function LogoLink() {
  const [brandInfo, setBrandInfo] = useState<BrandInfo>({
    brandName: 'CarHive',
    logoUrl: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/brand-info')
      .then((res) => res.json())
      .then((data) => {
        setBrandInfo(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Button
      variant={'link'}
      className="-ml-1 h-auto rounded-sm p-1 pl-0 text-black hover:text-black"
      asChild
    >
      <Link href="/">
        {!isLoading && brandInfo.logoUrl ? (
          <img
            src={brandInfo.logoUrl}
            alt={brandInfo.brandName}
            className="h-4 shrink-0 lg:h-[17px] object-contain"
          />
        ) : !isLoading && brandInfo.brandName !== 'CarHive' ? (
          <span className="text-lg font-bold">{brandInfo.brandName}</span>
        ) : (
          <CarhiveLogo className="h-4 shrink-0 lg:h-[17px]" />
        )}
      </Link>
    </Button>
  );
}

