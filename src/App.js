import './App.css';
import {Psocketio} from './context/SocketContext'
import { Routes,Route } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './components/loginComponents/Signup';
import Dob from './components/loginComponents/Dob';
import Forgotpass from './components/loginComponents/Forgotpass';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Anotherprofile from './pages/Anotherprofile';
import Friends from './pages/Friends';
import Messages from './pages/Messages';
import Singlechat from './components/messageComponents/Singlechat';
import Chat from './components/messageComponents/Chat';
import { UrlProvider } from './context/UrlContex';
import { AuthenticationProvider } from './context/AutenticationContext';
import { HeaderProvider } from './context/HeaderContext';
import { FriendApiProvider } from './context/Api/FriendContext';
import { MessageProvider } from './context/Api/MessageContext';
import { ProfileProvider } from './context/Api/ProfileContext';
import Videochat from './pages/Videochat';


function App() {
  return (
  <>
  <UrlProvider>
  <HeaderProvider>
  <AuthenticationProvider>
  <Psocketio>
  <FriendApiProvider>
  <MessageProvider>
  <ProfileProvider>
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
  <Route path="/videochat/:id" element={<Videochat/>}/>
  </Routes>
  </ProfileProvider>
  </MessageProvider>
  </FriendApiProvider>
  </Psocketio>
  </AuthenticationProvider>
  </HeaderProvider>
  </UrlProvider>
  </>
  );
}

export default App;
