import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Swap from "./pages/Swap";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "",
        Component: Home,
      },
      {
        path: "/swap",
        Component: Swap,
      },
      {
        path: "*",
        Component: Home,
      },
    ],
  },
]);

export default router;
