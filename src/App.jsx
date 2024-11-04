import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Homepage } from "./pages/Homepage";
import { Loginpage } from "./pages/Loginpage";
import { Problemspage } from "./pages/Problemspage";
import { SolveProblemPage } from "./pages/SolveProblemPage";
import { GenerateproblemPage } from "./pages/GenerateproblemPage";
import { SubmissionDetailsPage } from "./pages/SubmissionDetailsPage";
import { AllSubmissionPage } from "./pages/AllSubmissionPage";
import { useRecoilValue } from "recoil";
import { loggedinUser } from "./recoil/atoms";

// ProtectedRoute component
function ProtectedRoute({ children }) {

  const getUserDataFromLocalStorage = () => {
    try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        
        if (userData && Date.now() < userData.expirationTime) {
            return userData.value;
        } else {
            console.log("userData not available in localstorage");
            localStorage.removeItem("userData"); // Remove expired user data
            return null;
        }
    } catch (error) {
        console.error("Error parsing userData from localStorage:", error);
        localStorage.removeItem("userData"); // Remove corrupted data
        return null;
    }
};

  const isAuthenticated = getUserDataFromLocalStorage();
  console.log("under protected route=>", isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/problems" element={<Problemspage />} /> {/* Unprotected Route */}

      {/* Protected routes */}
      <Route
        path="/solve/:problemId"
        element={
          <ProtectedRoute>
            <SolveProblemPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/generate"
        element={
          <ProtectedRoute>
            <GenerateproblemPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/submissionDetails/:submissionId"
        element={
          <ProtectedRoute>
            <SubmissionDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/allSubmissions"
        element={
          <ProtectedRoute>
            <AllSubmissionPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
