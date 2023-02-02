import '@/styles/globals.css';
import { StoreProvider } from '@/utilites/Store';

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
