// import 'jsconfig.json/styles/globals.css'

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

import styles from "../styles/Home.module.css";
import {
  // ApplePay,
  GooglePay,
  CreditCard,
  PaymentForm,
} from "react-square-web-payments-sdk";

export default function Home() {
  return (
    <div className={styles.container}>
      <PaymentForm
        applicationId="sandbox-sq0idb-7rX3uKTDNGLQvnpxpTky3A"
        cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
          const response = await fetch("/api/pay", {
            method: "POST",
            headers: {
              "Authorization": "Bearer NEXT_PUBLIC_SQUARE_ACCESS_TOKEN",
              "Content-type": "application/json",
             
             
            },
            body: JSON.stringify({
              sourceId: token.token,
            }),
          });
          console.log(await response.json());
        }}
        createPaymentRequest={() => ({
          countryCode: "US",
          currencyCode: "USD",
          total: {
            amount: "1.00",
            label: "Total",
          },
        })}
        locationId="LEP8DKV04QEVB"
      >
        {/* <ApplePay /> */}
        <GooglePay />
        <CreditCard
          buttonProps={{
            css: {
              backgroundColor: "#771520",
              fontSize: "14px",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#530f16",
              },
            },
          }}
        />
      </PaymentForm>
    </div>
  );
}