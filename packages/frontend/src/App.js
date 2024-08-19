import React, { useEffect } from "react";
import { Payment } from "./Payment";

function App() {
  const [checkoutId, setCheckoutId] = React.useState(null);

  // ####################################
  // #       PREPARE NEW CHECKOUT       #
  // ####################################
  useEffect(() => {
    const _ = async () => {
      const res = await fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resText = await res.text();
      // @ts-ignore
      setCheckoutId(resText);
    };
    _();
  }, []);
  
  // ####################################
  // #         DEMO SUMMARY PAGE        #
  // ####################################
  if(window.location.pathname === '/example-summary-page') {
    const _checkoutId = new URLSearchParams(window.location.search).get('checkoutId');
    return (
      <>
        <h1>Summary Page</h1>
        <br />
        <span>Checkout: {_checkoutId}</span>
        <br />
        <form action={`https://eu-test.oppwa.com/v1/checkouts/${_checkoutId}/payment`} method="POST">
          <input type="submit" value="Pay now" />
        </form>
      </>
    );
  }
  // ####################################
  // #         DEMO RESULT PAGE         #
  // ####################################
  else if(window.location.pathname === '/result'){
    // return result page
    const _checkoutId = new URLSearchParams(window.location.search).get('id');
    return <h1>Result Page for Checkout {_checkoutId}</h1>
  }
  // ####################################
  // #        DEMO PAYMENT PAGE         #
  // ####################################
  else return <>
    <h1>Payment for Checkout {checkoutId}</h1>
    <Payment key={checkoutId} checkoutId={checkoutId} />
  </>;
}

export default App;
