"use client"
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

interface AudioContextType {
    playBackgroundMusic: () => void;
    stopBackgroundMusic: () => void;
    playEffect: (effectName: string) => void;
    isMusicPlaying: boolean;
    handleUserInteraction: () => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);
    const [effects, setEffects] = useState<Record<string, HTMLAudioElement>>({});
    const [isInitialized, setIsInitialized] = useState(false);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);

    useEffect(() => {
        if (!isInitialized) {
            // Initialize background music only once
            if (!backgroundAudioRef.current) {
                backgroundAudioRef.current = new Audio('/forest-night.mp3');
                backgroundAudioRef.current.loop = true;
                backgroundAudioRef.current.volume = 0.3;
            }

            // Initialize effect sounds
            setEffects({
                'wind': new Audio('/wind-transition.mp3')
            });

            setIsInitialized(true);
        }

        return () => {
            if (backgroundAudioRef.current) {
                backgroundAudioRef.current.pause();
                backgroundAudioRef.current = null;
            }
            Object.values(effects).forEach(effect => {
                effect.pause();
                effect.currentTime = 0;
            });
        };
    }, []);

    const handleUserInteraction = async () => {
        if (!hasUserInteracted && backgroundAudioRef.current) {
            setHasUserInteracted(true);
            try {
                await backgroundAudioRef.current.play();
                setIsMusicPlaying(true);
            } catch (error) {
                console.error('Failed to play background music:', error);
            }
        }
    };

    const playBackgroundMusic = async () => {
        if (backgroundAudioRef.current && !isMusicPlaying && hasUserInteracted) {
            try {
                await backgroundAudioRef.current.play();
                setIsMusicPlaying(true);
            } catch (error) {
                console.error('Failed to play background music:', error);
            }
        }
    };

    const stopBackgroundMusic = () => {
        if (backgroundAudioRef.current) {
            backgroundAudioRef.current.pause();
            backgroundAudioRef.current.currentTime = 0;
            setIsMusicPlaying(false);
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
            playEffect,
            isMusicPlaying,
            handleUserInteraction
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