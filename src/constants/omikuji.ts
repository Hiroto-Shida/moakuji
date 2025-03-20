/**
 * モアくじの確率
 */
export const OMIKUJI = {
  大モア吉: 0.05,
  モア吉: 0.25,
  中モア吉: 0.2,
  小モア吉: 0.2,
  末モア吉: 0.15,
  モア凶: 0.1,
  大モア凶: 0.05,
} as const;

// TODO: できれば OMIKUJI から OMIKUJI_ENUM を生成したい
export const OMIKUJI_ENUM = [
  "大モア吉",
  "モア吉",
  "中モア吉",
  "小モア吉",
  "末モア吉",
  "モア凶",
  "大モア凶",
] as const;

export const OMIKUJI_LIST = Object.entries(OMIKUJI) as readonly [
  keyof typeof OMIKUJI,
  number
][];
