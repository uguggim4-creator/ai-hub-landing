// tailwind.config.mjs 파일 내용

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mjs}',
    './components/**/*.{js,ts,jsx,tsx,mjs}',
    './app/**/*.{js,ts,jsx,tsx,mjs}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Pretendard 폰트 클래스 정의
        'pretendard': ['Pretendard KR', 'sans-serif'],
      },
      gridTemplateColumns: {
        // 🚨 유연한 레이아웃을 위한 'autofit' 클래스 정의
        'autofit': 'repeat(auto-fit, minmax(300px, 1fr))', 
      }
    },
  },
  plugins: [],
};