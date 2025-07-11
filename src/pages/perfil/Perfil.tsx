import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { getImagemUsuario } from "../../utils/ImagemPlaceholder";

function Perfil() {
  const navigate = useNavigate();

  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [usuario.token]);

  return (
    <div className="w-screen min-h-screen bg-indigo-900 flex justify-center py-24">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto">
          {/* Header com gradiente */}
          <header className="w-full py-6 px-8 bg-gradient-to-r from-indigo-800 to-purple-700 text-white font-bold text-3xl rounded-t-2xl text-center tracking-wide">
            Meu Perfil
          </header>

          {/* Imagem de capa */}
          <div className="relative">
            <img
              className="w-full h-48 object-cover"
              src="https://ik.imagekit.io/gabrielsouza77/postagemn.webp?updatedAt=1752204308024"
              alt="Capa do Perfil"
            />

            {/* Foto de perfil */}
            <div className="absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2">
              <img
                className="rounded-full w-24 h-24 border-4 border-white shadow-lg object-cover object-center object-fill"
                src={getImagemUsuario(usuario.foto)}
                alt={`Foto de perfil de ${usuario.nome}`}
              />
            </div>
          </div>

          {/* Informações do usuário */}
          <div className="pt-12 pb-8 px-8">
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">👤</span>
                </div>
                <div>
                  <p className="text-sm text-indigo-600 font-medium">Nome</p>
                  <p className="text-lg font-bold text-indigo-900">
                    {usuario.nome}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">📧</span>
                </div>
                <div>
                  <p className="text-sm text-purple-600 font-medium">Email</p>
                  <p className="text-lg font-bold text-purple-900">
                    {usuario.usuario}
                  </p>
                </div>
              </div>
            </div>

            {/* Botão de ação */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate("/home")}
                className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-2 border-transparent py-3 px-8 font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
