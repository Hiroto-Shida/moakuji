import { css, keyframes, Style } from "hono/css";
import type { FC } from "hono/jsx";
import { urlJoin } from "../../utils/urls";

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// グラデーション背景のスタイル
const bodyClass = css`
  margin: 0;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Arial", sans-serif;
  background: linear-gradient(217deg, #3366ffcc, #3366ff00 70.71%),
    linear-gradient(127deg, #33ccffcc, #33ccff00 70.71%),
    linear-gradient(336deg, #33ff66cc, #33ff6600 70.71%),
    linear-gradient(67deg, #9933ffcc, #9933ff00 70.71%);
  background-size: 600% 600%;
  animation: ${gradient} 5s ease infinite;
  color: #fff;
  text-align: center;
`;

// タイトルのスタイル
const titleClass = css`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

// curlコマンドの親要素のスタイル
const curlParentClass = css`
  width: 100%;
  max-width: 600px;
  margin-top: 1rem;
`;

// サブタイトルのスタイル
const subtitleClass = css`
  font-size: 1%.5;
  margin: 0.5rem 0;
  text-align: left;
`;

// curlコマンドのスタイル
const curlCommandClass = css`
  background-color: #272822;
  color: #f8f8f2;
  padding: 1.5rem 1rem;
  border-radius: 5px;
  font-family: "Courier New", Courier, monospace;
  font-size: 1rem;
  white-space: pre-wrap;
  text-align: left;
  position: relative;
  overflow-wrap: break-word;
`;

// リンクの親要素のスタイル
const linkContainerClass = css`
  display: flex;
  justify-content: center;
  width: 100%;
  position: absolute;
  bottom: 1rem;
  gap: 1rem;
`;

// リンクのスタイル
const linkClass = css`
  padding: 0.5rem 1rem;
  color: #f8f8f2;
  font-size: 1rem;
`;

const Body: FC<Props> = ({ baseUrl }) => {
  return (
    <body className={bodyClass}>
      <h1 className={titleClass}>Moakuji API</h1>

      <div className={curlParentClass}>
        <h2 className={subtitleClass}>Moai Fortune Single API</h2>
        <p className={curlCommandClass}>
          {`curl -L -X GET '${urlJoin(baseUrl, "/api/single")}'`}
        </p>
      </div>

      <div className={curlParentClass}>
        <h2 className={subtitleClass}>Moai Fortune Statistics API</h2>
        <div className={curlCommandClass}>
          {`curl -L -X GET '${urlJoin(baseUrl, "/api/multiple/10")}'`}
        </div>
      </div>
      <div className={linkContainerClass}>
        <a href={urlJoin(baseUrl, "/doc/swagger")} className={linkClass}>
          Swagger UI
        </a>
        <a href={urlJoin(baseUrl, "/doc/redoc")} className={linkClass}>
          Redoc
        </a>
      </div>
    </body>
  );
};

type Props = {
  baseUrl: string;
};

const Top: FC<Props> = ({ baseUrl }) => {
  return (
    <html>
      <head>
        <title>Moakuji</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Style />
      </head>
      <Body baseUrl={baseUrl} />
    </html>
  );
};

export default Top;
