"use client"
import { useEffect } from "react"
import { useAudio } from "@/contexts/AudioContext"
import { Volume2, VolumeX } from "lucide-react"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { playBackgroundMusic, isMusicPlaying, handleUserInteraction, stopBackgroundMusic } = useAudio();

  const handleClick = () => {
    if (isMusicPlaying) {
      stopBackgroundMusic();
    } else {
      handleUserInteraction();
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-[#1a0028]/80 text-[#e9b8ff] hover:bg-[#2a0038]/80 transition-all hover:shadow-[0_0_15px_rgba(233,184,255,0.3)]"
        aria-label={isMusicPlaying ? "ปิดเสียง" : "เปิดเสียง"}
      >
        {isMusicPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
      {children}
    </>
  );
} 