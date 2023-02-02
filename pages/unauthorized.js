import Layout from '@/components/layout';
import { useRouter } from 'next/router';
import React from 'react';

const Unauthorized = () => {
  const router = useRouter();
  const { message } = router.query;
  return (
    <Layout title={'Unauthrized Page'}>
      <h1 className="text-xl">Access Denied</h1>
      {message && <div className="mb-4 text-red-500">{message}</div>}
    </Layout>
  );
};

export default Unauthorized;
