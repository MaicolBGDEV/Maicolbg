import { useCallback, useEffect, useRef, useState } from "react";
import StarBackground from "./components/StarBackground";
import FloatingHearts from "./components/FloatingHearts";
import IntroScreen from "./components/IntroScreen";
import PhotoAnimation from "./components/PhotoAnimation";
import RomanticMessage from "./components/RomanticMessage";
import Gallery from "./components/Gallery";
import Timeline from "./components/Timeline";
import LoveLetter from "./components/LoveLetter";
import FinalSection from "./components/FinalSection";
import BackgroundMusic from "./components/BackgroundMusic";
import { CONFIG } from "./config";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";
import "./App.css";

export default function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const [photoActive, setPhotoActive] = useState(false);
  const musicRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  // Bloquea el scroll de fondo mientras se muestra la pantalla de bienvenida
  useEffect(() => {
    document.body.style.overflow = introVisible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introVisible]);

  const handleStart = useCallback(() => {
    setIntroVisible(false);
    setPhotoActive(true);
    musicRef.current?.play(); // clic real del usuario: aquí sí se puede reproducir audio
  }, []);

  const scrollToMessage = useCallback(() => {
    const el = document.getElementById("carta-cumple");
    el?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }, [reducedMotion]);

  return (
    <>
      <StarBackground />
      <FloatingHearts />
      <BackgroundMusic ref={musicRef} src={CONFIG.music.src} />

      <IntroScreen visible={introVisible} onStart={handleStart} />

      <main className="app-main">
        <section className="section heart-section" id="corazon">
          <div className="section-inner heart-section__inner">
            <PhotoAnimation active={photoActive} onContinue={scrollToMessage} />
          </div>
        </section>

        <RomanticMessage />
        <Gallery />
        <Timeline />
        <LoveLetter />
        <FinalSection />
      </main>
    </>
  );
}