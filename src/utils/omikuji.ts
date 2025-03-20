import { OMIKUJI, OMIKUJI_LIST } from "../constants/omikuji";

/**
 * モアくじを1回引く関数
 * @returns{{name: keyof typeof OMIKUJI, prob: number}} モアくじの結果
 */
export const drawOmikuji = (): { name: keyof typeof OMIKUJI; prob: number } => {
  const totalProbability = Object.values(OMIKUJI).reduce(
    (total, prob) => total + prob,
    0
  );
  let random = Math.random() * totalProbability; // totalProbabilityは絶対1だが一応

  for (const [name, prob] of OMIKUJI_LIST) {
    if (random < prob) {
      return {
        name,
        prob,
      };
    }
    random -= prob;
  }

  // ここに到達することは通常ないが、デフォルトの返却値を設定
  return {
    name: "大モア吉" as keyof typeof OMIKUJI,
    prob: OMIKUJI["大モア吉"],
  };
};

/**
 * モアくじをn回引いて結果を返す関数
 * @param{number} n モアくじを引く回数
 * @returns{Array<{name: keyof typeof OMIKUJI, count: number, originProb: number}>} モアくじの結果
 */
export const drawMultipleOmikuji = (
  n: number
): Array<{ name: keyof typeof OMIKUJI; count: number; originProb: number }> => {
  const count = new Map<keyof typeof OMIKUJI, number>();

  for (let i = 0; i < n; i++) {
    const { name } = drawOmikuji();
    count.set(name, (count.get(name) ?? 0) + 1);
  }

  return OMIKUJI_LIST.map(([name, _]) => {
    return {
      name,
      count: count.get(name) ?? 0,
      originProb: OMIKUJI[name],
    };
  });
};
