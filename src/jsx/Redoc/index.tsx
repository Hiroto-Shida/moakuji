import type { FC } from "hono/jsx";

type Props = {
  baseUrl: string;
};

const Redoc: FC<Props> = ({ baseUrl }) => {
  const specUrl = new URL("/api/specification", baseUrl).toString();

  return (
    <html>
      <head>
        <title>Moakuji - ReDoc</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <redoc spec-url={specUrl}></redoc>
        <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"></script>
      </body>
    </html>
  );
};

export default Redoc;
