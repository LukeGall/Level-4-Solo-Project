import { PuzzleBoard } from './puzzle-board';

export class Puzzle {
    title: string;
    description: string;
    difficulty: string;
    puzzleBoard: PuzzleBoard;
    author: string = "default";
}
