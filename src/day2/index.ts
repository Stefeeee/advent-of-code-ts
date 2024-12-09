import { count } from "console";
import { Day } from "../day";

class Day2 extends Day {

    constructor(){
        super(2);
    }

    solveForPartOne(input: string): string {
        const reports = this.createReports(input);
        
        return this.HowManySafe(reports).safe.length.toString()
    }        

    solveForPartTwo(input: string): string {
        const reports = this.createReports(input);
        const safeAndUnsafe = this.HowManySafe(reports)
        let safeReports = safeAndUnsafe.safe
        let unsafeReports = safeAndUnsafe.unsafe
        let safeWithBuffer = this.HowManySafeWithBuffer(unsafeReports).safe

        
        return (safeReports.length + safeWithBuffer.length).toString();
    }

    public HowManySafeWithBuffer(unsaveReports: number[][]): {safe: number[][], unsafe: number[][]} {
        const safe: number[][] = [];
        const stillUnsafe: number[][] = [];
        unsaveReports.forEach((report) => {
            let getsSave = false
            report.forEach((level, index) => {
                let testingReport = report
                if(this.HowManySafe([testingReport.filter((_, a) => a !== index)]).safe.length === 1){
                    getsSave = true;
                }
            })
            if(getsSave){
                safe.push(report)
            }else{
                stillUnsafe.push(report)
            }
        })

        return {safe: safe, unsafe: stillUnsafe}

    }


    public HowManySafe(reports: number[][]): {safe: number[][], unsafe: number[][]} {
        const safe: number[][] = [];
        const unsafe: number[][] = [];
        reports.forEach((report) => {
            let increasing: boolean = true
            let decreasing: boolean = true
            let sizeDifferenceBelow4: boolean = true
            report.forEach((level, index) => {
                
               if(report[index+1]){
                    if(report[index] === report[index + 1]){
                        increasing = false;
                        decreasing = false;
                    }else if(report[index] > report[index + 1]){
                        increasing = false;
                        if(report[index] - report[index + 1] > 3){
                            sizeDifferenceBelow4 = false;
                        }
                    }else if(report[index] < report[index + 1]){
                        decreasing = false;
                        if(report[index + 1] - report[index] > 3){
                            sizeDifferenceBelow4 = false;
                        }
                    }
               }
            })
            if(increasing && sizeDifferenceBelow4 || decreasing && sizeDifferenceBelow4){
                safe.push(report);
    
            }else{
                unsafe.push(report);
            }
        })
        return {safe, unsafe}
    }

    public createReports(input: string) {
        let reports: number[][] = [];
        const lines = input.split("\r\n");
        for (let i = 0; i < lines.length; i++) {
            let stringLine = lines[i].split(" ");
            let levels: number[] = [];
            stringLine.forEach((string) => {
                let num = parseInt(string, 10);
                if (!isNaN(num)) {
                    levels.push(num);
                }
            }),
            reports.push(levels)
        }
        return reports;
    }
}

export default new Day2;
