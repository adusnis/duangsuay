"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [fireflies, setFireflies] = useState<{ id: number; top: string; left: string; delay: string }[]>([]);

  useEffect(() => {
    const newFireflies = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`
    }));
    setFireflies(newFireflies);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a12] px-4 py-8 relative overflow-hidden">
      {fireflies.map((firefly) => (
        <div
          key={firefly.id}
          className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-0 animate-pulse"
          style={{
            top: firefly.top,
            left: firefly.left,
            animation: `pulse 2s infinite ${firefly.delay}`,
            boxShadow: '0 0 10px 2px rgba(255, 255, 0, 0.3)'
          }}
        />
      ))}
      
      <div className="w-[80%] max-w-md flex flex-col items-center space-y-12 relative z-10">
        <h1 className="text-[#e0c7ff] text-3xl font-medium text-center italic" 
            style={{textShadow: '0 0 10px rgba(224, 199, 255, 0.5)'}}>
          ✨ วันนี้คุณดวงชวยหรือยัง? ✨
        </h1>

        <div className="w-full flex flex-col space-y-8">
          <button className="w-full bg-gradient-to-r from-[#4a2b6b] to-[#2b1645] text-[#e0c7ff] py-4 px-6 rounded-full text-xl font-medium transition-all hover:shadow-[0_0_15px_rgba(224,199,255,0.3)] hover:scale-105">
            <Link href="/wadduang/">
              🔮 วัดดวง
            </Link>
          </button>

          <button className="w-full bg-gradient-to-r from-[#4a2b6b] to-[#2b1645] text-[#e0c7ff] py-4 px-6 rounded-full text-xl font-medium transition-all hover:shadow-[0_0_15px_rgba(224,199,255,0.3)] hover:scale-105">
            <Link href="/yun/">
              ⭐ ยันต์แก้ดวง
            </Link>
          </button>

          {/* <button className="w-full bg-gradient-to-r from-[#4a2b6b] to-[#2b1645] text-[#e0c7ff] py-4 px-6 rounded-full text-xl font-medium transition-all hover:shadow-[0_0_15px_rgba(224,199,255,0.3)] hover:scale-105">
            <Link href="/sorb/">
              🌟 หยั่งรู้ผลสอบ
            </Link>
          </button> */}
        </div>
      </div>
    </div>
  )
}
