import React from 'react';

const CheckOutWizard = ({ activeStep = 0 }) => {
  return (
    <div className="mb-5 flex flex-wrap">
      {['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (steps, index) => (
          <div
            key={steps}
            className={`flex-1 border-b-2 text-center ${
              index <= activeStep
                ? 'border-indigo-500 text-indigo-500'
                : 'border-gray-400 text-gray-400'
            }`}
          >
            {steps}
          </div>
        )
      )}
    </div>
  );
};

export default CheckOutWizard;
