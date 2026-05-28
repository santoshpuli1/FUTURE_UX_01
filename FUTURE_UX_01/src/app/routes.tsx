import { createBrowserRouter } from "react-router";
import { Layout } from "./layout/Layout";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { Reservations } from "./pages/Reservations";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Admin } from "./pages/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "menu", Component: Menu },
      { path: "reservations", Component: Reservations },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "admin", Component: Admin },
    ],
  },
]);
