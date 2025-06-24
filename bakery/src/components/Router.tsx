import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Landing from "./Landing";
import AdminPanel from '../components/admin/AdminPanel';
function Router() {
return (
    <Routes>
      <Route path="/" element={<Login />} />       
      <Route path="/register" element={<Register />} /> 
      <Route path="/landing" element={<Landing />} />
      <Route path="/admin" element={<AdminPanel />} /> 
    </Routes>
);
}
export default Router;