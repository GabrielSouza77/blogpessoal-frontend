import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { HashLoader } from "react-spinners";

function DeletarTema() {
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
    }
  }, [id]);

  async function deletarTema() {
    setIsLoading(true);

    try {
      await deletar(`/temas/${id}`, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      } else {
        console.error(error);
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
        <h1 className="text-3xl font-extrabold text-purple-700 mb-4 text-center w-full">
          Deletar tema
        </h1>
        <p className="text-center font-semibold mb-4 text-indigo-900">
          Você tem certeza de que deseja apagar o tema a seguir?
        </p>
        <div className="w-full bg-gray-100 rounded-lg p-6 mb-6 text-center text-2xl text-indigo-900">
          {tema.descricao}
        </div>
        <div className="flex w-full gap-2">
          <button
            className="rounded-full bg-transparent hover:bg-red-700 hover:text-white text-red-700 border-2 border-red-700 w-1/2 py-2 font-bold flex items-center justify-center transition-colors"
            onClick={retornar}
          >
            Não
          </button>
          <button
            className={`rounded-full bg-transparent hover:bg-purple-700 hover:text-white text-purple-700 border-2 border-purple-700 w-1/2 py-2 font-bold flex items-center justify-center transition-colors min-h-[40px] ${
              isLoading ? "bg-purple-700 text-white" : ""
            }`}
            onClick={deletarTema}
            disabled={isLoading}
          >
            {isLoading ? (
              <HashLoader color="#ffffff" size={24} loading={true} />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeletarTema;
