import api from "./api";

/* Register User */
export const register = async (userData) => {

    const response = await api.post("/auth/register", userData);

    return response.data;
};


/* Login User */
export const login = async (userData) => {

    const response = await api.post("/auth/login", userData);

    return response.data;
};


/* Get Logged-in User Profile */
export const getProfile = async () => {
    const token = localStorage.getItem('token');

    const response = await api.get("/auth/getprofile", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const forgotPassword = async (userData) => {

    const response = await api.put(
        "/auth/forgotpassword",
        userData
    );

    return response.data;
};