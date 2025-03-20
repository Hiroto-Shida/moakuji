import { Hono } from "hono";

const top = new Hono();

top.get("/", (c) => c.text("Moakuji Top Page"));

export default top;
