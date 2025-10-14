// pages/index.js 파일 내용 - 최종 수정본 (중앙 정렬 및 태그 수정)

import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Home() {
  // 실제 Vercel 배포 주소 및 신규 홈페이지 주소
  const toolUrls = {
    storyboard: "https://ainspire-storyboard.vercel.app/",
    imageTool: "https://ainspire-image-tool-api.vercel.app/",
    referenceCollector: "https://ainspire-reference.vercel.app/",
    promptGenerator: "https://vercel-veo3-prompt-generator.vercel.app/",
    homepage: "https://ainspire.co.kr", // 👈 ainspire 홈페이지 주소
  };

  const [showTitleImage, setShowTitleImage] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    // 1. 타이틀 이미지 퇴장 타이머 (1초 후 퇴장 애니메이션 시작)
    const exitTimer = setTimeout(() => {
      setShowTitleImage(false);
    }, 1000); // 1초(1000ms) 후 실행

    // 2. 메인 콘텐츠 등장 타이머 (총 2.5초 지연)
    const mainContentTimer = setTimeout(() => {
        setShowMainContent(true);
    }, 2500); // 2.5초(2500ms) 후 실행

    // 3. 정리 함수: 타이머를 깔끔하게 해제
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(mainContentTimer);
    };
  }, []);

  // Framer Motion Variants
  const titleImageVariants = {
    initial: { opacity: 0, y: 300 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -300 },
  };

  const mainContentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // 카드 등장 간격
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } },
  };

  // 5개 도구 박스를 배열로 정의
  const toolBoxes = [
    // 1. ainspire 홈페이지 박스 (노란색으로 강조)
    {
      title: "ainspire 홈페이지",
      desc: "저희 회사의 최신 정보와 비전을<br />확인하실 수 있습니다.",
      url: toolUrls.homepage,
      color: "text-yellow-400",
      hoverColor: "hover:border-yellow-500",
      tag: "공식",
      tagColor: "text-yellow-500",
    },
    // 2. 스토리보드
    {
      title: "스토리보드",
      desc: "아이디어를 시각화하고<br />스토리를 구성하는 데 도움을 줍니다.",
      url: toolUrls.storyboard,
      color: "text-green-400",
      hoverColor: "hover:border-green-500",
      tag: "무료",
      tagColor: "text-green-500",
    },
    // 3. 이미지 툴
    {
      title: "이미지 툴",
      desc: "간단한 프롬프트만으로<br />놀라운 고품질 이미지를 생성합니다.",
      url: toolUrls.imageTool,
      color: "text-blue-400",
      hoverColor: "hover:border-blue-500",
      tag: "무료",
      tagColor: "text-blue-500",
    },
    // 4. 레퍼런스 수집기
    {
      title: "레퍼런스 수집기",
      desc: "영감을 줄 레퍼런스를<br />효율적으로 찾아 관리합니다.",
      url: toolUrls.referenceCollector,
      color: "text-purple-400",
      hoverColor: "hover:border-purple-500",
      tag: "무료",
      tagColor: "text-purple-500",
    },
    // 5. 프롬프트 생성기
    {
      title: "프롬프트 생성기",
      desc: "AI에게 최적의 지시를 내릴 수 있는<br />프롬프트를 자동으로 만듭니다.",
      url: toolUrls.promptGenerator,
      color: "text-cyan-400",
      hoverColor: "hover:border-cyan-500",
      tag: "무료",
      tagColor: "text-cyan-500",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white p-6"
      style={{
        backgroundImage: 'url("/배경.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <Head>
        <title>AInspire 통합 허브</title>
      </Head>

      <AnimatePresence>
        {showTitleImage && (
          <motion.div
            key="titleImage"
            variants={titleImageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute z-10"
          >
            <img
              src="/ainspire 타이틀.png"
              alt="AInspire 타이틀"
              className="max-w-xs md:max-w-md lg:max-w-lg mx-auto"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {showMainContent && (
        <motion.main
          className="text-center w-full max-w-7xl bg-black bg-opacity-70 rounded-lg p-8 shadow-2xl relative z-0"
          variants={mainContentVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }} // 👈 메인 콘텐츠 등장 후 0.1초 뒤 내부 모션 시작
        >
          {/* 노란색 타이틀 + Pretendard 폰트 */}
          <h1 className="text-5xl font-extrabold mb-8 text-yellow-400 font-pretendard">
            AInspire 통합 허브
          </h1>

          <motion.p
            className="text-xl text-gray-300 mb-16 font-pretendard"
            variants={itemVariants}
          >
            당신의 워크플로우를 혁신할 강력한 AI 도구들을 지금 바로 경험하세요.
          </motion.p>

          {/* 유연한 레이아웃: gridTemplateColumns 인라인 스타일 적용 */}
          <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>

            {toolBoxes.map((box, index) => (
              <motion.a
                key={box.title}
                href={box.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-8 border border-gray-700 rounded-xl shadow-2xl bg-gray-800 ${box.hoverColor} transition duration-300 transform hover:scale-[1.05]`}
                variants={itemVariants}
              >
                {/* 🚨🚨🚨 박스 내부 구조 수정: 중앙 정렬 및 태그 위에 배치 🚨🚨🚨 */}
                <div className="flex flex-col items-center mb-3"> 
                  {/* 태그 (메인 텍스트 위에 위치) */}
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full border border-current ${box.tagColor} font-pretendard mb-2`}>
                    {box.tag}
                  </span>
                  {/* 제목 (중앙 정렬) */}
                  <h2 className={`text-3xl font-bold ${box.color} font-pretendard text-center`}>
                    {box.title}
                  </h2>
                </div>
                
                {/* 설명 (중앙 정렬) */}
                <p className="text-gray-400 mb-6 font-pretendard text-center">
                  {box.desc}
                </p>
                
                {/* 링크 (중앙 정렬) */}
                <span className={`${box.tagColor} font-semibold text-lg font-pretendard mx-auto block w-fit`}>
                  {box.tag === "공식" ? "방문하기" : "도구 사용하기"} →
                </span>
              </motion.a>
            ))}

          </div>
        </motion.main>
      )}
    </div>
  );
}