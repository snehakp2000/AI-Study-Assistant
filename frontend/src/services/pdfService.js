import api from "./api";

const getToken = () => localStorage.getItem("token");

export const uploadPdf = async (formData) => {

    const response = await api.post(
        "/pdf/uploadpdf",
        formData,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};