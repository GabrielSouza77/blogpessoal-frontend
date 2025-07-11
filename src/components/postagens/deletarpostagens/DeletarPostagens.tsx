import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar, deletar } from "../../../services/Service";
import { HashLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { getImagemUsuario } from "../../../utils/ImagemPlaceholder";

function DeletarPostagem() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarPostagem() {
    setIsLoading(true);

    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      ToastAlerta("Postagem apagada com sucesso", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar a postagem.", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/postagens");
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px-64px)] w-full my-4">
      <div className="w-full max-w-2xl px-4">
        <div className="bg-white rounded-2xl shadow-xl flex flex-col items-center p-0 w-full mx-auto border border-gray-200">
          <header className="w-full py-4 px-6 bg-gradient-to-r from-indigo-800 to-purple-700 text-white font-bold text-2xl rounded-t-2xl text-center tracking-wide">
            Deletar Postagem
          </header>

          <div className="w-full p-6">
            <p className="text-center font-semibold mb-6 text-lg text-gray-700">
              Você tem certeza de que deseja apagar a postagem a seguir?
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={getImagemUsuario(postagem.usuario?.foto || "")}
                  className="h-12 w-12 rounded-full border-2 border-indigo-200"
                  alt={postagem.usuario?.nome || "Usuário"}
                />
                <h3 className="text-lg font-bold text-indigo-900 uppercase">
                  {usuario.nome || "Usuário"}
                </h3>
              </div>

              <div className="space-y-3">
                <h4 className="text-xl font-semibold text-indigo-900 uppercase border-b border-indigo-100 pb-2">
                  {postagem.titulo}
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {postagem.texto}
                </p>
                <p className="text-sm text-indigo-600 font-medium">
                  Tema: {postagem.tema?.descricao}
                </p>
                <p className="text-sm text-gray-500">
                  {postagem.data &&
                    new Intl.DateTimeFormat("pt-BR", {
                      dateStyle: "full",
                      timeStyle: "medium",
                    }).format(new Date(postagem.data))}
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={retornar}
                className="rounded-full bg-transparent hover:bg-gray-700 hover:text-white text-gray-700 border-2 border-gray-700 w-1/2 py-3 font-bold flex items-center justify-center transition-colors shadow-sm hover:shadow-md"
              >
                Cancelar
              </button>
              <button
                onClick={deletarPostagem}
                className="rounded-full bg-transparent hover:bg-red-700 hover:text-white text-red-700 border-2 border-red-700 w-1/2 py-3 font-bold flex items-center justify-center transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <HashLoader color="#ffffff" size={24} loading={true} />
                ) : (
                  <span>Deletar</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletarPostagem;
