import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

require("tailwindcss/plugin");

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#008A74",
        secondary: "#005345",

        none: "transparent",
        white: "#ffffff",

        black100: "#333333", // 선택된 nav, 일반 폰트 색상
        black200: "#222222",
        black300: "#181818",

        grey000: "#fafafa",
        grey100: "#f6f6f6",
        grey200: "#eeeeee", // 취소버튼, 신뢰점수 - 버튼
        grey300: "#e2e2e2",
        grey400: "#cccccc",
        grey500: "#aaaaaa",
        grey600: "#9DA2A7",
        greyUnselect: "#868E96", // 선택안된 nav
        grey700: "#888888",
        grey800: "#797979",
        grey900: "#555555",

        greyBlue:"#4F5B67",
        greyDarkblue:"#242D35",

        warn: "#ED5C5C",
        danger:"#D22E1D",

        ground100: "#f8f9fc",
        ground200: "#f5f7fc",
      },
      screens: {
        mobile: { max: "767px" },
        tablet: "768px",
        pc: "1280px",
      },
    },
  },
  plugins: [
    require("tailwindcss/nesting"),
    require("tailwindcss"),
    require("autoprefixer"),
    require("@tailwindcss/forms"),
    plugin(function ({ addBase, theme }) {
      const mobile = theme("screens.mobile", { max: "max" });
      const tablet = theme("screens.tablet", {});
      const pc = theme("screens.pc", {});

      addBase({
        ".responsiveContainer": {
          [`@media (max-width:${mobile.max})`]: {
            maxWidth: "340px",
          },
          [`@media (min-width:${tablet})`]: {
            maxWidth: "750px",
          },
          [`@media (min-width:${pc})`]: {
            maxWidth: "1200px",
          },
          margin: "0 auto",
        },
      });
    }),
  ],
};
export default config;
