import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);

  const handleSair = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <>
      <div className="w-full fixed top-0 flex justify-center py-4 bg-white text-purple-900 shadow-md">
        <div className="w-full flex justify-between text-lg px-4">
          <div
            className="cursor-pointer hover:text-purple-700 transition-colors"
            onClick={() => navigate("/home")}
          >
            Blog Pessoal
          </div>
          <ul className="flex gap-4 font-bold">
            <li>
              <Link
                to="/postagens"
                className="hover:text-purple-700 transition-colors cursor-pointer px-2 py-1 rounded hover:bg-purple-100"
              >
                Postagens
              </Link>
            </li>
            <li>
              <Link
                to="/temas"
                className="hover:text-purple-700 transition-colors cursor-pointer px-2 py-1 rounded hover:bg-purple-100"
              >
                Temas
              </Link>
            </li>
            <li>
              <Link
                to="/cadastrartema"
                className="hover:text-purple-700 transition-colors cursor-pointer px-2 py-1 rounded hover:bg-purple-100"
              >
                Cadastrar tema
              </Link>
            </li>
            <li>
              <Link
                to="/perfil"
                className="hover:text-purple-700 transition-colors cursor-pointer px-2 py-1 rounded hover:bg-purple-100"
              >
                Perfil
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={handleSair}
                className="hover:text-red-600 transition-colors cursor-pointer px-2 py-1 rounded hover:bg-red-100"
              >
                Sair
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
