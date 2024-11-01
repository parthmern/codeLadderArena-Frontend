import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Homepage } from "./pages/Homepage";
import { Loginpage } from "./pages/Loginpage";
import { Problemspage } from "./pages/Problemspage";
import { SolveProblemPage } from "./pages/SolveProblemPage";
import { GenerateproblemPage } from "./pages/GenerateproblemPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Loginpage/>} />
      <Route path="/problems" element={<Problemspage/>} />
      <Route path="/solve/:problemId" element={<SolveProblemPage />} />
      <Route path="/generate" element={<GenerateproblemPage />} />
    </Routes>
  );
}

export default App;
