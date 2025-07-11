import {
  useState,
  useContext,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Tema";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { HashLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [temas, setTemas] = useState<Tema[]>([]);

  const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPostagemPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    }
  }

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

  async function buscarTemas() {
    try {
      await buscar("/temas", setTemas, {
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
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();

    if (id !== undefined) {
      buscarPostagemPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
      tema: tema,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate("/postagens");
  }

  async function gerarNovaPostagem(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Postagem atualizada com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar a Postagem", "erro");
        }
      }
    } else {
      try {
        await cadastrar(`/postagens`, postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });

        ToastAlerta("Postagem cadastrada com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("401")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar a Postagem", "erro");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  const carregandoTema = tema.descricao === "";

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px-64px)] w-full my-4">
      <div className="w-full max-w-2xl px-4">
        <div className="bg-white rounded-2xl shadow-xl flex flex-col items-center p-0 w-full mx-auto border border-gray-200">
          <header className="w-full py-4 px-6 bg-gradient-to-r from-indigo-800 to-purple-700 text-white font-bold text-2xl rounded-t-2xl text-center tracking-wide">
            {id !== undefined ? "Editar Postagem" : "Cadastrar Postagem"}
          </header>

          <div className="w-full p-6">
            <form className="flex flex-col gap-6" onSubmit={gerarNovaPostagem}>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="titulo"
                  className="text-lg font-semibold text-indigo-900 uppercase"
                >
                  Título da Postagem
                </label>
                <input
                  type="text"
                  placeholder="Digite o título da postagem"
                  name="titulo"
                  required
                  className="border-2 border-indigo-200 rounded-lg p-3 focus:border-indigo-500 focus:outline-none transition-colors"
                  value={postagem.titulo}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    atualizarEstado(e)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="texto"
                  className="text-lg font-semibold text-indigo-900 uppercase"
                >
                  Texto da Postagem
                </label>
                <textarea
                  placeholder="Digite o texto da postagem"
                  name="texto"
                  required
                  rows={6}
                  className="border-2 border-indigo-200 rounded-lg p-3 focus:border-indigo-500 focus:outline-none transition-colors resize-none"
                  value={postagem.texto}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    atualizarEstado(e)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="tema"
                  className="text-lg font-semibold text-indigo-900 uppercase"
                >
                  Tema da Postagem
                </label>
                <select
                  name="tema"
                  id="tema"
                  className="border-2 border-indigo-200 rounded-lg p-3 focus:border-indigo-500 focus:outline-none transition-colors"
                  onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                >
                  <option value="" selected disabled>
                    Selecione um Tema
                  </option>

                  {temas.map((tema) => (
                    <option key={tema.id} value={tema.id}>
                      {tema.descricao}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={retornar}
                  className="rounded-full bg-transparent hover:bg-gray-700 hover:text-white text-gray-700 border-2 border-gray-700 w-1/2 py-3 font-bold flex items-center justify-center transition-colors shadow-sm hover:shadow-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-transparent hover:bg-purple-700 hover:text-white text-purple-700 border-2 border-purple-700 w-1/2 py-3 font-bold flex items-center justify-center transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={carregandoTema || isLoading}
                >
                  {isLoading ? (
                    <HashLoader color="#ffffff" size={24} loading={true} />
                  ) : (
                    <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormPostagem;
