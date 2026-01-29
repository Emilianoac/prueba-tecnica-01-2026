import { describe, it, expect } from "vitest";
import { http, HttpResponse } from "msw"; 
import { articleService } from "@/services/api/article/articleService"; 
import { server } from "@/__tests__/mocks/server";

describe("ArticleService", () => {
  it("debería retornar artículos cuando la API responde correctamente", async () => {
    const articles = await articleService.getArticles(1);
    
    expect(Array.isArray(articles)).toBe(true);
    expect(articles[0]).toHaveProperty("title");
  });

  it("debería lanzar error si el API devuelve datos que no son artículos", async () => {
    server.use(
      http.get("*/posts", () => {
        return HttpResponse.json({ error: "Not found" }, { status: 200 });
      })
    );

    await expect(articleService.getArticles(1)).rejects.toThrow("Invalid response");
  });
});