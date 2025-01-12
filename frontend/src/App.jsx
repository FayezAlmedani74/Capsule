import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Capsules from "./pages/Capsules";
import CreateCapsule from "./pages/CreateCapsule";
import UpdateCapsule from "./pages/UpdateCapsule";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/capsules"
            element={
              <ProtectedRoute>
                <Capsules />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-capsule"
            element={
              <ProtectedRoute>
                <CreateCapsule />
              </ProtectedRoute>
            }
          />
          <Route path="/update-capsule/:id" element={<UpdateCapsule />} />
        </Routes>
      </Router>
      <ToastContainer position="bottom-left" rtl />
    </>
  );
};

export default App;
