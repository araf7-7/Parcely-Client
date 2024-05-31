import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header & Footer/Header";
import Footer from "../Header & Footer/Footer";


const Root = () => {
    const location  = useLocation()
    const noHeaderFooter = location.pathname.includes('login') ||  location.pathname.includes('register')
    return (
        <div>
              {noHeaderFooter ||  <Header></Header>}
            <Outlet></Outlet>
            {noHeaderFooter ||  <Footer></Footer>}
        </div>
    );
};

export default Root;