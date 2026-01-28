const getBaseUrl = (): string => {
  const url = import.meta.env.VITE_API_URL;

  if (!url) {
    throw new Error(
      "❌ Error de Configuración: VITE_API_URL no está definida. " +
      "Asegúrate de tener un archivo .env con esta variable."
    );
  }

  return url;
};

export const API_CONFIG = {
  baseUrl: getBaseUrl(),
};