import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import { AuthContext } from "./contexts/AuthContext";
import DeletarTema from "./components/temas/deletartema/DeletarTema";
import FormTema from "./components/temas/formtema/FormTema";
import ListaTemas from "./components/temas/listatemas/ListaTemas";

function requireAuth(element: React.ReactElement, token: string) {
  return token ? element : <Login />;
}

function App() {
  const { usuario } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {usuario.token && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={requireAuth(<Home />, usuario.token)}
            />
            <Route
              path="/temas"
              element={requireAuth(<ListaTemas />, usuario.token)}
            />
            <Route
              path="/cadastrartema"
              element={requireAuth(<FormTema />, usuario.token)}
            />
            <Route
              path="/editartema/:id"
              element={requireAuth(<FormTema />, usuario.token)}
            />
            <Route
              path="/deletartema/:id"
              element={requireAuth(<DeletarTema />, usuario.token)}
            />
          </Routes>
        </main>
        {usuario.token && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
