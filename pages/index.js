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
import data from '../utils/data';

export default function Home() {
  return (
    <Layout>
      <h1>Products</h1>
      <h1>Products</h1>
      <Grid container spacing={2}>
        {data.products.map((product) => {
          return (
            <Grid item sm={2} key={product.title}>
              <Card>
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
                    <Typography>Stock: {product.rating.count}</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Typography>Rating: {product.rating.rate}</Typography>
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
