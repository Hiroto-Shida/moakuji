/**
 * `/api` 以下のエンドポイントを定義
 */

import { Hono } from "hono";
import { drawMultipleOmikuji, drawOmikuji } from "../utils/omikuji";

const api = new Hono();

const customError = (message: string, status: number) => {
  return {
    status,
    message,
  };
};

api.get("/", (c) => {
  const result = drawOmikuji();
  return c.json(result);
});

api.get("/:n", (c) => {
  const n = c.req.param("n");
  // nが数字でない場合はエラー
  const num = Number(n);
  if (isNaN(num)) {
    return c.json(
      {
        status: 400,
        message: "n should be a number",
      },
      { status: 400 }
    );
  }

  // 少数の場合はエラー
  if (num % 1 !== 0) {
    return c.json(
      {
        status: 400,
        message: "n should be an integer",
      },
      { status: 400 }
    );
  }

  // nが1以上10000以下でない場合はエラー
  if (num < 1 || num > 10000) {
    return c.json(
      {
        status: 400,
        message: "n should be between 1 and 1000",
      },
      { status: 400 }
    );
  }

  const result = drawMultipleOmikuji(num);
  return c.json({
    num,
    result,
  });
});

export default api;
