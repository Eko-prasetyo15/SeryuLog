import Detail from "./Page/Detail";
import FavoriteList from "./Page/Favorite";
import Home from "./Page/Home"
import WatchList from "./Page/WatchList";

var LayoutRoute = [
    {
        path: "/",
        name: "Home",
        exact: true,
        component: Home
    },
    {
        path: "/watchlist",
        name: "Home",
        exact: true,
        component: WatchList
    },
    {
        path: "/favorite",
        name: "Home",
        exact: true,
        component: FavoriteList
    },
    {
        path: "/movie/:id",
        name: "Home",
        exact: true,
        component: Detail
    },
];

export default LayoutRoute