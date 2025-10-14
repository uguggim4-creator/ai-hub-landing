// pages/_app.js 파일 내용

import '@/styles/globals.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router'; // Next.js 라우터 사용을 위해 임포트

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    // AnimatePresence: 컴포넌트가 사라지거나 나타날 때 모션을 적용하게 해줍니다.
    <AnimatePresence mode="wait" initial={false}>
      {/* motion.div: 페이지 전체를 감싸고 모션을 적용합니다. */}
      <motion.div
        key={router.route} // 🚨 현재 경로를 key로 사용하여 경로가 바뀔 때마다 모션을 재실행합니다.
        
        // 초기 상태: 완전히 투명함
        initial={{ opacity: 0, x: 0 }}
        
        // 등장 상태: 투명도가 1이 되고 원래 위치로 이동 (페이드 인 효과)
        animate={{ opacity: 1, x: 0 }}
        
        // 퇴장 상태: 완전히 투명해짐
        exit={{ opacity: 0, x: 0 }}
        
        // 모션 속도 설정: 0.5초 동안 부드럽게 전환
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  );
}