"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AudioContextType {
    playBackgroundMusic: () => void;
    stopBackgroundMusic: () => void;
    playEffect: (effectName: string) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [backgroundAudio, setBackgroundAudio] = useState<HTMLAudioElement | null>(null);
    const [effects, setEffects] = useState<Record<string, HTMLAudioElement>>({});

    useEffect(() => {
        // Initialize background music
        const bgAudio = new Audio('/forest-night.mp3');
        bgAudio.loop = true;
        bgAudio.volume = 0.3;
        setBackgroundAudio(bgAudio);

        // Initialize effect sounds
        setEffects({
            'wind': new Audio('/wind-transition.mp3')
        });

        return () => {
            bgAudio.pause();
            bgAudio.currentTime = 0;
            Object.values(effects).forEach(effect => {
                effect.pause();
                effect.currentTime = 0;
            });
        };
    }, []);

    const playBackgroundMusic = () => {
        backgroundAudio?.play().catch(console.error);
    };

    const stopBackgroundMusic = () => {
        if (backgroundAudio) {
            backgroundAudio.pause();
            backgroundAudio.currentTime = 0;
        }
    };

    const playEffect = (effectName: string) => {
        const effect = effects[effectName];
        if (effect) {
            effect.currentTime = 0;
            effect.play().catch(console.error);
        }
    };

    return (
        <AudioContext.Provider value={{
            playBackgroundMusic,
            stopBackgroundMusic,
            playEffect
        }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
} 