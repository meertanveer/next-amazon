import Layout from '../../components/layout';
import NextLink from 'next/link';
import React from 'react';
import data from '../../utils/data';
import { useRouter } from 'next/router';
import useStyles from '../../utils/styles';

export default function ProductScreen() {
  const classes = useStyles();
  const router = useRouter();
  const { slug } = router.query;
  const product = data.products.find((a) => a.slug === slug);
  if (!product) {
    return <div>No Product Available</div>;
  }
  return (
    <Layout title={product.title}>
      <div className={classes.section}>
        <NextLink href="/">back to product</NextLink>
      </div>
    </Layout>
  );
}
