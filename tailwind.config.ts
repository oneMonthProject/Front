import type {Config} from 'tailwindcss';

require('tailwindcss/plugin');

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: '#008A74',
                secondary: '#005345',

                none: 'transparent',
                white: '#ffffff',

                black100: '#333333', // 선택된 nav, 일반 폰트 색상
                black200: '#222222',
                black300: '#181818',

                grey000: '#fafafa',
                grey100: '#f6f6f6',
                grey200: '#eeeeee', // 취소버튼, 신뢰점수 - 버튼
                grey300: '#e2e2e2',
                grey400: '#cccccc',
                grey500: '#aaaaaa',
                grey600: '#9DA2A7',
                greyUnselect: '#868E96', // 선택안된 nav
                grey700: '#888888',
                grey800: '#797979',
                grey900: '#555555',

                warn: '#ED5C5C',

                ground100: '#f8f9fc',
                ground200: '#f5f7fc',
            },
            screens: {
                'mobile': {'max':'767px'},
                'tablet': '768px',
                'pc': '1280px'
            }
        },
    },
    plugins: [
        require('tailwindcss/nesting'),
        require('tailwindcss'),
        require('autoprefixer'),
        require('@tailwindcss/forms')
    ],

}
export default config
