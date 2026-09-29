import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import Subjects from "./pages/Subjects";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import "./App.css";




function App() {

  return (
    <BrowserRouter>

    <Routes>

  <Route
    path="/login"
    element={<Login />}
  />

  <Route
    path="/register"
    element={<Register />}
  />

  <Route
    element={
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    }
  >
<Route
  path="/dashboard"
  element={<Dashboard />}
/>

    <Route
      path="/subjects"
      element={<Subjects />}
    />
    <Route path="/tasks" element={<Tasks />} />

  </Route>

</Routes>
    </BrowserRouter>
  );
}


export default App;