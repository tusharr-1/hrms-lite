import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const login = (e) => {

        e.preventDefault();

        if (form.username === "admin" && form.password === "admin") {

            navigate("/employees");

        } else {

            alert("Invalid login");

        }

    };

    return (

        <>
        {/* PLACEHOLDER STYLE */}

        <style>
        {`
        input::placeholder{
            color:white;
            opacity:0.8;
        }
        `}
        </style>

        <div style={page}>

            <div style={card}>

                <h2 style={title}>HRMS Login</h2>

                <form onSubmit={login} style={{ width: "100%" }}>

                    <label style={label}>Username</label>

                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={form.username}
                        onChange={handleChange}
                        style={input}
                    />

                    <label style={label}>Password</label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        style={input}
                    />

                    <button style={loginBtn}>
                        Login
                    </button>

                </form>

            </div>

        </div>

        </>
    );

}

export default Login;


/* ---------- STYLES ---------- */

const page = {

    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    background: "linear-gradient(135deg,#0f4c5c,#22c1c3)"

};

const card = {

    width: "360px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    color: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"

};

const title = {

    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "20px"

};

const label = {

    display: "block",
    textAlign: "left",
    marginBottom: "6px",
    fontSize: "13px",
    color: "white"

};

const input = {

    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    marginBottom: "15px",
    outline: "none",
    background: "rgba(255,255,255,0.2)",
    color: "white"

};

const loginBtn = {

    width: "100%",
    padding: "11px",
    borderRadius: "8px",
    border: "none",
    background: "#ff7a1a",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "5px"

};