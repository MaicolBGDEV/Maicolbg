import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import "./BackgroundMusic.css";

const BackgroundMusic = forwardRef(function BackgroundMusic({ src }, ref) {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  useImperativeHandle(ref, () => ({
    play() {
      if (!audioRef.current) return;
      audioRef.current.volume = 0.5;
      audioRef.current
        .play()
        .then(() => setStarted(true))
        .catch(() => {});
    },
  }));

  function toggleMute() {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setMuted(audioRef.current.muted);
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      {started && (
        <button
          type="button"
          className="music-toggle"
          onClick={toggleMute}
          aria-label={muted ? "Activar música" : "Silenciar música"}
        >
          {muted ? "🔇" : "🎵"}
        </button>
      )}
    </>
  );
});

export default BackgroundMusic;