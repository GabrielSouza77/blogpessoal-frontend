import { Link, useNavigate } from "react-router-dom";
import type UsuarioLogin from "../../models/UsuarioLogin";
import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { HashLoader } from "react-spinners";

function Login() {
  const navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/home");
    }
  });

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-700">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md flex flex-col items-center">
        <div className="w-full flex flex-col items-center mb-6">
          <h2 className="text-3xl font-extrabold text-purple-700 mb-2">
            Login
          </h2>
        </div>
        <form className="w-full flex flex-col gap-4" onSubmit={login}>
          <div className="flex flex-col w-full">
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuário"
              className="rounded bg-gray-100 placeholder-gray-400 text-indigo-900 px-4 py-2 mb-2 focus:outline-none"
              value={usuarioLogin.usuario}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col w-full">
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="rounded bg-gray-100 placeholder-gray-400 text-indigo-900 px-4 py-2 mb-2 focus:outline-none"
              value={usuarioLogin.senha}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex items-center justify-between w-full text-xs text-gray-600 mb-2"></div>
          <button
            type="submit"
            className="rounded-full bg-transparent hover:bg-purple-700 hover:text-white text-purple-700 border-2 border-purple-700 w-full py-2 font-bold mt-2 flex items-center justify-center transition-colors"
          >
            {isLoading ? (
              <HashLoader color="#ffffff" size={24} loading={true} />
            ) : (
              <span>Entrar</span>
            )}
          </button>
        </form>
        <div className="w-full text-center mt-4">
          <span className="text-gray-700">Não tem uma conta? </span>
          <Link
            to="/cadastro"
            className="text-purple-700 hover:underline font-semibold"
          >
            Criar Conta
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
