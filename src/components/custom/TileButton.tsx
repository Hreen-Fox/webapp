import type { ReactNode } from 'react';
import { useState, useEffect, useRef } from 'react';

interface TileButtonProps {
  title: string; // название плитки
  slides?: ReactNode[]; // слайды для показа в плитке
  description?: string; // дополнительный текст под названием
  intervalMs?: number;  // интервал смены слайдов в миллисекундах
  onClick: () => void; // обработчик клика
  bgIcon?: ReactNode; // иконка фона плитки
}

type Direction = "left" | "right" | null;

export default function TileButton({
  title,
  slides,
  description,
  intervalMs = 4000,
  onClick,
  bgIcon,
}: TileButtonProps) {

  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<Direction>(null);
  const slidesCount = slides?.length ?? 0;
  const timer = useRef<NodeJS.Timeout | null>(null);

  // Автоматическая смена слайдов
  useEffect(() => {
    if (slidesCount > 1) {
      timer.current = setInterval(() => {
        triggerSlide("right");
      }, intervalMs);
      return () => timer.current && clearInterval(timer.current);
    }
  }, [slidesCount, intervalMs, index]);

  // Свайп (touch) обработка
  const touchStartX = useRef<number | null>(null);
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || slidesCount < 2) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      triggerSlide(dx > 0 ? "left" : "right");
    }
    touchStartX.current = null;
  }

  function triggerSlide(dir: Direction) {
    if (animating || !slides || slides.length < 2) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setIndex(i =>
        dir === "right"
          ? (i + 1) % slidesCount
          : (i - 1 + slidesCount) % slidesCount
      );
      setAnimating(false);
      setDirection(null);
    }, 300); // Длительность анимации (ms)
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative overflow-hidden flex flex-col aspect-square items-center p-4 
      bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-colors 
        duration-200"
      aria-label={title}

      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}

    >
      {bgIcon && (
        <span className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
          {bgIcon}
        </span>
      )}
      <h3 className="text-white text-sm font-medium text-center">{title}</h3>


      <div className="flex-1 flex items-center justify-center w-full z-10 relative overflow-hidden">
        {slides && slides.length > 0 ? (
          <>
            {/* Текущий слайд */}
            <div
              className={`absolute inset-0 transition-transform duration-300
                ${animating && direction === "right" ? "-translate-x-full" : ""}
                ${animating && direction === "left" ? "translate-x-full" : ""}
                ${!animating ? "translate-x-0" : ""} z-10`}
              style={{ pointerEvents: animating ? "none" : "auto" }}
            >
              <div className="w-full h-full flex items-center justify-center">
                {slides[index]}
              </div>
            </div>
            {/* Следующий слайд */}
            {animating && (
              <div
                className={`
                  absolute inset-0 transition-transform duration-300
                  ${direction === "right" ? "-translate-x-full" : ""}
                  ${direction === "left" ? "translate-x-full" : ""}
                  z-20
                `}
              >
                {slides[
                  direction === "right"
                    ? (index + 1) % slidesCount
                    : (index - 1 + slidesCount) % slidesCount
                ]}
              </div>
            )}
          </>
        ) : (
          description && (
            <p className="text-gray-400 text-xl font-extrabold text-center mt-1">{description}</p>
          )
        )}
      </div>


      {/* Индикаторы слайдов */}
      {slidesCount > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-gray-400 opacity-50"}`}
            />
          ))}
        </div>
      )}
    </button>
  );
}