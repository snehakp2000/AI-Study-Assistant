import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Profile.css";
import { getProfile } from "../../services/authService";

import { useState , useEffect} from "react";

function Profile() {

    const [user,setUser] = useState({
        "name": "",
        "email": "",
        
    });

  

 useEffect(() => {

    let isMounted = true;

    const loadProfile = async () => {
        try {
            const response = await getProfile();

            if (isMounted && response.success) {
                setUser(response.user);
            }

        } catch (error) {
            console.error(error);
        }
    };

    loadProfile();

    return () => {
        isMounted = false;
    };

}, []);

    
    return (
        <div className="profile-page">

            <Navbar />

            <div className="profile-layout">

                <Sidebar />

                <div className="profile-main">

                    <h2>My Profile</h2>

                    <div className="profile-card">

                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={user?.name || ""}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={user?.email || ""}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                           <input
    type="password"
    placeholder="********"
    readOnly
/>
                        </div>

                        <button className="update-btn">
                            Update Profile
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;