import type { ReactNode } from "react";

export function getTheoryStories(): ReactNode[] {
  return [
    <div className="mx-5 text-white text-lg text-center px-6">
      Теория — слайд 1: краткое пояснение
    </div>,
    <div className="mx-5 text-white text-lg text-center px-6">
      Теория — слайд 2: ещё инфа
    </div>,
    <img
      src="https://i.pinimg.com/originals/13/ff/a2/13ffa2e7ebec978a4b95abfa4822be79.jpg"
      alt="example"
      className="object-contain h-full mx-auto"
    />,
  ];
}
