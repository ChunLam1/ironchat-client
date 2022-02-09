import { Routes, Route } from "react-router-dom";
import NavMain from "./components/Nav/NavMain";
import Home from "./pages/Home";
import PrivateRoute from "./components/ProtectedRoute/PrivateRoute";
import Server from "./pages/Server";
import Profile from "./pages/Profile";
import "./styles/global.css";
import FormServer from "./components/Forms/FormServer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/server/:id" element={<Server />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
