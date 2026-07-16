import '../register/register.css'
import { useState } from 'react';
import { register } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";


function Register(){
    const [fullname,setFullname] = useState('');
    const [email,setEmail] =useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] =useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
       
        if(!fullname || !email || !password || !confirmPassword){
           toast.warning('Please fill in all fields');
            return;
        }
        if(password !== confirmPassword){
            toast.error('Passwords do not match');
            return;
        }

try{
    console.log({name:fullname,email,password});
    const response = await register({name:fullname,email,password});
    if(response.success){
        toast.success('Registration successful');
        navigate('/login');
    }
       }
       catch(error){
        toast.error(error.response?.data?.message );
       }
    }


    return <div className="main-register">
<div className="card-register">
    <h1>AI Study Assistance</h1>
    <h2>Create Your Account</h2>
    <input type="text" placeholder="Enter your fullname" value={fullname} onChange={(e) => setFullname(e.target.value)}/>
    <input  type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
    <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
    <button onClick={handleRegister}>Create Account</button>
<div className="login-text">
    <span>Already have an account? </span>

    <Link to="/login" className="login-link">
        Login
    </Link>
</div>
</div>
    </div>
}

export default Register;