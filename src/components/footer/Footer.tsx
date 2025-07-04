import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
} from "@phosphor-icons/react";

function Footer() {
  let data = new Date().getFullYear();

  return (
    <>
      <div className="flex justify-center bg-indigo-900 text-white">
        <div className="w-full flex flex-col items-center py-4 px-4">
          <p className="text-xl font-bold">Blog Pessoal | Copyright: {data}</p>
          <p className="text-lg">Acesse minhas redes sociais</p>
          <div className="flex gap-2">
            <LinkedinLogo size={32} weight="bold" />
            <InstagramLogo size={32} weight="bold" />
            <FacebookLogo size={32} weight="bold" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
