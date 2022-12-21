import {
  Button,
  Card,
  CardMedia,
  Grid,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';

import Image from 'next/image';
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
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          {/* <Image
            src={product.image}
            alt={product.title}
            width={240}
            height={240}
            layout="responsive"
          ></Image> */}
          <CardMedia
            component="img"
            height="400"
            image={product.image}
            title={product.title}
          ></CardMedia>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>Category: {product.category}</ListItem>
            <ListItem>
              Rating: {product.rating.rate} stars ({product.rating.count}{' '}
              reviews)
            </ListItem>
            <ListItem>
              <Typography>Description: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>Rs {product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.rating.count > 0 ? 'In Stock' : 'Out of Stock'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button fullWidth variant="contained" color="primary">
                  {' '}
                  Add to Cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
