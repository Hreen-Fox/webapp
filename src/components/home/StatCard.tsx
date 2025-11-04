import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
// Иконки из Lucide для фона
import { Trophy, BookOpen, Clock8, ClipboardClock } from 'lucide-react'; 

interface StatCardProps {
  title: string;
  value: React.ReactNode;
  subtitle?: string;
  color?: string; // Используется для value, если это string
  icon: React.ReactNode; // Используется для фона
  onClick?: () => void;
  isDisabled?: boolean;
}

/**
 * StatCard - Компонент плитки с фоновой иконкой, адаптированный под дизайн из концепта.
 * Поддерживает простой текст/подзаголовок или сложный контент (ReactNode) в 'value'.
 * Логика прокрутки контента должна быть встроена в ReactNode, переданный в 'value'.
 */
export default function StatCard({ title, value, subtitle, color = 'text-white', icon, onClick, isDisabled }: StatCardProps) {
  const isStringValue = typeof value === 'string';

  return (
    <button 
      onClick={onClick}
      disabled={isDisabled}
      className={`
        bg-zinc-800 rounded-xl p-4 flex flex-col aspect-square relative overflow-hidden text-left w-full h-full 
        transition-colors duration-200 active:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/30 
        disabled:opacity-50 disabled:active:bg-zinc-800
      `}
      aria-label={isStringValue ? `${title}: ${value} ${subtitle || ''}` : title}
    >
      {/* Фоновая иконка, как в концепте */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
        {/* Иконка в центре с большим размером */}
        {React.cloneElement(icon as React.ReactElement, { className: "w-[90%] h-[90%]" })}
      </div>
      
      {isStringValue ? (
        // Рендер для простого текста/подзаголовка
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <p className="text-gray-400 text-sm font-medium">{title}</p>
            <div className="mt-1">
              <span className={`text-2xl font-bold ${color}`}>{value}</span>
            </div>
          </div>
          {subtitle && (
            <p className="text-gray-500 text-xs">{subtitle}</p>
          )}
        </div>
      ) : (
        // Рендер для сложного контента (например, слайдера)
        <div className="relative z-10 flex flex-col h-full">
          <p className="text-gray-400 text-sm font-medium flex-shrink-0">{title}</p>
          <div className="flex-grow flex items-center justify-center text-center w-full">
             {/* Сюда вставляется сложный контент (слайдер) */}
             {value}
          </div>
        </div>
      )}
    </button>
  );
}