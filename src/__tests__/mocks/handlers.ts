import { http, HttpResponse } from "msw";
import { API_CONFIG } from "@/config/api.config";

export const handlers = [
  http.get(`${API_CONFIG.baseUrl}/posts`, ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get("_limit");

    return HttpResponse.json([
      {
        id: 1,
        title: "Test Post",
        body: "Contenido de prueba",
        userId: 1
      },
      {
        id: 2,
        title: "Test Post 2",
        body: "Contenido de prueba",
        userId: 2
      }
    ]);
  }),
];