import { swaggerUI } from "@hono/swagger-ui";
import { Hono } from "hono";
import { env } from "hono/adapter";
import Redoc from "../jsx/Redoc";

const doc = new Hono();

doc.get(
  "/swagger",
  swaggerUI({
    title: "Moakuji - SwaggerUI",
    url: "/api/specification",
  })
);

doc.get("/redoc", (c) => {
  const { BASE_URL } = env<{ BASE_URL: string }>(c);
  return c.html(<Redoc baseUrl={BASE_URL} />);
});

export default doc;
