export type StoryContent =
    | { type: 'text'; text: string }
    | { type: 'image'; src: string; alt: string };

export const theoryStories: StoryContent[] = [
    { type: 'text', text: 'Теория — слайд 1: краткое пояснение' },
    { type: 'text', text: 'Теория — слайд 2: ещё инфа' },
    {
        type: 'image',
        src: 'https://i.pinimg.com/originals/13/ff/a2/13ffa2e7ebec978a4b95abfa4822be79.jpg',
        alt: 'Пример изображения',
    },
];