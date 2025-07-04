import {
  useState,
  useContext,
  type ChangeEvent,
  type FormEvent,
  useEffect,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { HashLoader } from "react-spinners";

function FormTema() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [tema, setTema] = useState<Tema>({} as Tema);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarTemaPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarTemaPorId(id);
    } else {
      setTema({
        id: undefined,
        descricao: "",
      });
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [e.target.name]: e.target.value,
    });
  }

  async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar("/temas", tema, setTema, {
          headers: { Authorization: token },
        });
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          console.error(error);
        }
      }
    } else {
      try {
        await cadastrar("/temas", tema, setTema, {
          headers: { Authorization: token },
        });
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          console.error(error);
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/temas");
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px-64px)]">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-purple-700 mb-6 text-center w-full">
          {id === undefined ? "Cadastrar Tema" : "Editar Tema"}
        </h1>
        <form className="w-full flex flex-col gap-4" onSubmit={gerarNovoTema}>
          <div className="flex flex-col w-full">
            <label
              htmlFor="descricao"
              className="mb-1 text-indigo-900 font-semibold"
            >
              Descrição do Tema
            </label>
            <input
              type="text"
              placeholder="Descreva aqui seu tema"
              name="descricao"
              className="rounded bg-gray-100 placeholder-gray-400 text-indigo-900 px-4 py-2 mb-2 focus:outline-none"
              value={tema.descricao}
              onChange={atualizarEstado}
            />
          </div>
          <button
            className={`rounded-full bg-transparent hover:bg-purple-700 hover:text-white text-purple-700 border-2 border-purple-700 w-full py-2 font-bold mt-2 flex items-center justify-center transition-colors min-h-[40px] ${
              isLoading ? "bg-purple-700 text-white" : ""
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <HashLoader color="#ffffff" size={24} loading={true} />
            ) : (
              <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
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
      </div>
    </div>
  );
}

export default FormTema;
