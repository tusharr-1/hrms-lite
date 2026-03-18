import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../services/api";

function Employees() {

    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        employee_id: "",
        full_name: "",
        email: "",
        department: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const res = await API.get("employees/");
        setEmployees(res.data);
    };

    const deleteEmployee = async (id) => {
        await API.delete(`employees/${id}/`);
        fetchEmployees();
    };

    const validateField = (name, value) => {

        let message = "";

        if (!value) {
            message = "This field is required";
        }

        if (name === "email" && value) {

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(value)) {
                message = "Please enter a valid email address";
            }

        }

        setErrors(prev => ({ ...prev, [name]: message }));

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        validateField(name, value);

    };

    const validateForm = () => {

        let newErrors = {};

        if (!formData.employee_id) {
            newErrors.employee_id = "Employee ID is required";
        }

        if (!formData.full_name) {
            newErrors.full_name = "Full name is required";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else {

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(formData.email)) {
                newErrors.email = "Please enter a valid email address";
            }

        }

        if (!formData.department) {
            newErrors.department = "Department is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const addEmployee = async () => {

        if (!validateForm()) return;

        try {

            await API.post("employees/", formData);

            setShowModal(false);

            setFormData({
                employee_id: "",
                full_name: "",
                email: "",
                department: ""
            });

            setErrors({});

            fetchEmployees();

        } catch (err) {

            if (err.response && err.response.data) {

                let backendErrors = {};

                Object.keys(err.response.data).forEach(key => {
                    backendErrors[key] = err.response.data[key][0];
                });

                setErrors(backendErrors);

            }

        }

    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #d0d5dd",
        marginTop: "5px",
        outline: "none"
    };

    const Error = ({ msg }) => (
        <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
            {msg}
        </div>
    );

    return (

        <Layout>

            <div style={{
                background: "white",
                padding: "25px",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
            }}>

                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px"
                }}>

                    <h2>Employee Management</h2>

                    <button
                        onClick={() => setShowModal(true)}
                        style={{
                            background: "#111",
                            color: "white",
                            padding: "10px 18px",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        + Add Employee
                    </button>

                </div>

                <table style={{
                    width:"100%",
                    borderCollapse:"collapse",
                    tableLayout:"fixed"
                }}>

                <thead style={{background:"#f4f6f9"}}>

                <tr>
                <th style={{padding:"12px",textAlign:"left",width:"70px"}}>S.No</th>
                <th style={{padding:"12px",textAlign:"left"}}>ID</th>
                <th style={{padding:"12px",textAlign:"left"}}>Name</th>
                <th style={{padding:"12px",textAlign:"left"}}>Email</th>
                <th style={{padding:"12px",textAlign:"left"}}>Department</th>
                <th style={{padding:"12px",textAlign:"center",width:"120px"}}>Action</th>
                </tr>

                </thead>

                <tbody>

                {employees.map((emp,index)=>(

                <tr key={emp.id} style={{borderTop:"1px solid #eee"}}>
                <td style={{padding:"12px"}}>{index+1}</td>
                <td style={{padding:"12px"}}>{emp.employee_id}</td>
                <td style={{padding:"12px"}}>{emp.full_name}</td>
                <td style={{padding:"12px"}}>{emp.email}</td>
                <td style={{padding:"12px"}}>{emp.department}</td>

                <td style={{padding:"12px",textAlign:"center"}}>
                <button
                onClick={()=>deleteEmployee(emp.id)}
                style={{
                background:"#ff4d4f",
                color:"white",
                border:"none",
                padding:"6px 12px",
                borderRadius:"5px",
                cursor:"pointer"
                }}>
                Delete
                </button>
                </td>

                </tr>

                ))}

                </tbody>

                </table>

            </div>

            {/* Modal */}
            {showModal && (

                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.45)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000
                }}>

                    {/* ✅ UPDATED FORM */}
                    <div style={{
                        background: "#f4f6f9",
                        width: "520px",
                        borderRadius: "16px",
                        padding: "30px",
                        boxShadow: "0 10px 35px rgba(0,0,0,0.25)",
                        position: "relative"
                    }}>

                        <div
                            onClick={() => setShowModal(false)}
                            style={{
                                position: "absolute",
                                top: "15px",
                                right: "15px",
                                width: "34px",
                                height: "34px",
                                borderRadius: "50%",
                                background: "#e4e7ec",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                        >
                            ×
                        </div>

                        <h3 style={{ marginBottom: "20px", fontWeight: "600" }}>
                            Create New Employee
                        </h3>

                        <div style={{ display: "grid", gap: "15px" }}>

                            <div>
                                <label>Employee ID *</label>
                                <input name="employee_id" value={formData.employee_id} onChange={handleChange} style={inputStyle}/>
                                {errors.employee_id && <Error msg={errors.employee_id} />}
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                                <div>
                                    <label>First Name *</label>
                                    <input name="full_name" value={formData.full_name} onChange={handleChange} style={inputStyle}/>
                                    {errors.full_name && <Error msg={errors.full_name} />}
                                </div>
                                <div>
                                    <label>Last Name</label>
                                    <input placeholder="Optional" style={inputStyle}/>
                                </div>
                            </div>

                            <div>
                                <label>Email *</label>
                                <input name="email" value={formData.email} onChange={handleChange} style={inputStyle}/>
                                {errors.email && <Error msg={errors.email} />}
                            </div>

                            <div>
                                <label>Department *</label>
                                <input name="department" value={formData.department} onChange={handleChange} style={inputStyle}/>
                                {errors.department && <Error msg={errors.department} />}
                            </div>

                            <button
                                onClick={addEmployee}
                                style={{
                                    width: "100%",
                                    background: "linear-gradient(135deg,#4f46e5,#6366f1)",
                                    color: "white",
                                    padding: "12px",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    marginTop: "10px"
                                }}
                            >
                                Create Employee
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </Layout>

    );

}

export default Employees;
