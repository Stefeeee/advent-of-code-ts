import { Day } from "../day";

class Day1 extends Day {
    constructor(){
        super(1);
    }
    

    solveForPartTwo(input: string): string {
        const createOutput = this.createLists(input);
        let list1: number[] = createOutput[0];
        let list2: number[] = createOutput[1];        
        
        return this.calculateSimilarity(list1, list2).toString();
    }
    

    solveForPartOne(input: string): string {
        const createOutput = this.createLists(input);
        let list1: number[] = createOutput[0];
        let list2: number[] = createOutput[1];
        let differencesList: number[] = [];
        
        list1 = this.sortList(list1);
        list2 = this.sortList(list2);
        differencesList = this.compareLists(list1, list2);

        return this.addListNumbers(differencesList).toString();
    }
    
    calculateSimilarity(list1: number[], list2: number[]) {
        let similarityScore = 0;
        for(let i = 0; i < list1.length; i++) {
            let count = 0
            for(let j = 0; j < list2.length; j++) {
                if(list1[i] === list2[j]) {
                    count++;
                }
                
            }
            // console.log(list1[i] ,count);
            similarityScore += (list1[i] * count);
        }
        return similarityScore;
    }
    addListNumbers(list: number[]) {
        let sum = 0;
        list.forEach((num) => {
            sum += num;
        });
        return sum
    }
    compareLists(list1: number[], list2: number[]) {
        let differencesList: number[] = [];
        for(let i = 0; i < list1.length; i++) {
            if(list1[i] > list2[i]) {
                differencesList.push(list1[i] - list2[i]);
            }else{
                differencesList.push(list2[i] - list1[i]);
            }
        }
        return differencesList;

    }

    sortList(list1: number[]) {
        return list1.sort((a, b) => a - b);
    }

    

    public createLists(input: string) {
        let list1: number[] = [];
        let list2: number[] = [];
        const lines = input.split(/\s+/);
        for (let i = 0; i < lines.length; i++) {
            const num = parseInt(lines[i], 10);
            if (!isNaN(num)) {
                if (i % 2 === 0) {
                    list1.push(num);
                } else {
                    list2.push(num);
                }
            }
        }
        return [list1, list2];
    }
}

export default new Day1;


