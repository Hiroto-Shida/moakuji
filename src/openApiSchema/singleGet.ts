import { createRoute, z } from "@hono/zod-openapi";
import { OMIKUJI_ENUM } from "../constants/omikuji";

const ResponseSchema = z.object({
  name: z
    // MEMO: swaggerUIやredocのUI的にはunionよりenumが見やすい
    .enum(OMIKUJI_ENUM)
    .openapi({
      description: "モアくじの結果",
    }),
  prob: z.number().openapi({
    description: "設定されている出現確率",
  }),
});

export const sigleGetRoute = createRoute({
  method: "get",
  // TODO: redoc上だと/apiが表示されない
  path: "/single",
  summary: "Moai Fortune Single API（単一運勢取得API）",
  description: "モアイ運勢をランダムで一つ取得するAPI",
  request: {},
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: ResponseSchema,
        },
      },
    },
  },
});
