 import api from './api';

 const getToken =() =>{
    return localStorage.getItem("token");
 };

 // Get All Notes

 export const  getAllNotes = async() =>{
    const repsonse = await api.get("/note/getallnotes",{
        headers:{
            Authorization:`Bearer ${getToken()}`
        }

    });

    return repsonse.data;
 }


 //create note

export const createNote = async (noteData) => {

    const response = await api.post(
        "/note/createnote",
        noteData,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};



// Get Single Note
export const getOneNote = async (id) => {

    const response = await api.get(
        `/notes/getonenote/${id}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};
// Update Note
export const updateNote = async (id, noteData) => {

    const response = await api.put(
        `/note/updatenote/${id}`,
        noteData,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

// Delete Note
export const deleteNote = async (id) => {

    const response = await api.delete(
        `/note/deletenote/${id}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};