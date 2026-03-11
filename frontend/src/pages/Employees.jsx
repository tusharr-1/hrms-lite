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

                {/* <table style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}>

                    <thead style={{ background: "#f4f6f9" }}>

                        <tr>
                            <th style={{ padding: "12px" }}>ID</th>
                            <th style={{ padding: "12px" }}>Name</th>
                            <th style={{ padding: "12px" }}>Email</th>
                            <th style={{ padding: "12px" }}>Department</th>
                            <th style={{ padding: "12px" }}>Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {employees.map(emp => (

                            <tr key={emp.id} style={{ borderTop: "1px solid #eee" }}>

                                <td style={{ padding: "12px" }}>{emp.employee_id}</td>
                                <td style={{ padding: "12px" }}>{emp.full_name}</td>
                                <td style={{ padding: "12px" }}>{emp.email}</td>
                                <td style={{ padding: "12px" }}>{emp.department}</td>

                                <td style={{ padding: "12px" }}>

                                    <button
                                        onClick={() => deleteEmployee(emp.id)}
                                        style={{
                                            background: "#ff4d4f",
                                            color: "white",
                                            border: "none",
                                            padding: "6px 12px",
                                            borderRadius: "5px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table> */}

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
}}
>
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

                    <div style={{
                        background: "#f9fafc",
                        width: "430px",
                        borderRadius: "16px",
                        padding: "30px",
                        boxShadow: "0 10px 35px rgba(0,0,0,0.25)",
                        position: "relative"
                    }}>

                        {/* Close Button */}

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
                                fontWeight: "bold",
                                fontSize: "16px"
                            }}
                        >
                            ×
                        </div>

                        <h3 style={{
                            marginBottom: "25px",
                            fontWeight: "600"
                        }}>
                            Create New Employee
                        </h3>


                        {/* Employee ID */}

                        <label style={{ fontSize: "14px" }}>
                            Employee ID <span style={{ color: "red" }}>*</span>
                        </label>

                        <input
                            name="employee_id"
                            value={formData.employee_id}
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                padding: "11px",
                                marginTop: "6px",
                                marginBottom: "6px",
                                borderRadius: "7px",
                                border: "1px solid #d0d5dd"
                            }}
                        />

                        {errors.employee_id && (
                            <div style={{ color: "red", fontSize: "12px", marginBottom: "14px" }}>
                                {errors.employee_id}
                            </div>
                        )}


                        {/* Name */}

                        <label style={{ fontSize: "14px" }}>
                            Full Name <span style={{ color: "red" }}>*</span>
                        </label>

                        <input
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                padding: "11px",
                                marginTop: "6px",
                                marginBottom: "6px",
                                borderRadius: "7px",
                                border: "1px solid #d0d5dd"
                            }}
                        />

                        {errors.full_name && (
                            <div style={{ color: "red", fontSize: "12px", marginBottom: "14px" }}>
                                {errors.full_name}
                            </div>
                        )}


                        {/* Email */}

                        <label style={{ fontSize: "14px" }}>
                            Email <span style={{ color: "red" }}>*</span>
                        </label>

                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                padding: "11px",
                                marginTop: "6px",
                                marginBottom: "6px",
                                borderRadius: "7px",
                                border: "1px solid #d0d5dd"
                            }}
                        />

                        {errors.email && (
                            <div style={{ color: "red", fontSize: "12px", marginBottom: "14px" }}>
                                {errors.email}
                            </div>
                        )}


                        {/* Department */}

                        <label style={{ fontSize: "14px" }}>
                            Department <span style={{ color: "red" }}>*</span>
                        </label>

                        <input
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            style={{
                                width: "100%",
                                padding: "11px",
                                marginTop: "6px",
                                marginBottom: "18px",
                                borderRadius: "7px",
                                border: "1px solid #d0d5dd"
                            }}
                        />


                        {errors.department && (
                            <div style={{ color: "red", fontSize: "12px", marginBottom: "18px" }}>
                                {errors.department}
                            </div>
                        )}

                        <button
                            onClick={addEmployee}
                            style={{
                                width: "100%",
                                background: "#3b5fcc",
                                color: "white",
                                padding: "13px",
                                border: "none",
                                borderRadius: "7px",
                                fontWeight: "600",
                                cursor: "pointer",
                                marginTop: "5px"
                            }}
                        >
                            Create Employee
                        </button>

                    </div>

                </div>

            )}

        </Layout>

    );

}

export default Employees;