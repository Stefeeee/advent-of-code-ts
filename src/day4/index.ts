import { Day } from "../day";

class Day4 extends Day {

    constructor(){
        super(4);
    }

    solveForPartOne(input: string): string {
        const grid = input.split('\n');
        const word = "XMAS";
        const wordLen = word.length;
        let count = 0;
        const rows = grid.length;
        const cols = grid[0].length;


        const checkHorizontalRight = (row: number, col: number) => {
            return col + wordLen <= cols && grid[row].substring(col, col + wordLen) === word;
        };

        const checkHorizontalLeft = (row: number, col: number) => {
            return col - wordLen >= -1 && grid[row].substring(col - wordLen + 1, col + 1).split('').reverse().join('') === word;
        };

        const checkVerticalDown = (row: number, col: number) => {
            return row + wordLen <= rows && grid.slice(row, row + wordLen).map(row => row[col]).join('') === word;
        };

        const checkVerticalUp = (row: number, col: number) => {
            return row - wordLen >= -1 && grid.slice(row - wordLen + 1, row + 1).map(row => row[col]).reverse().join('') === word;
        };

        const checkDiagonalDownRight = (row: number, col: number) => {
            return row + wordLen <= rows && col + wordLen <= cols && Array.from({ length: wordLen }, (_, i) => grid[row + i][col + i]).join('') === word;
        };

        const checkDiagonalDownLeft = (row: number, col: number) => {
            return row + wordLen <= rows && col - wordLen >= -1 && Array.from({ length: wordLen }, (_, i) => grid[row + i][col - i]).join('') === word;
        };

        const checkDiagonalUpRight = (row: number, col: number) => {
            return row - wordLen >= -1 && col + wordLen <= cols && Array.from({ length: wordLen }, (_, i) => grid[row - i][col + i]).join('') === word;
        };

        const checkDiagonalUpLeft = (row: number, col: number) => {
            return row - wordLen >= -1 && col - wordLen >= -1 && Array.from({ length: wordLen }, (_, i) => grid[row - i][col - i]).join('') === word;
        };

        // Check horizontal, vertical, and diagonals
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (checkHorizontalRight(row, col)) count++;
                if (checkHorizontalLeft(row, col)) count++;
                if (checkVerticalDown(row, col)) count++;
                if (checkVerticalUp(row, col)) count++;
                if (checkDiagonalDownRight(row, col)) count++;
                if (checkDiagonalDownLeft(row, col)) count++;
                if (checkDiagonalUpRight(row, col)) count++;
                if (checkDiagonalUpLeft(row, col)) count++;
            }
        }

        return count.toString();
    }

    solveForPartTwo(input: string): string {
        const grid = input.split('\n');
        const word = "MAS";
        const wordLen = word.length;
        let count = 0;
        const rows = grid.length;
        const cols = grid[0].length;



        const checkDiagonalDownRight2 = (row: number, col: number) => {
            return row + wordLen <= rows && col + wordLen <= cols && Array.from({ length: wordLen }, (_, i) => grid[row + i][col + i]).join('');
        };

        const checkDiagonalDownLeft2 = (row: number, col: number) => {
            return row + wordLen <= rows && col - wordLen >= -1 && Array.from({ length: wordLen }, (_, i) => grid[row + i][col - i]).join('');
        };

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if(checkDiagonalDownRight2(row, col) === word || checkDiagonalDownRight2(row, col) === word.split("").reverse().join("")){
                    if(checkDiagonalDownLeft2(row, col+2) === word || checkDiagonalDownLeft2(row, col+2) === word.split("").reverse().join("")){
                        count++
                    }
                }
            }
        }
        return count.toString();
    }
        
}

export default new Day4;