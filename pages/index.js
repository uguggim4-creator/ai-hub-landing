// pages/index.js 파일 내용

import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

// 🚨🚨🚨 CSS를 통해 전역 폰트를 적용할 것이므로, 여기서는 별도 임포트 필요 없음 🚨🚨🚨
// Tailwind CSS 설정 파일 (tailwind.config.js)을 통해 폰트를 정의하고 사용합니다.

export default function Home() {
  // 실제 Vercel 배포 주소로 설정된 상태입니다.
  const toolUrls = {
    storyboard: "https://your-storyboard-tool-url.vercel.app/", // 🚨 실제 주소로 변경 필요
    imageTool: "https://ainspire-image-tool-api.vercel.app/",
    referenceCollector: "https://your-reference-collector-url.vercel.app/", // 🚨 실제 주소로 변경 필요
    promptGenerator: "https://ainspireveo3-prompt-generator.vercel.app/",
  };

  // 상태 관리: 타이틀 이미지 퇴장과 메인 콘텐츠 등장을 분리하여 제어
  const [showTitleImage, setShowTitleImage] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    // 1. 타이틀 이미지 퇴장 타이머 (1초 후 퇴장 애니메이션 시작)
    const exitTimer = setTimeout(() => {
      setShowTitleImage(false);
    }, 1000); // 1초(1000ms) 후 실행

    // 2. 메인 콘텐츠 등장 타이머 (타이틀이 완전히 사라진 후 5초 뒤 등장)
    // 퇴장 시작(1초) + 퇴장 지속시간(1초) + 추가 대기 시간(5초) = 총 7초
    const mainContentTimer = setTimeout(() => {
        setShowMainContent(true);
    }, 1500); // 1.5초(1500ms) 후 실행

    // 3. 정리 함수: 타이머를 깔끔하게 해제하여 무한 반복을 방지합니다.
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(mainContentTimer);
    };
  }, []); // 페이지 로드 시 단 한 번만 실행됨

  // Framer Motion Variants (애니메이션 정의)
  const titleImageVariants = {
    initial: { opacity: 0, y: 300 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -300 }, // 퇴장 모션: 위로 사라짐
  };

  const mainContentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // 카드 등장 간격을 약간 줄임
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }, // 튕기는 효과 강화
  };

  return (
    // 전체 배경 이미지 적용
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white p-6"
      style={{
        backgroundImage: 'url("/배경.jpg")', // public 폴더의 배경 이미지 사용
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Head>
        <title>AInspire 통합 허브</title>
      </Head>

      {/* 타이틀 이미지 등장/퇴장 모션 영역 */}
      <AnimatePresence>
        {showTitleImage && (
          <motion.div
            key="titleImage"
            variants={titleImageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1, ease: "easeInOut" }} // 등장/퇴장 1초 지속
            className="absolute z-10"
          >
            <img
              src="/ainspire 타이틀.png" // public 폴더의 타이틀 이미지 사용
              alt="AInspire 타이틀"
              className="max-w-xs md:max-w-md lg:max-w-lg mx-auto"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 메인 콘텐츠: showMainContent가 true일 때만 나타납니다. */}
      {showMainContent && (
        <motion.main
          className="text-center w-full max-w-6xl bg-black bg-opacity-70 rounded-lg p-8 shadow-2xl relative z-0" // 가로 최대 너비 확장
          variants={mainContentVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0 }}
        >
          <h1 className="text-5xl font-extrabold mb-8 text-yellow-400 font-sans-kr"> {/* 노란색 타이틀 + 한글 폰트 적용 */}
            AInspire 통합 허브
          </h1>

          <motion.p
            className="text-xl text-gray-300 mb-16 font-sans-kr" // 한글 폰트 적용
            variants={itemVariants}
          >
            당신의 워크플로우를 혁신할 강력한 AI 도구들을 지금 바로 경험하세요.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"> {/* 2x2 그리드 레이아웃 */}

            {/* --- 스토리보드 도구 박스 --- */}
            <motion.a
              href={toolUrls.storyboard}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-8 border border-gray-700 rounded-xl shadow-2xl bg-gray-800 hover:border-green-500 transition duration-300 transform hover:scale-[1.05]"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold text-green-400 mb-3 font-sans-kr">스토리보드</h2>
              <p className="text-gray-400 mb-6 font-sans-kr">
                아이디어를 시각화하고 스토리를 구성하는 데 도움을 줍니다.
              </p>
              <span className="text-green-500 font-semibold text-lg font-sans-kr">도구 사용하기 →</span>
            </motion.a>

            {/* --- 이미지 툴 박스 --- */}
            <motion.a
              href={toolUrls.imageTool}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-8 border border-gray-700 rounded-xl shadow-2xl bg-gray-800 hover:border-blue-500 transition duration-300 transform hover:scale-[1.05]"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold text-blue-400 mb-3 font-sans-kr">이미지 툴</h2>
              <p className="text-gray-400 mb-6 font-sans-kr">
                간단한 프롬프트만으로 놀라운 고품질 이미지를 생성합니다.
              </p>
              <span className="text-blue-500 font-semibold text-lg font-sans-kr">도구 사용하기 →</span>
            </motion.a>

            {/* --- 레퍼런스 수집기 박스 --- */}
            <motion.a
              href={toolUrls.referenceCollector}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-8 border border-gray-700 rounded-xl shadow-2xl bg-gray-800 hover:border-purple-500 transition duration-300 transform hover:scale-[1.05]"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold text-purple-400 mb-3 font-sans-kr">레퍼런스 수집기</h2>
              <p className="text-gray-400 mb-6 font-sans-kr">
                영감을 줄 레퍼런스를 효율적으로 찾아 관리합니다.
              </p>
              <span className="text-purple-500 font-semibold text-lg font-sans-kr">도구 사용하기 →</span>
            </motion.a>

            {/* --- 프롬프트 생성기 박스 --- */}
            <motion.a
              href={toolUrls.promptGenerator}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-8 border border-gray-700 rounded-xl shadow-2xl bg-gray-800 hover:border-cyan-500 transition duration-300 transform hover:scale-[1.05]"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold text-cyan-400 mb-3 font-sans-kr">프롬프트 생성기</h2>
              <p className="text-gray-400 mb-6 font-sans-kr">
                AI에게 최적의 지시를 내릴 수 있는 프롬프트를 자동으로 만듭니다.
              </p>
              <span className="text-cyan-500 font-semibold text-lg font-sans-kr">도구 사용하기 →</span>
            </motion.a>

          </div>
        </motion.main>
      )}
    </div>
  );
}