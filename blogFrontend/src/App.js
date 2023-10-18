import { useContext } from "react";
import TopBar from "./Components/TopBar/TopBar.jsx";
import Home from "./Pages/Home/Home.jsx";
import Login from "./Pages/Login/Login.jsx";
import Register from "./Pages/Register/Register.jsx";
import Settings from "./Pages/Settings/Settings.jsx";
import Single from "./Pages/Single/Single.jsx";
import Write from "./Pages/Write/Write.jsx";
import { Route, Routes } from 'react-router-dom';
import { Context } from "./context/Context.js";


function App() {
  const {user} = useContext(Context);
  return (
    <>
    <TopBar/>
    <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/register" element={user? <Home /> : <Register/>} />
        <Route path="/login" element={user? <Home /> : <Login/>} />
        <Route path="/write" element={user? <Write /> : <Register/>} />
        <Route path="/settings" element={user? <Settings /> : <Register/>} />
        <Route path="/post/:postId" element={<Single />} />
        
    </Routes>

    {/* <Home/> */}
    {/* <Write/> */}
    {/* <Settings/> */}
    {/* <Single/> */}
    {/* <Login/> */}
    {/* <Register/> */}
    



    </>
  );
}

export default App;
