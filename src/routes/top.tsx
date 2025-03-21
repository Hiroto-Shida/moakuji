import { Hono } from "hono";
import { env } from "hono/adapter";
import Top from "../jsx/Top";

const top = new Hono();

top.get("/", (c) => {
  const { BASE_URL } = env<{ BASE_URL: string }>(c);
  return c.html(<Top baseUrl={BASE_URL} />);
});

export default top;
