import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:'#008A74',
        primaryDark:'#007866',
        secondary:'#005345',
        secondaryLight:'#00664F',
        secondaryDark:'#002A23',
        secondaryDark2:'#001C17',

        none: 'transparent',
        white: '#ffffff',

        black100: '#333333',
        black200: '#222222',
        black300: '#181818',

        grey000: '#fafafa',
        grey100: '#f6f6f6',
        grey200: '#eeeeee',
        grey300: '#e2e2e2',
        grey400: '#cccccc',
        grey500: '#aaaaaa',
        grey600: '#9DA2A7',
        grey700: '#888888',
        grey800: '#797979',
        grey900: '#555555',

        red: '#ED5C5C',
        redBg: '#FFF2F2',

        blue: '#4788f4',
        blueBg: '#EEF4FD',

        ground100: '#f8f9fc',
        ground200: '#f5f7fc',

        green: '#00AB83',
      }
    },
  },
  plugins: [],
}
export default config
