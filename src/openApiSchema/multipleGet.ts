import { createRoute, z } from "@hono/zod-openapi";
import { OMIKUJI_ENUM } from "../constants/omikuji";

const RequestSchema = z.object({
  num: z.string().max(10000).openapi({
    type: "integer",
    description: "モアくじを振る回数",
  }),
});

const ResponseSchema = z.object({
  num: z.number().max(10000).openapi({
    description: "モアくじを振った回数",
  }),
  result: z
    .array(
      z.object({
        name: z
          // MEMO: swaggerUIやredocのUI的にはunionよりenumが見やすい
          .enum(OMIKUJI_ENUM)
          .openapi({
            description: "モアくじの結果",
          }),
        count: z.number().openapi({
          description: "出現回数",
        }),
        originProb: z.number().openapi({
          description: "設定されている出現確率",
        }),
      })
    )
    .openapi({
      description: "モアくじの集計結果",
    }),
});

const ErrorSchema = z.object({
  status: z.number().openapi({
    description: "ステータスコード",
  }),
  message: z.string().openapi({
    description: "エラーメッセージ",
  }),
});

export const multipleGetRoute = createRoute({
  method: "get",
  // TODO: redoc上だと/apiが表示されない
  path: "/multiple/{num}",
  summary: "Moai Fortune Statistics API（運勢統計取得API）",
  description: "モアくじをn回振って集計結果を取得するAPI",
  request: {
    params: RequestSchema,
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: ResponseSchema,
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
    },
  },
});
