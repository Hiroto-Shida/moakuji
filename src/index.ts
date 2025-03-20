import { Hono } from "hono";
import api from "./api";

const app = new Hono();
app.route("/api", api);

app.get("/", (c) => {
  return c.text("Moakuji Top Page");
});

export default app;
