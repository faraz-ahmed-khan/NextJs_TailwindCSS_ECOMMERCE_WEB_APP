import Layout from '@/components/layout';
import data from '@/utilites/data';
import { Store } from '@/utilites/Store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

const ProductScreen = () => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { slug } = router.query;
  const product = data.products.find((x) => x.slug === slug);
  if (!product) {
    return <div> product not found</div>;
  }

  const addToCardHandler = () => {
    const existItem = state.cart.cartItem.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert('Sorry, product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href={'/'}>back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Categiory:{product.category}</li>
            <li>Brand:{product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description:{product.description}</li>
          </ul>
        </div>
        <div className="card p-5 h-36">
          <div className="mb-2 flex justify-between ">
            <div>Price</div>
            <div>${product.price}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>Status</div>
            <div>{product.countInStock > 0 ? 'in Stock' : 'Out of Stock'}</div>
          </div>
          <button className="primary-button w-full" onClick={addToCardHandler}>
            Add to cart
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductScreen;
