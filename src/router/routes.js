import { lazy } from "react";

const routes = [
    {
        path: "/owner/:id",
        component: lazy(() => import("pages/Owner"))
    },
    {
        path: "/OwnerList",
        component: lazy(() => import("pages/OwnerList"))
    },
    {
        path: "/customer/:id",
        component: lazy(() => import("pages/Customer"))
    },
    {
        path: "/CustomerList",
        component: lazy(() => import("pages/CustomerList"))
    },
    {
        path: "/car/:id",
        component: lazy(() => import("pages/Car"))
    },
    {
        path: "/CarList",
        component: lazy(() => import("pages/CarList"))
    },
    {
        path: "/",
        component: lazy(() => import("pages/Home"))
    },
]

export default routes;