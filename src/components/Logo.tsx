"use client"
import { Image } from '@mantine/core';
import Link from 'next/link';

interface Props {
  h?: number;
  w?: number | string;
}

export default function Logo({ h = 20, w = 'auto' }: Props) {
  return (
    <Link href="/">
      <Image src="/logo.png" h={h} w={w} alt="DocShare" />
    </Link>
  );
}
