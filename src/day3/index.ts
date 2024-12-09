import { cp } from "fs";
import { Day } from "../day";
import console from "console";

class Day3 extends Day {

    constructor(){
        super(3);
    }

    solveForPartOne(input: string): string {
        

        return this.solveOne(input).toString()
    }

    solveOne(input: string): number {
        const regex = /mul\((\d+),(\d+)\)/g;
        let match = input.match(regex);
        let numbers: number[][] = [];
        let count = 0;
        match?.forEach((mul, i) => {
            numbers[i] = [];
            mul.match(/\d+/g)?.forEach((num) => {
                numbers[i].push(parseInt(num));
            })
        })
        numbers.forEach((num) => {
            count += num[0] * num[1];
        })

        return count
    }

    solveForPartTwo(input: string): string {
        const regex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
        let match = input.match(regex);
        let calculate = true
        let count = 0;

        match?.forEach((mul, i) => {
            if(mul === "do()"){
                calculate = true;
            } else if(mul === "don't()"){
                calculate = false;
            }
            if(calculate){
               count += this.solveOne(mul)
            }
        })        

        return count.toString()
    }

}

export default new Day3;