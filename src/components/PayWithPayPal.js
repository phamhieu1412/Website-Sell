import React, { useState, useRef, useEffect } from 'react';

import { numberToVnd } from '../utils/numberFormatter';

function PayWithPayPal(props) {
  const { checkout, defaultAddress, note, history } = props;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: `Thanh toán đơn hàng có giá trị ${numberToVnd(props.infoCart.grand_total)}`,
                amount: {
                  currency_code: 'USD',
                  value: Math.round((props.infoCart.grand_total / 23176) * 100) / 100,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log('ORDER', order);
          setPaidFor(true);
          checkout(
            {
              address_id: defaultAddress.id,
              content: note,
            },
            {
              // check TH paypal thanh cong nhung checkout failure
              onSuccess: () => {},
              onFailure: () => {},
            },
          );
          history.push('/home');
        },
        onError: (err) => {
          setError(err);
          console.log('ERROR', err);
        },
      })
      .render(paypalRef.current);
  }, []);

  if (paidFor) {
    return <div>Cảm ơn vì đã mua hàng</div>;
  }

  if (error) {
    return <div>Lỗi thanh toán. Xin thử lại</div>;
  }

  return (
    <div>
      <div ref={paypalRef} />
    </div>
  );
}

export default PayWithPayPal;
