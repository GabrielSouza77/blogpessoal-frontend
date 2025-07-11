export function getImagemUsuario(foto: string): string {
  const placeholderImage =
    "https://ik.imagekit.io/gabrielsouza77/Placeholder_view_vector.svg.png?updatedAt=1752203977186";

  if (
    !foto ||
    foto.trim() === "" ||
    foto === "-" ||
    foto === "null" ||
    foto === "undefined"
  ) {
    return placeholderImage;
  }

  try {
    new URL(foto);
    return foto;
  } catch {
    return placeholderImage;
  }
}
