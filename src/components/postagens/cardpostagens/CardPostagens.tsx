import { Link } from "react-router-dom";
import type Postagem from "../../../models/Postagem";
import { getImagemUsuario } from "../../../utils/ImagemPlaceholder";
import type Usuario from "../../../models/Usuario";

interface CardPostagensProps {
  postagem: Postagem;
  usuario: Usuario;
}

function CardPostagens({ postagem, usuario }: CardPostagensProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl flex flex-col items-center p-0 w-full max-w-md mx-auto border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      <header className="w-full py-4 px-6 bg-gradient-to-r from-indigo-800 to-purple-700 text-white font-bold text-2xl rounded-t-2xl text-center tracking-wide">
        Postagem
      </header>

      <div className="w-full p-6">
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
          <p className="text-gray-700 leading-relaxed">{postagem.texto}</p>
          <p className="text-sm text-indigo-600 font-medium">
            Tema: {postagem.tema?.descricao}
          </p>
          <p className="text-sm text-gray-500">
            {new Intl.DateTimeFormat("pt-BR", {
              dateStyle: "full",
              timeStyle: "medium",
            }).format(new Date(postagem.data))}
          </p>
        </div>
      </div>

      <div className="flex w-full gap-2 px-6 pb-6">
        <Link
          to={`/editarpostagem/${postagem.id}`}
          className="rounded-full bg-transparent hover:bg-purple-700 hover:text-white text-purple-700 border-2 border-purple-700 w-1/2 py-2 font-bold flex items-center justify-center transition-colors shadow-sm hover:shadow-md"
        >
          Editar
        </Link>
        <Link
          to={`/deletarpostagem/${postagem.id}`}
          className="rounded-full bg-transparent hover:bg-red-700 hover:text-white text-red-700 border-2 border-red-700 w-1/2 py-2 font-bold flex items-center justify-center transition-colors shadow-sm hover:shadow-md"
        >
          Deletar
        </Link>
      </div>
    </div>
  );
}

export default CardPostagens;
