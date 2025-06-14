import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 16,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

export const generateParagraphs = (count: number): string[] => {
  return Array.from({ length: count }, () => lorem.generateParagraphs(1));
};

export const generateParagraph = (): string => {
  return lorem.generateParagraphs(1);
};
