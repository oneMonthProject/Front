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
    plugin(function ({ addBase, matchUtilities, addComponents,theme }) {
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
        }
      });
      addComponents({
        '.checkbox': {
          position: 'relative',
          'input,svg': {
            width: '21px',
            height: '21px',
            display: 'block'
          },
          'input': {
            '-webkit-appearance': 'none',
            '-moz-appearance': 'none',
            position: 'relative;',
            outline: 'none;',
            backgroundColor: '#fff',
            border: 'none',
            margin: '0',
            padding: '0',
            cursor: 'pointer',
            borderRadius: '4px',
            boxShadow: 'inset 0 0 0 1px #D1D6EE',
            '&:hover': {
              boxShadow: 'inset 0 0 0 2px, #BBC1E1'
            },
            '&:checked': {
              boxShadow: 'inset 0 0 0 2px #1E2235',
              '& + svg':{
                stroke:'#333',
                'stroke-dasharray': '16.1 86.12',
                'stroke-dashoffset': '102.22'
              }
            },
            '&:disabled':{
              boxShadow:'inset 0 0 0 2px #999',
              cursor:'default',
              '& + svg':{
                stroke:'#999',
                'stroke-dasharray': '16.1 86.12',
                'stroke-dashoffset': '102.22'
              }
            }
          },
          'svg': {
            pointerEvents: 'none',
            fill: 'none',
            'stroke-width': '2px',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            stroke:'#999',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '21px',
            height: '21px',
            'stroke-dasharray': '16.1 86.12',
            'stroke-dashoffset': '102.22'
          }

        },

      })
      matchUtilities({
            hoverColorChange:(value) => ({
                border: `1px solid ${value}`,
                borderRadius: '0.25rem',
                backgroundColor: `${value}`,
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDuration: '120ms',
                transitionProperty: 'background-color'
            })
          },
          {values:theme('colors')}
      )
    }),
  ],
};
export default config;
