import React, { useContext, useEffect, useState } from 'react';
import Layout from '@/components/layout';
import CheckOutWizard from '@/components/CheckOutWizard';
import { useRouter } from 'next/router';
import { Store } from '@/utilites/Store';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export default function PaymentScreen() {
  const [selectPaymentMethod, setSelectedPaymentMethod] = useState('');
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('farz');
    if (!selectPaymentMethod) {
      console.log('Dsd');
      return toast.error('Payment method is required');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectPaymentMethod });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectPaymentMethod,
      })
    );
    console.log(state);
    router.push('/placeorder');
  };

  useEffect(() => {
    if (!shippingAddress) {
      return router.push('/shipping');
    }
    setSelectedPaymentMethod(paymentMethod || '');
  }, [paymentMethod, router, shippingAddress]);

  return (
    <Layout title="Payment Method">
      <CheckOutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-md"></form>
      <h1 className="mb-4 text-xl"> Payment Method</h1>
      {['Paypal', 'Strip', 'CashOnDelivery'].map((payment) => {
        return (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />
            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        );
      })}
      <div className="mb-4 flex justify-between">
        <button
          className="default-button"
          type="button"
          onClick={() => router.push('/shipping')}
        >
          Back
        </button>
        <button
          className="primary-button"
          type="submit"
          onClick={submitHandler}
        >
          Next
        </button>
      </div>
    </Layout>
  );
}
PaymentScreen.auth = true;
