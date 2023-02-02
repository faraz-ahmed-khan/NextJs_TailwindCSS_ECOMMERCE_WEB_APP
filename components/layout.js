import React, { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { Store } from '@/utilites/Store';
import 'react-toastify/dist/ReactToastify.css';
import { signOut, useSession } from 'next-auth/react';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';

const layout = ({ title, children }) => {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemCount, setcartItemCount] = useState(0);
  useEffect(() => {
    setcartItemCount(cart.cartItem.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItem]);

  const logotclickhandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };
  return (
    <>
      <Head>
        <title>{title ? title + ' E-Com' : 'E-Com'}</title>
        <meta name="description" content="E-commerce Web app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href={'/'}>
              <p className="text-lg font-bold">E-Com</p>
            </Link>
            <div className="flex justify-between">
              <Link href={'/cart'}>
                <p className="px-2">
                  Cart
                  {cartItemCount > 0 && (
                    <span className="ml-1  rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemCount}
                    </span>
                  )}
                </p>
              </Link>
              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-indigo-800">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 bg-white origin-top-right shadow-lg">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order_history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <p
                        className="dropdown-link cursor-pointer"
                        href="#"
                        onClick={logotclickhandler}
                      >
                        Logout
                      </p>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href={'/login'}>
                  <p>login</p>
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner">
          All Rights are reserved.
        </footer>
      </div>
    </>
  );
};

export default layout;
