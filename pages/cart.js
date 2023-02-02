import { Store } from '@/utilites/Store';
import { XCircleIcon } from '@heroicons/react/outline';
import Layout from '@/components/layout';
import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CartScreen = () => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItem },
  } = state;
  const router = useRouter();
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItem.length === 0 ? (
        <div>
          Cart is empty . <Link href={'/'}>Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className='"px-5 text-left'>Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right"> Price</th>
                  <th className="p-5 "> Action</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItem.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <p className="flex items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          &nbsp;
                          {item.name}
                        </p>
                      </Link>
                    </td>
                    <td className="p-5 text-right">{item.quantity}</td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5"></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className=" card p-5 ">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal({cartItem.reduce((a, c) => a + c.quantity, 0)}) {''}:
                  ${cartItem.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push('/shipping')}
                  className="primary-button w-full"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CartScreen;
