import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import Layout from '../components/Layout';
import NextLink from 'next/link';
import db from '../utils/db';
import Product from '../models/Product';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import { useRouter } from 'next/dist/client/router';

export default function Home(props) {
  const { products } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const addToCartHandler = async (product) => {
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
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.slug}>
              <div className="card-container">
                <Card className="card">
                  <NextLink href={`/product/${product.slug}`} passHref>
                    <CardActionArea className="card-head">
                      <CardMedia
                        style={{
                          padding: '4px',
                          marginTop: '-2px',
                          marginLeft: '10px',
                        }}
                        className="card-logo"
                        component="img"
                        image={product.brandLogo}
                        title={product.name}
                      ></CardMedia>
                      <CardMedia
                        style={{ top: '-30' }}
                        className="product-img"
                        component="img"
                        image={product.image}
                        title={product.name}
                      ></CardMedia>
                      <Typography className="product-detail">
                        {product.capacity}
                      </Typography>
                      <Typography className="back-text">Maji</Typography>
                    </CardActionArea>
                  </NextLink>
                  <div className="card-body">
                    <span className="badge">{product.category}</span>
                    <div className="product-desc">
                      <span className="product-title">{product.name}</span>

                      <span className="product-caption">
                        {product.description}
                      </span>
                    </div>
                    <CardActions
                      style={{ marginLeft: '150px' }}
                      className="product-price"
                    >
                      <Button
                        size="small"
                        style={{ color: '#F1FAEE' }}
                        onClick={() => addToCartHandler(product)}
                      >
                        <b>Add to cart</b>
                      </Button>
                    </CardActions>
                    <div className="">
                      <span className="product-color">
                        <h4>Ksh. {product.price}</h4>
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
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
