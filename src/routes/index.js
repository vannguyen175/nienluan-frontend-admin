import Home from "~/pages/Home/Home";
import Products from "~/pages/Products/Products";
import DetailProduct from "~/pages/DetailProduct/DetailProduct";
import NotFoundPage from "~/pages/NotFoundPage/NotFoundPage";
import UserLayout from "~/components/layouts/userLayouts/userLayout";
import { Fragment } from "react";
import AccountUser from "~/pages/AccountUser/AccountUser";
import Login from "~/pages/Login/Login"
import Register from "~/pages/Register/Register"

export const routes = [
    {
        path: "/",
        page: Home,
        layout: UserLayout
    },
    {
        path: "/products",
        page: Products,
        layout: UserLayout
    },
    {
        path: "/detail-product",
        page: DetailProduct,
        layout: UserLayout
    },
    {
        path: "/account-user",
        page: AccountUser,
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
        path: "*",
        page: NotFoundPage,
        layout: Fragment
    },
];
