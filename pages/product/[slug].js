import Layout from '../../components/layout';
import NextLink from 'next/link';
import React from 'react';
import data from '../../utils/data';
import { useRouter } from 'next/router';

export default function ProductScreen() {
  const router = useRouter();
  const { slug } = router.query;
  const product = data.products.find((a) => a.slug === slug);
  if (!product) {
    return <div>No Product Available</div>;
  }
  return (
    <Layout title={product.title}>
      <div>
        <NextLink>back to product</NextLink>
      </div>
    </Layout>
  );
}
