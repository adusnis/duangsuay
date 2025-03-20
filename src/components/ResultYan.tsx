import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";
import { Download, Home } from "lucide-react";

interface ResultYanProps {
    answers: Record<number, string>;
}

type YantraImage = {
    src: string;
    alt: string;
};

export default function ResultYan({ answers }: ResultYanProps) {
    const router = useRouter();

    const getYantraImages = (answers: Record<number, string>): YantraImage[] => {
        const centerImage = {
            src: answers[1] === "ชีวิตที่ระหกระเหิน" ? "/images/Center1.png" :
                 answers[1] === "การเรียนที่ย่ำแย่" ? "/images/Center2.png" :
                 "/images/Center3.png",
            alt: "Center Yantra"
        };

        const cornerImage = {
            src: answers[2] === "หลับใหลดั่งผีเสื้อกลางราตรี" ? "/images/Corner1.png" :
                 answers[2] === "พอประทังความเหนื่อยล้า" ? "/images/Corner2.png" :
                 "/images/Corner3.png",
            alt: "Corner Yantra"
        };

        const frameImage = {
            src: answers[3] === "ลางดี! เทพเจ้าเลือกข้า!" ? "/images/Frame1.png" :
                 answers[3] === "สกปรก น่าขยะแขยง" ? "/images/Frame2.png" :
                 "/images/Frame3.png",
            alt: "Frame Yantra"
        };
        
        const innerImage = {
            src: answers[4] === "หมอผีผู้ทรงพลัง" ? "/images/Inner1.png" :
                 answers[4] === "แม่มดโบราณผู้น่าเกรงขาม" ? "/images/Inner2.png" :
                 "/images/Inner3.png",
            alt: "Inner Yantra"
        };

        return [centerImage, frameImage, cornerImage, innerImage];
    };

    const handleDownload = async (): Promise<void> => {
        const element = document.querySelector('.image-container') as HTMLDivElement;
        if (!element) return;

        try {
            const canvas = await html2canvas(element);
            const link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.download = 'yantra.png';
            link.click();
        } catch (error) {
            console.error('Error generating image:', error);
        }
    };

    const getBgColorClass = (answer: string): string => {
        switch (answer) {
            case "หมอผีผู้ทรงพลัง": return "bg-red-500";
            case "แม่มดโบราณผู้น่าเกรงขาม": return "bg-yellow-500";
            default: return "bg-blue-500";
        }
    };

    const images = getYantraImages(answers);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a12] px-4 py-8">
            <h1 className="text-[#e0c7ff] text-3xl font-medium text-center italic mb-8" 
                style={{textShadow: '0 0 10px rgba(224, 199, 255, 0.5)'}}>
                🪄 ยันต์นี้อาจช่วยเจ้าได้ 🔮
            </h1>
            
            <div className="relative image-container">
                <div className={`w-64 h-64 ${getBgColorClass(answers[4])} relative z-10`}>
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img.src}
                            alt={img.alt}
                            className={`absolute inset-0 w-full h-full object-contain ${index === 0 ? 'opacity-70' : ''}`}
                        />
                    ))}
                </div>
                {/* Dark flame effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute -inset-2 bg-gradient-to-t from-purple-900/50 to-transparent opacity-75 animate-pulse"></div>
                    <div className="absolute -inset-2 bg-gradient-to-b from-purple-900/50 to-transparent opacity-75 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-900/50 to-transparent opacity-75 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute -inset-2 bg-gradient-to-l from-purple-900/50 to-transparent opacity-75 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                </div>
            </div>

            <div className="mt-8 space-x-4 flex">
                <button 
                    onClick={() => router.push('/')}
                    className="px-6 py-2 bg-gradient-to-r from-[#4a2b6b] to-[#2b1645] text-[#e0c7ff] rounded-lg text-xl font-medium transition-all hover:shadow-[0_0_15px_rgba(224,199,255,0.3)] hover:scale-105 flex items-center gap-2"
                >
                    <Home size={24} />
                </button>
                <button 
                    onClick={handleDownload}
                    className="px-6 py-2 bg-gradient-to-r from-red-700 to-red-900 text-[#e0c7ff] rounded-lg text-xl font-medium transition-all hover:shadow-[0_0_15px_rgba(224,199,255,0.3)] hover:scale-105 flex items-center gap-2"
                >
                    <Download size={24} />
                </button>
            </div>
        </div>
    );
}