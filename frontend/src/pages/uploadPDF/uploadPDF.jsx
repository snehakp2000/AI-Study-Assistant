import  Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./uploadPDF.css";
import { uploadPdf } from "../../services/pdfService";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


function UploadPDF(){

    const [selectedFile, setSelectedFile] = useState(null);

const [loading, setLoading] = useState(false);
const navigate = useNavigate();

const handleFileChange = (e) => {

    setSelectedFile(e.target.files[0]);

};
const handleUpload = async () => {

    if (!selectedFile) {
        toast.warning("Please select a PDF.");
        return;
    }

    try {

        setLoading(true);

        const formData = new FormData();

        formData.append("pdf", selectedFile);

        const response = await uploadPdf(formData);

        if (response.success) {

            toast.success(response.message);

            setSelectedFile(null);

            document.getElementById("pdfFile").value = "";
            navigate("/notes");

        }

    } catch (error) {

        toast.error(
            error.response?.data?.message ||
            "Upload failed"
        );

    } finally {

        setLoading(false);

    }

};
   return <div className="upload-page">
<Navbar/>
<div className="upload-layout">

    <Sidebar/>
    <div className="upload-main">
      <div className="page-header">
        <h2>Upload Study Material</h2>
      </div>
      <div className="upload-box">

    <h3>Upload PDF</h3>

    <p>
        Select a PDF file to generate summaries,
        quizzes, and flashcards.
    </p>

  <input
    type="file"
    id="pdfFile"
    accept=".pdf"
    hidden
    onChange={handleFileChange}
/>

<label htmlFor="pdfFile" className="upload-btn">
    📄 Choose PDF
</label>

</div>
<button
    className="submit-btn"
    onClick={handleUpload}
    disabled={loading}
>
    {loading ? "Uploading..." : "Upload PDF"}
</button>
    </div>
</div>


   </div>


}

export default UploadPDF;