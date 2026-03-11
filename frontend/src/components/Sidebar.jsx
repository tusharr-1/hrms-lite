import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const [showLogout, setShowLogout] = useState(false);

    const isAttendanceActive =
        location.pathname.startsWith("/attendance") ||
        location.pathname.startsWith("/attendance-history");

    const handleLogout = () => {

        setShowLogout(false);

        // redirect to login page
        navigate("/", { replace: true });

    };

    return (
        <>
            <div style={sidebar}>

                {/* <h2 style={{ marginBottom: "40px" }}>HRMS Lite</h2> */}
                <h2 style={logo}>HRMS Lite</h2>

                <div style={menu}>

                    {/* <NavLink
                        to="/dashboard"
                        style={({ isActive }) =>
                            isActive ? activeLink : link
                        }
                    >
                        Dashboard
                    </NavLink> */}

                    <NavLink
                        to="/employees"
                        style={({ isActive }) =>
                            isActive ? activeLink : link
                        }
                    >
                        Employee Management
                    </NavLink>

                    <NavLink
                        to="/attendance"
                        style={isAttendanceActive ? activeLink : link}
                    >
                        Attendance Management
                    </NavLink>

                </div>

                {/* LOGOUT BUTTON */}

                <div style={{ marginTop: "auto" }}>

                    <button
                        onClick={() => setShowLogout(true)}
                        style={logoutBtn}
                    >
                        Logout
                    </button>

                </div>

            </div>


            {/* LOGOUT POPUP */}

            {showLogout && (

                <div style={overlay}>

                    <div style={popup}>

                        <div style={popupHeader}>

                            <h3 style={{ margin: 0 }}>Logout</h3>

                            <button
                                onClick={() => setShowLogout(false)}
                                style={closeBtn}
                            >
                                ×
                            </button>

                        </div>

                        <p style={{ margin: "20px 0", color: "#444" }}>
                            Are you sure you want to logout?
                        </p>

                        <div style={popupBtns}>

                            <button
                                onClick={handleLogout}
                                style={logoutConfirm}
                            >
                                Logout
                            </button>

                            <button
                                onClick={() => setShowLogout(false)}
                                style={cancelBtn}
                            >
                                No
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>
    );

}

export default Sidebar;


/* ---------- STYLES ---------- */
const logo = {
    marginBottom: "40px",
    textAlign: "center",
    fontWeight: "700",
    letterSpacing: "1px"
};

const sidebar = {
    width: "230px",
    height: "100vh",
    background: "linear-gradient(to bottom,#0f4c5c,#22c1c3)",
    color: "white",
    position: "fixed",
    left: 0,
    top: 0,
    padding: "9px",
    display: "flex",
    flexDirection: "column"
};

const menu = {
    display: "flex",
    flexDirection: "column",
    gap: "18px"
};

const link = {
    color: "white",
    textDecoration: "none",
    padding: "12px 14px",
    borderRadius: "12px",
    textAlign: "center",
    fontSize: "14px",
    whiteSpace: "nowrap"
};

const activeLink = {
    background: "#e6f0f3",
    color: "#ff6b00",
    padding: "12px 14px",
    borderRadius: "14px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "600",
    textDecoration: "none",   // underline remove
    whiteSpace: "nowrap",
    boxShadow: "0 3px 10px rgba(0,0,0,0.15)"
};

const logoutBtn = {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#111",
    color: "white",
    cursor: "pointer"
};


const overlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3000
};

const popup = {
    width: "420px",
    background: "white",
    borderRadius: "14px",
    padding: "30px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.25)"
};

const popupHeader = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
};

const closeBtn = {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "none",
    background: "#eee",
    fontSize: "16px",
    cursor: "pointer"
};

const popupBtns = {
    display: "flex",
    gap: "15px",
    marginTop: "10px"
};

const logoutConfirm = {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#b23b7a",
    color: "white",
    cursor: "pointer"
};

const cancelBtn = {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #bbb",
    background: "white",
    cursor: "pointer"
};