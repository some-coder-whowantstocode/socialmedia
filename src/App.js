import './App.css';
import { Routes,Route } from 'react-router';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dob from './components/Dob';
import Forgotpass from './components/Forgotpass';
import Profile from './components/Profile';
import Search from './components/Search';
import Anotherprofile from './components/Anotherprofile';
import Friends from './components/Friends';
import Messages from './components/Messages';
import Singlechat from './components/Singlechat';
import Chat from './components/Chat';


function App() {
  return (
  <>
  <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path="/dob" element={<Dob/>}/>
  <Route path="/forgot" element={<Forgotpass/>}/>
  <Route path="/profile" element={<Profile/>}/>
  <Route path="/search" element={<Search/>}/>
  <Route path="/anotherprofile" element={<Anotherprofile/>}/>
  <Route path="/friends" element={<Friends/>}/>
  <Route path="/messages" element={<Messages/>}/>
  <Route path="/singlechat" element={<Singlechat/>}/>
  <Route path="/chat" element={<Chat/>}/>
  </Routes>
  </>
  );
}

export default App;
