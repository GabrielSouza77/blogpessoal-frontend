import { toast } from "react-toastify";

export const ToastAlerta = (mensagem: string, tipo: string) => {
  switch (tipo) {
    case "sucesso":
      toast.success(mensagem, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
      break;
    case "erro":
      toast.error(mensagem, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
      break;
    case "info":
      toast.info(mensagem, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
      break;
    default:
      toast.info(mensagem, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
  }
};

/**
 * Função utilitária para verificar se a foto do usuário é válida
 * Retorna a URL da foto se válida, ou a imagem placeholder se inválida
 * @param foto - URL da foto do usuário
 * @returns URL da foto válida ou placeholder
 */
export const getFotoUsuario = (foto: string | undefined | null): string => {
  const placeholderImage =
    "https://ik.imagekit.io/gabrielsouza77/placeholder-image.png?updatedAt=1752203274238";

  // Se a foto não existe, é undefined, null, string vazia ou apenas "-"
  if (!foto || foto.trim() === "" || foto.trim() === "-") {
    return placeholderImage;
  }

  // Verifica se é uma URL válida
  try {
    const url = new URL(foto);
    return url.href;
  } catch {
    // Se não for uma URL válida, retorna o placeholder
    return placeholderImage;
  }
};
