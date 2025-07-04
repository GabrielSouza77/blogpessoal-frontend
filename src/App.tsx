import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import { AuthContext } from "./contexts/AuthContext";

function requireAuth(element: React.ReactElement, token: string) {
  return token ? element : <Login />;
}

function App() {
  const { usuario } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        {usuario.token && <Navbar />}
        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={requireAuth(<Home />, usuario.token)}
            />
          </Routes>
        </div>
        {usuario.token && <Footer />}
      </BrowserRouter>
    </>
  );
}

export default App;
