import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {forgotPassword} from '../../services/authService';
import { toast } from 'react-toastify';

import "./forgotpassword.css";

function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleResetPassword = async () => {

        if (!email || !newPassword || !confirmPassword) {
            toast.warning("Please fill all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {

            const response = await forgotPassword({
                email,
                newPassword
            });

            if (response.success) {

                toast.success(response.message);

                navigate("/login");

            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to reset password"
            );

        }

    };

    return (

        <div className="forgot-container">

            <div className="forgot-card">

                <h2>Forgot Password</h2>

                <p>
                    Enter your registered email and set a new password.
                </p>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button onClick={handleResetPassword}>
                    Reset Password
                </button>

                <p
                    className="back-login"
                    onClick={() => navigate("/login")}
                >
                    Back to Login
                </p>

            </div>

        </div>

    );
}

export default ForgotPassword;