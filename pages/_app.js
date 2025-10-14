// pages/_app.js 파일 내용 - 최종 복구 버전

import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  // 모든 Framer Motion, AnimatePresence, useRouter 관련 코드를 제거했습니다.
  // 이 파일은 이제 CSS를 임포트하고 페이지 컴포넌트를 렌더링하는 역할만 합니다.
  return <Component {...pageProps} />;
}