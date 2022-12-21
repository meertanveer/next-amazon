import Layout from '../../components/layout';
import React from 'react';
import data from '../../utils/data';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
export default function ProductScreen() {
  const router = useRouter();
  const { slug } = router.query;
  const product = data.products.find((a) => a.slug === slug);
  if (!product) {
    return <div>No Product Available</div>;
  }
  return <Layout></Layout>;
}
