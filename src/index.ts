import { Hono } from "hono";
import api from "./routes/api";
import doc from "./routes/doc";
import top from "./routes/top";

const app = new Hono({ strict: false });

app.route("/", top);
app.route("/api", api);
app.route("/doc", doc);

export default app;
