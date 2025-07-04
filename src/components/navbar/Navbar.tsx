function Navbar() {
  return (
    <>
      <div className="w-full fixed top-0 flex justify-center py-4 bg-white text-purple-900 shadow-b">
        <div className="w-full flex justify-between text-lg px-4">
          Blog Pessoal
          <ul className="flex gap-4 font-bold">
            <li className="hover:text-purple-700 transition-colors cursor-pointer px-2 py-1 rounded hover:bg-purple-100">
              Postagens
            </li>
            <li className="hover:text-purple-700 transition-colors cursor-pointer px-2 py-1 rounded hover:bg-purple-100">
              Temas
            </li>
            <li className="hover:text-purple-700 transition-colors cursor-pointer px-2 py-1 rounded hover:bg-purple-100">
              Cadastrar tema
            </li>
            <li className="hover:text-purple-700 transition-colors cursor-pointer px-2 py-1 rounded hover:bg-purple-100">
              Perfil
            </li>
            <li className="hover:text-red-600 transition-colors cursor-pointer px-2 py-1 rounded hover:bg-red-100">
              Sair
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
