import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import AdminPanel from "./admin/AdminPanel";
function Router() {
return (
    <Routes>
      <Route path="/" element={<Register />} /> 
      <Route path="/login" element={<Login />} />       
      <Route path="/admin" element={<AdminPanel />} />     
      
    </Routes>
);
}
export default Router;