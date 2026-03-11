import { useState } from "react";

function Header() {

    const adminName = "Admin"; // future me API se aa sakta hai

    return (

        <div style={header}>

            {/* LEFT SIDE */}

            <div style={title}>
                Admin Panel
            </div>


            {/* RIGHT SIDE */}

            <div style={profileSection}>

                {/* PROFILE ICON */}

                <div style={profileCircle}>
                    {adminName.charAt(0)}
                </div>

                {/* ADMIN NAME */}

                <div style={adminNameStyle}>
                    {adminName}
                </div>

            </div>

        </div>

    );

}

export default Header;



/* ---------- STYLES ---------- */

const header = {
    width: "100%",
    height: "65px",
    background: "#f4f6f9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
    borderBottom: "1px solid #e5e7eb"
};

const title = {
    fontSize: "20px",
    fontWeight: "600"
};

const profileSection = {
    display: "flex",
    alignItems: "center",
    gap: "10px"
};

const profileCircle = {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    color: "#555"
};

const adminNameStyle = {
    fontSize: "15px",
    fontWeight: "500"
};