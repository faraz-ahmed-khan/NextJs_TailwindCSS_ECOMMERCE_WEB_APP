import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
const layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + ' E-Com' : 'E-Com'}</title>
        <meta name="description" content="E-commerce Web app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link href={'/'}>
              <p className="text-lg font-bold">E-Com</p>
            </Link>
            <div className="flex justify-between">
              <Link href={'/cart'}>
                <p className="px-4">Cart</p>
              </Link>
              <Link href={'/login'}>
                <p>Login</p>
              </Link>
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
