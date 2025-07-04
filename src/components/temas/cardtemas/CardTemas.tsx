import { Link } from "react-router-dom";
import type Tema from "../../../models/Tema";

interface CardTemasProps {
  tema: Tema;
}

function CardTemas({ tema }: CardTemasProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl flex flex-col items-center p-0 w-full max-w-md mx-auto border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      <header className="w-full py-4 px-6 bg-gradient-to-r from-indigo-800 to-purple-700 text-white font-bold text-2xl rounded-t-2xl text-center tracking-wide">
        Tema
      </header>
      <p className="p-8 text-2xl text-indigo-900 w-full text-center mb-4 font-semibold min-h-[80px] flex items-center justify-center">
        {tema.descricao}
      </p>
      <div className="flex w-full gap-2 px-6 pb-6">
        <Link
          to={`/editartema/${tema.id}`}
          className="rounded-full bg-transparent hover:bg-purple-700 hover:text-white text-purple-700 border-2 border-purple-700 w-1/2 py-2 font-bold flex items-center justify-center transition-colors shadow-sm hover:shadow-md"
        >
          Editar
        </Link>
        <Link
          to={`/deletartema/${tema.id}`}
          className="rounded-full bg-transparent hover:bg-red-700 hover:text-white text-red-700 border-2 border-red-700 w-1/2 py-2 font-bold flex items-center justify-center transition-colors shadow-sm hover:shadow-md"
        >
          Deletar
        </Link>
      </div>
    </div>
  );
}

export default CardTemas;
