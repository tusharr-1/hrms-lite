import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Attendance() {

    const [employees, setEmployees] = useState([]);
    const [attendanceData, setAttendanceData] = useState({});
    const [toastMsg, setToastMsg] = useState("");
    const [toast, setToast] = useState({
    message: "",
    type: ""
});
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const res = await API.get("employees/");
        setEmployees(res.data);
    };

    const handleChange = (empId, field, value) => {
        setAttendanceData(prev => ({
            ...prev,
            [empId]: {
                ...prev[empId],
                [field]: value
            }
        }));
    };

    // const markAttendance = async (empId) => {

    //     const data = attendanceData[empId];

    //     if (!data || !data.date) {
    //         setToastMsg("Please select date");
    //         setTimeout(() => setToastMsg(""), 2000);
    //         return;
    //     }

    //     if (!data.status) {
    //         setToastMsg("Please select attendance");
    //         setTimeout(() => setToastMsg(""), 2000);
    //         return;
    //     }

    //     try {

    //         await API.post("attendance/", {
    //             employee: empId,
    //             date: data.date,
    //             status: data.status
    //         });

    //         setToastMsg("Saved Successfully");
    //         setTimeout(() => setToastMsg(""), 2000);

    //     } catch (err) {

    //         setToastMsg("Attendance already saved");
    //         setTimeout(() => setToastMsg(""), 2000);

    //     }

    // };

    const markAttendance = async (empId) => {

    const data = attendanceData[empId];

    if (!data || !data.date) {

        setToast({
            message: "Please select date",
            type: "error"
        });

        setTimeout(() => {
            setToast({ message: "", type: "" });
        }, 2000);

        return;
    }

    if (!data.status) {

        setToast({
            message: "Please select attendance",
            type: "error"
        });

        setTimeout(() => {
            setToast({ message: "", type: "" });
        }, 2000);

        return;
    }

    try {

        await API.post("attendance/", {
            employee: empId,
            date: data.date,
            status: data.status
        });

        setToast({
            message: "Saved Successfully",
            type: "success"
        });

        setTimeout(() => {
            setToast({ message: "", type: "" });
        }, 2000);

    } catch (err) {

        setToast({
            message: "Attendance already saved",
            type: "error"
        });

        setTimeout(() => {
            setToast({ message: "", type: "" });
        }, 2000);

    }

};


    return (

        <Layout>

            {/* Toast */}

            {/* {toastMsg && ( */}
            {toast.message && (
                // <div style={{
                //     position: "fixed",
                //     top: "25px",
                //     right: "30px",
                //     background: "#4BB543",
                //     color: "white",
                //     padding: "12px 18px",
                //     borderRadius: "6px",
                //     display: "flex",
                //     alignItems: "center",
                //     gap: "8px",
                //     boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                //     zIndex: 9999
                // }}>
                //     <span style={{ fontSize: "18px" }}>✔</span>
                //     <span>{toastMsg}</span>
                // </div>
                <div style={{
    position: "fixed",
    top: "25px",
    right: "30px",
    background: toast.type === "error" ? "#E53935" : "#4BB543",
    color: "white",
    padding: "12px 18px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
    zIndex: 9999
}}>

<span style={{ fontSize: "18px" }}>
    {toast.type === "error" ? "✖" : "✔"}
</span>

<span>{toast.message}</span>

</div>
            )}

            <div style={{
                background: "white",
                padding: "25px",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
            }}>

                <h2 style={{ marginBottom: "25px" }}>
                    Attendance Management
                </h2>

                {/* TABLE WRAPPER */}

                <div style={{
                    width: "100%",
                    overflowX: "auto"
                }}>

                    <table style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        minWidth: "1100px"
                    }}>

                        <thead style={{ background: "#f4f6f9" }}>

                            <tr>

                                <th style={thStyle}>S.No</th>
                                <th style={thStyle}>ID</th>
                                <th style={thStyle}>Name</th>
                                <th style={thStyle}>Email</th>
                                <th style={thStyle}>Department</th>
                                <th style={thStyle}>All Attendance</th>
                                <th style={thStyle}>Date</th>
                                <th style={thStyle}>Attendance</th>

                            </tr>

                        </thead>

                        <tbody>

                            {employees.map((emp, index) => (

                                <tr key={emp.id} style={{ borderTop: "1px solid #eee" }}>

                                    <td style={tdCenter}>{index + 1}</td>

                                    <td style={tdCenter}>{emp.employee_id}</td>

                                    <td style={tdCenter}>{emp.full_name}</td>

                                    <td style={tdCenter}>{emp.email}</td>

                                    <td style={tdCenter}>{emp.department}</td>

                                    <td style={tdCenter}>

                                        <button
                                            onClick={() => navigate(`/attendance-history/${emp.id}`)}
                                            style={{
                                                background: "#2F80ED",
                                                color: "white",
                                                border: "none",
                                                padding: "7px 16px",
                                                borderRadius: "6px",
                                                cursor: "pointer"
                                            }}
                                        >
                                            View
                                        </button>

                                    </td>

                                    <td style={tdCenter}>

                                        <input
                                            type="date"
                                            onChange={(e) => handleChange(emp.id, "date", e.target.value)}
                                            style={{
                                                padding: "6px 10px",
                                                borderRadius: "6px",
                                                border: "1px solid #ccc"
                                            }}
                                        />

                                    </td>

                                    <td style={tdRight}>

                                        <select
                                            value={attendanceData[emp.id]?.status || ""}
                                            onChange={(e) => handleChange(emp.id, "status", e.target.value)}
                                            style={{
                                                padding: "6px 10px",
                                                borderRadius: "6px",
                                                border: "1px solid #ccc",
                                                marginRight: "10px",
                                                background:
                                                    attendanceData[emp.id]?.status === "Present"
                                                        ? "#E6F9ED"
                                                        : attendanceData[emp.id]?.status === "Absent"
                                                        ? "#FFEAEA"
                                                        : "#fff",
                                                color:
                                                    attendanceData[emp.id]?.status === "Present"
                                                        ? "#1B8F3C"
                                                        : attendanceData[emp.id]?.status === "Absent"
                                                        ? "#D32F2F"
                                                        : "#333",
                                                fontWeight: "500"
                                            }}
                                        >

                                            <option value="">Select</option>
                                            <option value="Present">Present</option>
                                            <option value="Absent">Absent</option>

                                        </select>

                                        <button
                                            onClick={() => markAttendance(emp.id)}
                                            style={{
                                                background: "#2F80ED",
                                                color: "white",
                                                border: "none",
                                                padding: "7px 16px",
                                                borderRadius: "6px",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Save
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </Layout>

    );

}

/* STYLES */

const thStyle = {
    padding: "14px 18px",
    textAlign: "center",
    fontWeight: "600"
};

const tdCenter = {
    padding: "16px 18px",
    textAlign: "center"
};

const tdRight = {
    padding: "16px 18px",
    textAlign: "right"
};

export default Attendance;