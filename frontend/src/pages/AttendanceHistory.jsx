import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function AttendanceHistory() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);
    const [attendance, setAttendance] = useState([]);

    const [filterDate, setFilterDate] = useState("");

    useEffect(() => {

        fetchEmployee();
        fetchAttendance();

    }, []);

    const fetchEmployee = async () => {

        const res = await API.get(`employees/${id}/`);
        setEmployee(res.data);

    };

    const fetchAttendance = async () => {

        const res = await API.get(`attendance-history/${id}/`);

        // safety check
        if (Array.isArray(res.data)) {
            setAttendance(res.data);
        } else {
            setAttendance([]);
        }

    };


    /* FILTER LOGIC */

    const filteredAttendance = filterDate
        ? attendance.filter(item => item.date === filterDate)
        : attendance;


    /* TOTAL PRESENT COUNT */

    const presentCount = attendance.filter(
        item => item.status === "Present"
    ).length;



    return (

        <Layout>

            <div style={{
                background: "white",
                padding: "25px",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
            }}>

                {/* HEADER + BACK BUTTON */}

                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px"
                }}>

                    <h2>Employee Attendance History</h2>

                    <button
                        onClick={() => navigate("/attendance")}
                        style={{
                            background: "#2F80ED",
                            color: "white",
                            border: "none",
                            padding: "8px 16px",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        ← Back
                    </button>

                </div>


                {/* EMPLOYEE DETAILS */}

                {employee && (

                    <div style={{
                        background: "#f4f6f9",
                        padding: "15px",
                        borderRadius: "8px",
                        marginBottom: "20px",
                        lineHeight: "28px"
                    }}>

                        <p><b>ID :</b> {employee.employee_id}</p>
                        <p><b>Name :</b> {employee.full_name}</p>
                        <p><b>Email :</b> {employee.email}</p>
                        <p><b>Department :</b> {employee.department}</p>

                    </div>

                )}



                {/* FILTER + TOTAL PRESENT */}

                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px"
                }}>

                    <div style={{
                        fontWeight: "600",
                        color: "#1B8F3C"
                    }}>
                        Total Present Days : {presentCount}
                    </div>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                    }}>

                        <span style={{ fontSize: "14px" }}>
                            Filter attendance records by date
                        </span>

                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            style={{
                                padding: "6px",
                                borderRadius: "6px",
                                border: "1px solid #ccc"
                            }}
                        />

                    </div>

                </div>



                {/* ATTENDANCE TABLE */}

                <table style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}>

                    <thead style={{ background: "#f4f6f9" }}>

                        <tr>

                            <th style={th}>S.No</th>
                            <th style={th}>Date</th>
                            <th style={th}>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredAttendance.map((item, index) => (

                            <tr key={item.id} style={{ borderTop: "1px solid #eee" }}>

                                <td style={td}>{index + 1}</td>

                                {/* <td style={td}>{item.date}</td> */}
                                <td style={td}>
                                    {
                                        new Date(item.date).toLocaleDateString("en-GB")
                                    }
                                </td>

                                <td style={{
                                    ...td,
                                    color: item.status === "Present" ? "green" : "red",
                                    fontWeight: "500"
                                }}>
                                    {item.status}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </Layout>

    );

}

const th = {
    padding: "12px",
    textAlign: "center"
};

const td = {
    padding: "12px",
    textAlign: "center"
};

export default AttendanceHistory;