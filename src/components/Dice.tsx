import React from 'react';

interface DiceProps {
    value: number;
    size: number;
    rollingTime?: number;
    isRolling?: boolean;
}

export default function Dice({ value, size, rollingTime = 1000, isRolling = false }: DiceProps) {
    const getDotPositions = (value: number): string[] => {
        switch (value) {
            case 1: return ['center'];
            case 2: return ['top-right', 'bottom-left'];
            case 3: return ['top-right', 'center', 'bottom-left'];
            case 4: return ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
            case 5: return ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'];
            case 6: return ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right'];
            default: return ['center'];
        }
    };

    const getPositionStyle = (position: string) => {
        const gap = size * 0.2; // Gap from edge
        switch (position) {
            case 'top-left': return { top: gap, left: gap };
            case 'top-right': return { top: gap, right: gap };
            case 'middle-left': return { top: '50%', left: gap, transform: 'translateY(-50%)' };
            case 'middle-right': return { top: '50%', right: gap, transform: 'translateY(-50%)' };
            case 'center': return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
            case 'bottom-left': return { bottom: gap, left: gap };
            case 'bottom-right': return { bottom: gap, right: gap };
            default: return {};
        }
    };

    return (
        <div 
            className={`relative bg-white rounded-lg shadow-lg ${isRolling ? 'animate-shake' : ''}`}
            style={{ 
                width: size, 
                height: size,
                animation: isRolling ? `shake 0.5s infinite` : `roll ${rollingTime}ms ease-in-out`,
                border: `${size * 0.08}px solid black`,
            }}
        >
            {getDotPositions(value).map((position, index) => (
                <div
                    key={index}
                    className="absolute bg-black rounded-full"
                    style={{
                        width: size * 0.15,
                        height: size * 0.15,
                        ...getPositionStyle(position)
                    }}
                />
            ))}
        </div>
    );
} 