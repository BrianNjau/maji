import React, { useContext } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { Grid, Link, ListItem, Typography, Button, Paper } from '@mui/material';
import useStyles from '../../utils/styles';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import db from '../../utils/db';
import Product from '../../models/Product';
import axios from 'axios';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/dist/client/router';

export default function ProductScreen(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { product } = props;
  const classes = useStyles();
  if (!product) {
    return <div> Product not found </div>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link className={classes.backLink}>
            <KeyboardBackspaceRoundedIcon /> back to products
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          />
        </Grid>

        <Grid item md={3} xs={12}>
          <Paper>
            <ListItem>
              <Typography component="h1" variant="h1">
                {' '}
                {product.name}{' '}
              </Typography>{' '}
            </ListItem>

            <ListItem>
              {' '}
              <Typography>Category: {product.category} </Typography>
            </ListItem>
            <ListItem>
              {' '}
              <Typography> Brand: {product.brand}</Typography>{' '}
            </ListItem>
            <ListItem>
              {' '}
              <Typography>
                {' '}
                Rating: {product.rating} stars({product.numReviews} reviews)
              </Typography>{' '}
            </ListItem>
            <ListItem>
              {' '}
              <Typography> Capacity: {product.capacity} </Typography>
            </ListItem>
          </Paper>
          <Paper style={{ marginTop: '15px' }}>
            <ListItem>
              <Typography>
                Description: <br /> {product.description}
              </Typography>{' '}
            </ListItem>
          </Paper>
        </Grid>
        <Grid item md={3}>
          <Paper>
            <ListItem>
              <Grid container>
                <Grid item xs={6}>
                  <Typography>Price</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>Ksh.{product.price}</Typography>
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
                    {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Button
                onClick={addToCartHandler}
                fullWidth
                variant="contained"
                color="primary"
              >
                Add to cart
              </Button>
            </ListItem>
          </Paper>
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
