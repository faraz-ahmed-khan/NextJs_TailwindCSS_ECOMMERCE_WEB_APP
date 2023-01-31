import Layout from '@/components/layout';
import ProductItem from '@/components/ProductItem';
import data from '../utilites/data';

export default function Home() {
  console.log(data);
  return (
    <>
      <Layout title={'Home Page'}>
        <div className="grid gird-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {data.products.map((product) => {
            return (
              <ProductItem product={product} key={product.slug}></ProductItem>
            );
          })}
        </div>
      </Layout>
    </>
  );
}
