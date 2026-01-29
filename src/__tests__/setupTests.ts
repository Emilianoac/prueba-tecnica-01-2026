import { setActivePinia, createPinia } from "pinia";
import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./mocks/server";

beforeEach(() => {
  setActivePinia(createPinia());
});

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

