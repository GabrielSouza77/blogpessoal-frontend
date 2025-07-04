import { Link, useNavigate } from "react-router-dom";
import type Usuario from "../../models/Usuario";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { cadastrarUsuario } from "../../services/Service";
import { HashLoader } from "react-spinners";

function Cadastro() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function retornar() {
    navigate("/login");
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);
      try {
        const { id, ...usuarioSemId } = usuario;
        await cadastrarUsuario("/usuarios/cadastrar", usuarioSemId, setUsuario);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    } else {
      alert(
        "Dados do usuário inconsistentes! Verifique as informações do cadastro"
      );
      setUsuario({
        ...usuario,
        senha: "",
      });
      setConfirmaSenha("");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-700">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md flex flex-col items-center">
        <div className="w-full flex flex-col items-center mb-6">
          <h2 className="text-3xl font-extrabold text-purple-700 mb-2">
            Cadastro
          </h2>
        </div>
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={cadastrarNovoUsuario}
        >
          <div className="flex flex-col w-full">
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="rounded bg-gray-100 placeholder-gray-400 text-indigo-900 px-4 py-2 mb-2 focus:outline-none"
              value={usuario.nome}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col w-full">
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuário"
              className="rounded bg-gray-100 placeholder-gray-400 text-indigo-900 px-4 py-2 mb-2 focus:outline-none"
              value={usuario.usuario}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col w-full">
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto (URL)"
              className="rounded bg-gray-100 placeholder-gray-400 text-indigo-900 px-4 py-2 mb-2 focus:outline-none"
              value={usuario.foto}
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
              value={usuario.senha}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col w-full">
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="rounded bg-gray-100 placeholder-gray-400 text-indigo-900 px-4 py-2 mb-2 focus:outline-none"
              value={confirmaSenha}
              onChange={handleConfirmarSenha}
            />
          </div>
          <button
            type="submit"
            className={`rounded-full bg-transparent hover:bg-purple-700 hover:text-white text-purple-700 border-2 border-purple-700 w-full py-2 font-bold mt-2 flex items-center justify-center transition-colors ${
              isLoading ? "bg-purple-700 text-white" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <HashLoader color="#ffffff" size={24} loading={true} />
            ) : (
              <span>Cadastrar</span>
            )}
          </button>
          <button
            type="button"
            className="rounded-full bg-transparent hover:bg-red-700 hover:text-white text-red-700 border-2 border-red-700 w-full py-2 font-bold mt-2 flex items-center justify-center transition-colors"
            onClick={retornar}
          >
            Cancelar
          </button>
        </form>
        <div className="w-full text-center mt-4">
          <span className="text-gray-700">Já tem uma conta? </span>
          <Link
            to="/login"
            className="text-purple-700 hover:underline font-semibold"
          >
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
