import { useNavigate } from "react-router-dom";
import CardPostagens from "../cardpostagens/CardPostagens";
import { useContext, useEffect, useState } from "react";
import type Postagem from "../../../models/Postagem";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { HashLoader } from "react-spinners";

function ListarPostagens() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [postagens, setPostagens] = useState<Postagem[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPostagens() {
    try {
      setIsLoading(true);

      await buscar("/postagens", setPostagens, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("401")) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token === "") {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarPostagens();
    console.log(postagens);
  }, [postagens.length]);

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px-64px)]">
          <HashLoader color="#7B1FA2" size={50} loading={true} />
        </div>
      )}
      {!isLoading && (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px-64px)] w-full my-4">
          <div className="w-full max-w-6xl px-4">
            {postagens.length === 0 && (
              <span className="text-3xl text-center my-8 block">
                Nenhuma Postagem foi encontrada!
              </span>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {postagens.map((postagem) => (
                <CardPostagens
                  key={postagem.id}
                  postagem={postagem}
                  usuario={usuario}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListarPostagens;
