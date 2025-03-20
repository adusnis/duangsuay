"use client"
import { useState } from 'react';
import Dice from '@/components/Dice';
import Link from 'next/link';
import { Home } from "lucide-react";

export default function Wadduang() {
    const [results, setResults] = useState<number[]>([]);
    const [currentResult, setCurrentResult] = useState<number | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [rolling, setRolling] = useState<boolean>(false);
    const [isRolling, setIsRolling] = useState<boolean>(false);

    const getAspectText = (index: number) => {
        switch (index) {
            case 0: return "ดวงชีวิต";
            case 1: return "ดวงการเรียน";
            case 2: return "ดวงความรัก";
            default: return "";
        }
    };

    const rollDice = () => {
        setRolling(true);
        const newResults = Array.from({ length: 3 }, () => Math.floor(Math.random() * 6) + 1);
        setResults(newResults);
        setCurrentIndex(0);
        setCurrentResult(null);
        rollNextDice(newResults, 0);
    };

    const rollNextDice = (newResults: number[], index: number) => {
        if (index < newResults.length) {
            setIsRolling(true);
            // Random rolling animation for 0.5 seconds
            const rollInterval = setInterval(() => {
                setCurrentResult(Math.floor(Math.random() * 6) + 1);
            }, 50);

            setTimeout(() => {
                clearInterval(rollInterval);
                setCurrentResult(newResults[index]);
                setIsRolling(false);
                setCurrentIndex(index);
                
                // Add pause before next roll
                setTimeout(() => {
                    rollNextDice(newResults, index + 1);
                }, 500);
            }, 500);
        } else {
            setRolling(false);
            setIsRolling(false);
        }
    };

    const getResultText = (value: number) => {
        switch (value) {
            case 1: return "ดวงกุด";
            case 2: return "ดวงซวย";
            case 3: return "ทำบุญบ้างนะ";
            case 4: return "ก็ได้อยู่";
            case 5: return "ดวงดี";
            case 6: return "พระเจ้าจอร์จ ดวงยอดมาก";
            default: return "";
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a12] px-4 py-8 relative overflow-hidden">
            <h1 className="text-[#e0c7ff] text-3xl font-medium text-center italic" 
                style={{textShadow: '0 0 10px rgba(224, 199, 255, 0.5)'}}>
                ✨ วัดดวงของคุณ ✨
            </h1>
            {!results.length && (
                <button 
                    className="mt-8 bg-gradient-to-r from-[#4a2b6b] to-[#2b1645] text-[#e0c7ff] py-4 px-6 rounded-full text-xl font-medium transition-all hover:shadow-[0_0_15px_rgba(224,199,255,0.3)] hover:scale-105"
                    onClick={rollDice}
                    disabled={rolling}
                >
                    กดเพื่อวัดดวง
                </button>
            )}
            {rolling && (
                <div className="mt-8 flex flex-col items-center">
                    <p className="text-[#e0c7ff] text-xl mb-4">กำลังทอย{getAspectText(currentIndex)}...</p>
                    <Dice
                        size={120}
                        rollingTime={1000}
                        value={currentResult || 1}
                        isRolling={isRolling}
                    />
                </div>
            )}
            {!rolling && results.length > 0 && (
                <div className="mt-8 flex flex-col items-center">
                    <div className="text-[#e0c7ff] text-xl mb-8">
                        <p>ดวงชีวิต: {getResultText(results[0])}</p>
                        <p>ดวงการเรียน: {getResultText(results[1])}</p>
                        <p>ดวงความรัก: {getResultText(results[2])}</p>
                    </div>
                    <Link href="/" className="bg-gradient-to-r from-[#4a2b6b] to-[#2b1645] text-[#e0c7ff] py-4 px-6 rounded-full text-xl font-medium transition-all hover:shadow-[0_0_15px_rgba(224,199,255,0.3)] hover:scale-105 flex items-center gap-2">
                        <Home size={24} />
                    </Link>
                </div>
            )}
        </div>
    );
}
