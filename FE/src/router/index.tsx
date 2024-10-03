import OrderPage from "../pages/order";
import CustomerPage from "../pages/customer";
import ItemPage from "../pages/item";
import MainPage from "../pages/main";

const router = [
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/order",
    element: <OrderPage />,
  },
  {
    path: "/customer",
    element: <CustomerPage />,
  },
  {
    path: "/item",
    element: <ItemPage />,
  },
];

export default router;
