import './login.css'
import { useState } from 'react';
import { login} from '../../services/authService';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from "react-toastify";

function Login(){
     const [email,setEmail] = useState('');
     const [password,setPassword] = useState('');
     const navigate = useNavigate();

     const handleLogin = async() =>{
       if(!email || !password){
        toast.warning("Please fill in all fields.");
        return;
       }
       try{
        const response = await login({email, password});


        if(response.success){
            localStorage.setItem('token', response.token);
            console.log(response.token);
            localStorage.setItem('user',JSON.stringify(response.user));
            toast.success('Login successfull');
            navigate('/dashboard');

        }
    
       }
       catch(error){
         toast.error(
                error.response?.data?.message || "Login Failed"
            );

       }
     }

    return (
        <>
        <div className="login-container">
            <div className="login-card">

                <h2> AI Assistance App </h2>
           <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
           <br/>
           <input
    type="password"
    placeholder="Enter Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
/>

<div className="forgot-password">
    <Link to="/forgotpassword">
        Forgot Password?
    </Link>
</div>

<button onClick={handleLogin}>Login</button>
<div className="register-link">
    <span>Don't have an account? </span>

    <Link to="/register">
        Register
    </Link>
</div>

            </div>
           
            
        </div>
        </>
    );
}

export default Login;