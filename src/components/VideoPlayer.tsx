'use client';

import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
    videoUrl: string;
    thumbnail: string;
}

declare global {
    interface Window {
        fluidPlayer: any;
    }
}

export default function VideoPlayer({ videoUrl, thumbnail }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerInitialized = useRef(false);

    useEffect(() => {
        // Load Fluid Player script
        if (!document.getElementById('fluid-player-script')) {
            const script = document.createElement('script');
            script.id = 'fluid-player-script';
            script.src = 'https://cdn.fluidplayer.com/v3/current/fluidplayer.min.js';
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                initializePlayer();
            };
        } else if (window.fluidPlayer) {
            initializePlayer();
        }

        // Add fullscreen event listeners for orientation lock
        const video = videoRef.current;
        if (video) {
            const handleFullscreenChange = async () => {
                try {
                    // Check if video is in fullscreen
                    const isFullscreen = document.fullscreenElement === video ||
                        (document as any).webkitFullscreenElement === video ||
                        (document as any).mozFullScreenElement === video ||
                        (document as any).msFullscreenElement === video;

                    if (isFullscreen) {
                        // Lock to landscape when entering fullscreen
                        if (screen.orientation && (screen.orientation as any).lock) {
                            try {
                                await (screen.orientation as any).lock('landscape');
                            } catch (err) {
                                console.log('Orientation lock not supported:', err);
                            }
                        }
                    } else {
                        // Unlock orientation when exiting fullscreen
                        if (screen.orientation && (screen.orientation as any).unlock) {
                            (screen.orientation as any).unlock();
                        }
                    }
                } catch (err) {
                    console.log('Fullscreen orientation error:', err);
                }
            };

            video.addEventListener('fullscreenchange', handleFullscreenChange);
            video.addEventListener('webkitfullscreenchange', handleFullscreenChange);
            video.addEventListener('mozfullscreenchange', handleFullscreenChange);
            video.addEventListener('MSFullscreenChange', handleFullscreenChange);

            return () => {
                playerInitialized.current = false;
                video.removeEventListener('fullscreenchange', handleFullscreenChange);
                video.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
                video.removeEventListener('mozfullscreenchange', handleFullscreenChange);
                video.removeEventListener('MSFullscreenChange', handleFullscreenChange);
            };
        }

        return () => {
            playerInitialized.current = false;
        };
    }, [videoUrl]);

    const initializePlayer = () => {
        if (videoRef.current && window.fluidPlayer && !playerInitialized.current) {
            playerInitialized.current = true;

            window.fluidPlayer(videoRef.current, {
                layoutControls: {
                    fillToContainer: true,
                    primaryColor: '#8b5cf6',
                    posterImage: thumbnail,
                    autoPlay: false,
                    mute: false,
                    allowTheatre: true,
                    playbackRateEnabled: true,
                },
            });
        }
    };

    return (
        <div className="video-player-container">
            <video
                ref={videoRef}
                className="video-player"
                controls
                poster={thumbnail}
                playsInline
            >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
