import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import { NavBar } from "./NavBar/NavBar";

export function Layout() {
    return (
        <div className="App">
            <NavBar></NavBar>
            <div className="page">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Layout