import { MemoryCard } from "./types";

function shuffleDeck(array: any[]) {
  const copy = [...array];
  for (let i = copy.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function arrayToDeck(array: any[]) {
  const objectList = [];
  for (let i = 0; i < array.length; i++) {
    objectList.push({ value: array[i], id: `${array[i]}-${i}` });
  }
  return objectList;
}

function mapIds(cardsArray: MemoryCard[]) {
  const idsArray = cardsArray.map((card) => card.id);
  return idsArray;
}

export { shuffleDeck, arrayToDeck, mapIds };
