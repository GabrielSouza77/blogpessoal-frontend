import { useNavigate } from "react-router-dom";
import CardTemas from "../cardtemas/CardTemas";
import { useContext, useEffect, useState } from "react";
import type Tema from "../../../models/Tema";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { FadeLoader } from "react-spinners";

function ListaTemas() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [temas, setTemas] = useState<Tema[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarTemas() {
    try {
      setIsLoading(true);

      await buscar("/temas", setTemas, {
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
    buscarTemas();
  }, [temas.length]);

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px-64px)]">
          <FadeLoader color="#7B1FA2" height={20} width={5} loading={true} />
        </div>
      )}
      {!isLoading && (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px-64px)] w-full my-4">
          <div className="w-full max-w-6xl px-4">
            {temas.length === 0 && (
              <span className="text-3xl text-center my-8 block">
                Nenhum Tema foi encontrado!
              </span>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {temas.map((tema) => (
                <CardTemas key={tema.id} tema={tema} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default ListaTemas;
