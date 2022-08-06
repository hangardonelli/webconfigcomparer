export const isUrl = (row) =>
  row &&
  row.key &&
  (row.value.toLowerCase().startsWith("https://") ||
    row.value.toLowerCase().startsWith("http://"))
    && row.value != row.key
    ;

export const isBoolean = (row) =>
  row &&
  row.value &&
  (row.value.toLowerCase() === "true" || row.value.toLowerCase() === "false");

export const isPassword = (row) =>
  row &&
  row.key &&
  (row.key.toLowerCase().includes("clave") ||
  row.key.toLowerCase().includes("contrasena") ||
  row.key.toLowerCase().includes("contraseña") ||
  row.key.toLowerCase().includes("token") ||
  row.key.toLowerCase().includes("secret") ||
    row.key.toLowerCase().includes("password"));
