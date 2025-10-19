import { useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";

interface StoriesModalProps {
  items: ReactNode[];
  durationMs?: number;
  onClose: () => void;
}

export default function StoriesModal({ items, durationMs = 4000, onClose }: StoriesModalProps) {
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const manualAdvanceRef = useRef(false); // <- флаг ручного переключения

  useEffect(() => {
    // start progress animation
    setRunning(false);
    const t = window.setTimeout(() => setRunning(true), 20);

    // сброс флага ручного переключения через небольшой тик,
    // чтобы в следующем рендере вернуть нормальные переходы
    const clearManual = window.setTimeout(() => {
      manualAdvanceRef.current = false;
    }, 50);

    // start auto-advance
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    timerRef.current = window.setTimeout(() => {
      handleNext(false);
    }, durationMs);

    return () => {
      window.clearTimeout(t);
      window.clearTimeout(clearManual);
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, durationMs]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext(true);
      if (e.key === "ArrowLeft") handlePrev(true);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function handleNext(manual = false) {
    if (manual) manualAdvanceRef.current = true;
    if (index + 1 < items.length) {
      setIndex(i => i + 1);
    } else {
      onClose();
    }
  }
  function handlePrev(manual = false) {
    if (manual) manualAdvanceRef.current = true;
    if (index > 0) setIndex(i => i - 1);
    else {
      setIndex(0);
    }
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      // помечаем как ручное переключение
      if (dx > 0) handlePrev(true);
      else handleNext(true);
    }
    touchStartX.current = null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
    >
      {/* top progress bars */}
      <div className="absolute z-40 top-4 left-4 right-4 flex gap-2">
        {items.map((_, i) => {
          const isDone = i < index;
          const isActive = i === index;
          // если было ручное переключение — у уже выполненных индикаторов не должно быть transition
          const instant = isDone && manualAdvanceRef.current;
          return (
            <div key={i} className="flex-1 h-1 bg-white/25 rounded overflow-hidden">
              <div
                style={{
                  width: isDone ? "100%" : isActive ? (running ? "100%" : "0%") : "0%",
                  transition: instant
                    ? "none"
                    : isActive
                    ? `width ${durationMs}ms linear`
                    : "width 150ms linear",
                }}
                className="h-full bg-white"
              />
            </div>
          );
        })}
      </div>

      {/* close */}
      <button
        onClick={onClose}
        className="absolute z-30 top-7 right-1.5 text-white p-2 rounded focus:outline-none"
        aria-label="Close stories"
      >
        <X className="w-6 h-6" strokeWidth={3} />
      </button>

      {/* content area */}
      <div className="absolute z-0 inset-0 w-full h-full bg-transparent flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* render current item centered */}
          <div className="w-full h-full flex items-center justify-center select-none">
            <div className="max-w-full max-h-full flex items-center justify-center">
              {items[index]}
            </div>
          </div>
        </div>
      </div>

      {/* small controls (optional) */}
      <div className="absolute left-4 inset-y-0 flex items-center pointer-events-none">
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(true); }}
          className="pointer-events-auto text-white/80 p-4 rounded-full focus:outline-none"
          aria-label="Previous"
        >
          ‹
        </button>
      </div>
      <div className="absolute right-4 inset-y-0 flex items-center pointer-events-none">
        <button
          onClick={(e) => { e.stopPropagation(); handleNext(true); }}
          className="pointer-events-auto text-white/80 p-4 rounded-full focus:outline-none"
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  );
}