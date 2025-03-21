"use client"
import { useState } from "react";
import Image from 'next/image';
import ResultYan from "@/components/ResultYan";
import Link from 'next/link';
import { Home } from "lucide-react";

const questions = [
    {
        id: 1,
        question: "เจ้าต้องการความช่วยเหลือในเรื่องใดกัน... *เสียงกระซิบ*",
        options: [
            { text: "ชีวิตที่ระหกระเหิน", nextId: 2 },
            { text: "การเรียนที่ย่ำแย่", nextId: 2 },
            { text: "ความรักที่ร้าวราน", nextId: 2 }
        ]
    },
    {
        id: 2,
        question: "ข้าสัมผัสได้ถึงความอ่อนล้า... เจ้าพักผ่อนเพียงพอหรือไม่?",
        options: [
            { text: "หลับใหลดั่งผีเสื้อกลางราตรี", nextId: 3 },
            { text: "พอประทังความเหนื่อยล้า", nextId: 3 },
            { text: "นอนไม่หลับ หวาดผวา", nextId: 3 }
        ]
    },
    {
        id: 3,
        question: "อีกาดำบินผ่าน ทิ้งของขวัญไว้บนศีรษะเจ้า...",
        options: [
            { text: "ลางดี! เทพเจ้าเลือกข้า!", nextId: 4 },
            { text: "สกปรก น่าขยะแขยง", nextId: 4 },
            { text: "ข้าไม่สนใจลางร้าย", nextId: 4 }
        ]
    },
    {
        id: 4,
        question: "*เสียงหัวเราะแหลม* เจ้ารู้หรือไม่ว่าข้าเป็นใคร?",
        options: [
            { text: "หมอผีผู้ทรงพลัง", nextId: 5 },
            { text: "แม่มดโบราณผู้น่าเกรงขาม", nextId: 5 },
            { text: "ปีศาจในร่างมนุษย์", nextId: 5 }
        ]
    },
    {
        id: 5,
        question: "แล้วเจ้าเล่า... วิญญาณดวงใดกัน?",
        options: [
            { text: "ดวงวิญญาณผู้หลงทาง", nextId: null },
            { text: "นักเวทย์ผู้แสวงหา", nextId: null },
            { text: "เพียงมนุษย์น้อยไร้ค่า", nextId: null }
        ]
    }
];

export default function Yun() {
    const [currentId, setCurrentId] = useState<number | null>(1);
    const [answers, setAnswers] = useState({});
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleAnswer = async (answer: string, nextId: number | null) => {
        setIsTransitioning(true);

        if (currentId !== null) {
            setAnswers((prev) => ({ ...prev, [currentId]: answer }));
        }

        setTimeout(() => {
            if (nextId) setCurrentId(nextId);
            else setCurrentId(null);
            setIsTransitioning(false);
        }, 1000);
    };

    if (currentId === null) {
        return <ResultYan answers={answers} />;
    }

    const currentQuestion = questions.find(q => q.id === currentId);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0008] bg-[url('/forest-bg.jpg')] bg-cover bg-center bg-blend-overlay py-8 px-4">
            <div className="rounded-full overflow-hidden shadow-[0_0_30px_rgba(147,51,234,0.5)] animate-pulse mb-8">
                <Image
                    src="/witch.jpg"
                    alt="Fortune teller"
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                />
            </div>

            {currentQuestion ? (
                <div className={`w-full flex flex-col items-center transition-all duration-1000 ${isTransitioning ? 'opacity-0 transform translate-y-10' : 'opacity-100 transform translate-y-0'}`}>
                    <div className="w-[80%] bg-[#1a0028]/80 text-[#e9b8ff] py-4 px-10 rounded-2xl text-center m-5 shadow-[0_0_15px_rgba(147,51,234,0.3)] backdrop-blur-sm">
                        <h2 className="text-xl font-medium italic">
                            {currentQuestion.question}
                        </h2>
                    </div>
                    <div className="w-full space-y-3 flex flex-col items-center">
                        {currentQuestion.options.map((opt, index) => (
                            <button 
                            className="w-[80%] bg-[#2d0042]/70 text-[#e9b8ff] py-4 px-10 rounded-full text-l font-medium flex justify-center hover:bg-[#3a0055]/70 transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.3)] backdrop-blur-sm"
                            key={index}
                            disabled={isTransitioning}
                            onClick={() => handleAnswer(opt.text, opt.nextId)}
                            >
                            {opt.text}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-[#e9b8ff] text-xl">กำลังโหลด...</div>
            )}
        </div>
    );
}
