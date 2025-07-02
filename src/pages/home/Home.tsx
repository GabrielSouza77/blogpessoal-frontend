function Home() {
  return (
    <>
      <div className="w-screen flex justify-center">
        <div>
          <div className="w-80 flex flex-col items-center">
            <h2>Seja Bem Vinde!</h2>
            <p>Expresse aqui seus pensamentos e opniões</p>
          </div>

          <div className="w-80 flex flex-col items-center mt-4">
            <img
              src="https://i.imgur.com/VpwApCU.png"
              alt="Imagem da Página Home"
              className="w-[400px]"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
