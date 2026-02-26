const request = require("supertest");
const app = require("../../server");

describe("GET /products", () => {
  it("debe devolver lista de productos con paginación", async () => {
    const res = await request(app).get("/products?page=1&limit=5");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });
});