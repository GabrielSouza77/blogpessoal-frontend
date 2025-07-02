function Home() {
  return (
    <>
      <div className="w-screen min-h-screen bg-indigo-900 flex justify-center">
        <div className="w-full grid grid-cols-2 text-white px-4">
          <div className="flex flex-col gap-4 items-center justify-center py-4">
            <h2 className="text-5xl font-bold">Seja Bem Vinde!</h2>
            <p className="text-xl">Expresse aqui seus pensamentos e opniões</p>

            <div className="flex justify-around gap-4">
              <div className="rounded text-white border-white border-solid border-2 py-2 px-4">
                Nova Postagem
              </div>
            </div>
          </div>

          <div className="flex justify-center py-24">
            <img
              src="https://i.imgur.com/fyfri1v.png"
              alt="Imagem Página Home"
              className="w-2/3 h-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
