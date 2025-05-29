import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../components/navbar/Navigation";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
    const { pathname } = useLocation()
    return (
        <div className="dark:bg-dark">
            {pathname.includes("login") || pathname.includes("register") || pathname.includes("dashboard") ||
                <div className="sticky top-0 z-50">
                    <Navigation></Navigation>
                </div>}
            <div className="min-h-screen">
                <Outlet></Outlet>
            </div>
            {pathname.includes("login") || pathname.includes("register") || pathname.includes("dashboard") ||
                <div>
                    <Footer></Footer>
                </div>}
        </div>
    );
};

export default MainLayout;