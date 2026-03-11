import Sidebar from "./Sidebar";
import Header from "./Header";
import { useLocation } from "react-router-dom";

function Layout({ children }) {

    const location = useLocation();

    const isAttendanceActive =
        location.pathname.startsWith("/attendance") ||
        location.pathname.startsWith("/attendance-history");

    return (

        <div style={{ display: "flex" }}>

            <Sidebar activeAttendance={isAttendanceActive} />

            <div style={{ marginLeft: "230px", width: "100%" }}>

                <Header />

                <div style={{
                    padding: "30px",
                    background: "#f4f6f9",
                    minHeight: "100vh"
                }}>

                    {children}

                </div>

            </div>

        </div>

    );

}

export default Layout;