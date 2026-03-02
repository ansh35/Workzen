import { Routes, Route ,Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import AdminDashboard from "./pages/ADMINDASHBOARD.jsx";
import Dashboard from "./pages/Dashboard";
//import AdminPage from "./pages/Admin.jsx";
import ProjectDetails from "./pages/projectdetail.jsx";
import AddTask from "./pages/ADDTASK.jsx";
import ProtectedRoute from "./componets/ProtectedRoute.jsx";
import AppLayout from "./Layouts/Applayout.jsx";
import AddProject from "./pages/ADDPROJECT.jsx";
import Users from "./pages/USERS.jsx";

function App() {
  return (
    <Routes>
      {/*  PUBLIC ROUTES  */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PASSWORD ROUTES */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/*  PROTECTED USER ROUTES  */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/project/:projectId" element={<ProjectDetails />} />
        </Route>
      </Route>

      {/* ADMIN ROUTES */}
      <Route element={<ProtectedRoute roles={["admin"]} />}>
        <Route element={<AppLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add-task" element={<AddTask />} />
          <Route path="/admin/add-project" element={<AddProject />} />
          <Route path="/admin/users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
