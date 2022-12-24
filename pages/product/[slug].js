import {
  Button,
  Card,
  CardMedia,
  Grid,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import React, { useContext } from 'react';

import Layout from '../../components/layout';
import NextLink from 'next/link';
import Product from '../../models/Product';
import { Store } from '../../utils/Store';
import axios from 'axios';
import db from '../../utils/db';
import useStyles from '../../utils/styles';

// import data from '../../utils/data';

// import { useRouter } from 'next/router';

export default function ProductScreen(props) {
  const { dispatch } = useContext(Store);
  const { product } = props;
  const classes = useStyles();
  // const router = useRouter();
  // const { slug } = router.query;
  // const product = data.products.find((a) => a.slug === slug);
  if (!product) {
    return <div>No Product Available</div>;
  }
  const addToCart = async () => {
    const data = await axios.get(`/api/products/${product._id}`);
    if (data.count <= 0) {
      window.alert('Out of Stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: 1 } });
  };
  return (
    <Layout title={product.title} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/">
          <Typography color="primary">back to products</Typography>
        </NextLink>
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
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.title}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating: {product.rating} stars ({product.reviews} reviews)
              </Typography>
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
                      {product.count > 0 ? 'In Stock' : 'Out of Stock'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCart}
                >
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
export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
