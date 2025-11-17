import React from "react";
import OrderForm from "../components/orderForm/OrderForm.jsx";
import OurMission from "../components/orderForm/OurMission.jsx";
import StripeProvider from "../components/StripeProvider.jsx";

const OrderNowPage = () => {
  return (
    <StripeProvider>
      <OrderForm />
      <OurMission />
    </StripeProvider>
  );
};

export default OrderNowPage;
