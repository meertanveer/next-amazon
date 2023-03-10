import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';

import Layout from '../components/layout';
import NextLink from 'next/link';
import Product from '../models/Product';
// import data from '../utils/data';
import db from '../utils/db';

export default function Home(props) {
  const { products } = props;
  function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
    // remove accents, swap ñ for n, etc
    var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
    var to = 'aaaaeeeeiiiioooouuuunc------';
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    str = str
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes
    return str;
  }
  return (
    <Layout>
      <h1>Products</h1>
      <Grid container spacing={2}>
        {products.map((product) => {
          const slug = slugify(product.title);
          console.log(product.title);
          console.log(slug);
          return (
            <Grid item sm={2} key={product.title}>
              <Card>
                <NextLink href={`/product/${slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="220"
                      image={product.image}
                      title={product.title}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{product.title}</Typography>
                      <Typography>Rs: {product.price}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Button size="small" color="primary">
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Layout>
  );
}
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
