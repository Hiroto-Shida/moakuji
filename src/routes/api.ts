/**
 * `/api` 以下のエンドポイントを定義
 */
import { OpenAPIHono } from "@hono/zod-openapi";
import { multipleGetRoute } from "../openApiSchema/multipleGet";
import { sigleGetRoute } from "../openApiSchema/singleGet";
import { drawMultipleOmikuji, drawOmikuji } from "../utils/omikuji";

const api = new OpenAPIHono();

api.openapi(sigleGetRoute, (c) => {
  const result = drawOmikuji();
  return c.json(result, 200);
});

api.openapi(multipleGetRoute, (c) => {
  const n = c.req.param("n");
  const num = Number(n);

  const errorMessage = (() => {
    // nが数字でない場合はエラー
    if (isNaN(num)) {
      return "n should be a number";
    }

    // 少数の場合はエラー
    if (num % 1 !== 0) {
      return "n should be an integer";
    }

    // nが1以上10000以下でない場合はエラー
    if (num < 1 || num > 10000) {
      return "n should be between 1 and 1000";
    }
    return null;
  })();

  if (errorMessage) {
    return c.json(
      {
        status: 400,
        message: errorMessage,
      },
      400
    );
  }

  const result = drawMultipleOmikuji(num);
  return c.json(
    {
      num,
      result,
    },
    200
  );
});

// OpenAPIのjsonを返すエンドポイント
api.doc31("/specification", {
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "Moakuji API",
  },
});

export default api;
