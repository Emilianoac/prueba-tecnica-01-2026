import {describe, it, beforeEach } from "vitest";
import { localStorageService } from "@/services/local-storage/localStorageService";

describe("LocalStorageService", () => {
  beforeEach(() => {
    localStorage.clear();
  })

  it("debería guardar un objeto como string JSON", () => {
    const key = "user";
    const value = {id: 1, name: "User"};

    localStorageService.save(key,value);

    const storedValue = localStorage.getItem(key);
    expect(storedValue).toBe(JSON.stringify(value));
  })

  it("debería recuperar y parsear un valor guaradado", () => {
    const key = "them";
    const value = "dark";

    localStorage.setItem(key, JSON.stringify(value));

    const result = localStorageService.load<string>(key);
    expect(result).toBe(value);
  })

  it("deberia retornar null si la clave no existe", () => {
    const result = localStorageService.load("clave_inexistente")
    expect(result).toBeNull();
  })
})