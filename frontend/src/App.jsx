import { Routes,Route ,Navigate} from 'react-router-dom';
import './App.css'
import Login from './pages/login/login';
import Register from './pages/register/register'
import ForgotPassword from './pages/forgotPassword/forgotpassword'
import Dashboard from './pages/dashboard/dashboard'
import Notes from './pages/notes/notes';
import UploadPDF from './pages/uploadPDF/uploadPDF';
import Summary from './pages/Summary/Summary';
import Quiz from './pages/Quiz/quiz';
import Flashcard from './pages/flashcard/flashcard';
import Profile from './pages/profile/profile';


function App() {
  return (
   <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/forgot' element={<ForgotPassword/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/notes' element={<Notes/>}/>
    <Route path='/uploadPDF' element={<UploadPDF/>}/>
    <Route path='/summary' element={<Summary/>}/>
    <Route path='/quiz' element={<Quiz/>}/>
    <Route path='/flashcard' element={<Flashcard/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/forgotpassword' element = {<ForgotPassword/>}/>
   </Routes>
  )
}
export default App
