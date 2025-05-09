"use client";

import { RefObject, useEffect, useRef } from "react";

interface AnimationOptions {
  canvas?: HTMLCanvasElement;
  active?: { current: boolean };
  higherContrast?: boolean;
  logo: number[][];
  color?: string;
  colorSecondary?: string;
  renderScale?: number;
  transitionSpeed?: number;
}

interface AnimationHandler {
  start: () => void;
  stop: () => void;
}

function clamp(value: number, min: number, max: number) {
  return value <= min ? min : value >= max ? max : value;
}

const createAnimation = (options: AnimationOptions): AnimationHandler => {
  const {
    color,
    colorSecondary,
    logo,
    canvas,
    active,
    renderScale = 2,
    transitionSpeed = 1,
    higherContrast,
  } = options;

  let animationFrameId: number;
  let maxOpacity = 0;
  let isAnimating = false;

  const randomness: number[][] = [];
  const alphaLevels: number[][] = [];
  const intensities: number[][] = [];

  for (let i = 0; i < logo.length; i++) {
    randomness[i] = [];
    alphaLevels[i] = [];
    intensities[i] = [];

    for (let j = 0; j < logo[i].length; j++) {
      randomness[i][j] = Math.random();
      alphaLevels[i][j] = clamp(Math.random(), 0.1, 0.9);
      intensities[i][j] = 0;
    }
  }

  const updateFrame = () => {
    animationFrameId = requestAnimationFrame(updateFrame);
    if (!canvas || !canvas.getContext) return;

    if (!active?.current && maxOpacity === 0 && isAnimating) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.clientWidth * renderScale;
    const height = canvas.clientHeight * renderScale;

    canvas.width = width;
    canvas.height = height;

    const cellSize = Math.min(width / logo[0].length, height / logo.length);
    ctx.clearRect(0, 0, width, height);

    maxOpacity = 0;

    for (let i = 0; i < logo.length; i++) {
      for (let j = 0; j < logo[i].length; j++) {
        const rand = randomness[i][j];
        const alpha = alphaLevels[i][j];

        const seed = Math.ceil(performance.now() / 100);
        const intensity = clamp(
          0.5 * Math.sin(seed * rand) + (higherContrast ? 0.8 : 1),
          0,
          1
        );

        const currentAlpha = intensities[i][j];

        if (intensities[i][j] > maxOpacity) maxOpacity = intensities[i][j];
        if (logo[i][j] === 0) continue;

        intensities[i][j] = active?.current
          ? Math.min(currentAlpha + 0.1 * transitionSpeed * alpha, 1)
          : Math.max(currentAlpha - 0.1 * transitionSpeed * alpha, 0);

        const colorToUse = logo[i][j] === 1 ? color : colorSecondary;
        const finalOpacity = 1 - currentAlpha * 1 + currentAlpha * intensity;

        ctx.beginPath();
        ctx.arc(
          j * cellSize + cellSize / 2,
          i * cellSize + cellSize / 2,
          cellSize / 2,
          0,
          2 * Math.PI
        );
        ctx.fillStyle = `rgba(${colorToUse}, ${finalOpacity})`;
        ctx.fill();
      }
    }
    isAnimating = true;
  };

  return {
    start: () => requestAnimationFrame(updateFrame),
    stop: () => cancelAnimationFrame(animationFrameId),
  };
};

interface AnimatedPixelIconProps {
  logo: number[][];
  active: RefObject<boolean>;
}

function AnimatedPixelIcon({ logo, active }: AnimatedPixelIconProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const { start, stop } = createAnimation({
      color: "255, 255, 255",
      active,
      higherContrast: true,
      renderScale: 4,
      logo,
      canvas: canvasRef.current,
    });
    start();

    return () => stop();
  }, []);

  return (
    <div className="relative hover:transition-colors w-12 h-12">
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute z-1 transition-opacity"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
    </div>
  );
}

export { AnimatedPixelIcon };
