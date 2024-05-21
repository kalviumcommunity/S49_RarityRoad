import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
    const { id } = useParams();
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState(''); // New state for password
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:3005/getusers/${id}`)
            .then(response => {
                const { username, email, age, password } = response.data;
                setName(username);
                setEmail(email);
                setAge(age);
                setPassword(password);  // Add this line to set the password
            })
            .catch(error => console.log(error));
    }, []);
    
    const handleUpdate = (e) => {
        e.preventDefault();
        console.log("Updating with data:", { username, email, password });
    
        axios.put(`http://localhost:3005/updateUsers/${id}`, { username, email, password })
            .then(response => {
                console.log(response);
                navigate('/userdata');
            })
            .catch(error => console.log(error));
    }
    
    
    return (
        <div className="form-container">
            <div className='register-form '>
                <form onSubmit={handleUpdate}>
                    <h2>Update Your Data</h2>
                    <div className="mb-2">
                        <label htmlFor="name">Name </label>
                        <input type="text" id="username" placeholder="Enter Name" className="form-control"
                            value={username} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Email </label>
                        <input type="text" id="email" placeholder="Enter Email" className="form-control"
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password">Password </label>
                        <input type="password" id="password" placeholder="Enter Password" className="form-control"
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="form-field">Update</button>
                </form>
            </div>
        </div>
    );
}
export default UpdateUser;