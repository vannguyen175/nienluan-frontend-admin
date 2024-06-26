import Home from "~/pages/Home/Home";
import Products from "~/pages/Products/Products";
import DetailProduct from "~/pages/DetailProduct/DetailProduct";
import NotFoundPage from "~/pages/NotFoundPage/NotFoundPage";
import UserLayout from "~/layouts/userLayouts/userLayout";
//import AdminLayout from "~/layouts/adminLayouts/adminLayout";
import AdminLayout from "../layouts/adminLayouts/adminLayout";
import NoneFooterLayout from "../layouts/noneFooterLayout/noneFooterLayout";
import OrderProduct from "../pages/OrderProduct/OrderProduct";
import Cart from "../pages/Cart/Cart";

import { Fragment } from "react";
import Profile from "~/pages/Profile/Profile";
import Login from "~/pages/Login/Login"
import Register from "~/pages/Register/Register"
import AdminHomePage from "../pages/Admin/Home";
import PostingProduct from "../pages/PostingProduct/PostingProduct";

export const routes = [
    {
        path: "/",
        page: Home,
        layout: UserLayout
    },
    {
        path: "/san-pham/:slug_category",
        page: Products,
        layout: UserLayout
    },
    {
        path: "/detail-product/:id",
        page: DetailProduct,
        layout: UserLayout
    },
    {
        path: "/dat-hang/:id",
        page: OrderProduct,
        layout: NoneFooterLayout
    },
    {
        path: "/gio-hang/:id",
        page: Cart,
        layout: UserLayout
    },
    {
        path: "/profile",
        page: Profile,
        layout: UserLayout
    },
    {
        path: "/login",
        page: Login,
        layout: Fragment
    },
    {
        path: "/register",
        page: Register,
        layout: Fragment
    },
    {
        path: "/dang-tin",
        page: PostingProduct,
        layout: UserLayout
    },

    {
        path: "/admin",
        page: AdminHomePage,
        layout: AdminLayout,
        isPrivate: true
    },
    {
        path: "*",
        page: NotFoundPage,
        layout: Fragment
    },
];
