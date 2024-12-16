import { unchangedTextChangeRange } from "typescript";
import { Day } from "../day";
import { Console } from "console";
import { get } from "http";

class Day5 extends Day {

    constructor(){
        super(5);
    }

    solveForPartOne(input: string): string {
        let rules: number[][] = [];
        input.split('\n').forEach(line => {
            if(line.includes('|')){
                let rule: number[] = [];
                line.split('|').forEach(number => {
                    rule.push(parseInt(number));
                });
                rules.push(rule);
            }
        })
        let updates: number[][] = [];
        input.split('\n').forEach(line => {
            if(!line.includes('|') && line.includes(',')){
                let update: number[] = [];
                line.split(',').forEach(number => {
                    update.push(parseInt(number))
                });
                updates.push(update);
            }
        })

        

        let count = 0;
        updates.forEach(update => {
            if(this.satisfiesRules(rules, update)){
                count += update[Math.round((update.length - 1) / 2)]
            }
        })
        return count.toString()
    }
    satisfiesRules(rules: number[][], update: number[]):boolean{
        if(rules.length === 0){
            return true;
        }else{
            for (let rule of rules) {
                // check if numbers are present in update
                if(update.includes(rule[0]) && update.includes(rule[1])){

                    let firstIndexes: number[] = [];
                    let secondIndexes: number[] = [];
                    // Find all indexes of rule[0] in update
                    update.forEach((num, index) => {
                        if (num === rule[0]) {
                            firstIndexes.push(index);
                        }
                    });
    
                    // Find all indexes of rule[1] in update
                    update.forEach((num, index) => {
                        if (num === rule[1]) {
                            secondIndexes.push(index);
                        }
                    });
    
                    let valid = firstIndexes[0] < secondIndexes[0]                        
    
                    if (!valid) {
                        return false;
                    }
                }
            }
            return true;
        }
    }

    solveForPartTwo(input: string): string {
        let rules: number[][] = [];
        input.split('\n').forEach(line => {
            if(line.includes('|')){
                let rule: number[] = [];
                line.split('|').forEach(number => {
                    rule.push(parseInt(number));
                });
                rules.push(rule);
            }
        })
        let updates: number[][] = [];
        input.split('\n').forEach(line => {
            if(!line.includes('|') && line.includes(',')){
                let update: number[] = [];
                line.split(',').forEach(number => {
                    update.push(parseInt(number))
                });
                updates.push(update);
            }
        })
        
        let count = 0;

        let invalidUpdates: number[][] = [];
        let nowValidUpdates: number[][] = [];
        invalidUpdates = this.getInvalidUpdates(updates, rules).invalid
        while(invalidUpdates.length > 0){
            invalidUpdates.forEach(update => {
                update = this.orderCorrectly(rules, update);
            })
            let validAndInvalid = this.getInvalidUpdates(invalidUpdates, rules)
            invalidUpdates = validAndInvalid.invalid;
            nowValidUpdates.push(...validAndInvalid.valid);
        }

        nowValidUpdates.forEach(update => {
            count += update[Math.round((update.length - 1) / 2)]
        })
        return count.toString()


    }

    getInvalidUpdates(updates: number[][], rules: number[][]): {valid: number[][], invalid: number[][]} {
        let invalidUpdates: number[][] = [];
        let nowValidUpdates: number[][] = [];
        updates.forEach(update => {
            if(!this.satisfiesRules(rules, update)){
                invalidUpdates.push(update);
            }else{
                nowValidUpdates.push(update);
            }
        })
        return {valid: nowValidUpdates, invalid: invalidUpdates};
    }

    orderCorrectly(rules: number[][] ,update: number[]): number[] {
        rules.forEach(rule => {
            let [a, b] = rule;
            let indexA = update.indexOf(a);
            let indexB = update.indexOf(b);
    
            if (indexA !== -1 && indexB !== -1 && indexA > indexB) {
                // Swap positions of a and b
                [update[indexA], update[indexB]] = [update[indexB], update[indexA]];
            }
        });
    
        return update;
    }
}

export default new Day5;