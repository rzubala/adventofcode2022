import { FileReader } from "../common";

class Solve03 extends FileReader {
    constructor() {
      super();
      this.readData("src/03/input.data")
        .then((data) => {
          this.process1(data.split("\n"));
          this.process2(data.split("\n"));
        })
        .catch((err) => console.log(err));
    }

    aRef = "a".charCodeAt(0)

    Aref = "A".charCodeAt(0)

    score = (char: number) => {
        if (char < this.aRef) {
            return char - this.Aref + 27
        }
        return char - this.aRef + 1
    }

    process1 = (data: string[]) => {
        let sum = 0
        data.forEach(row => {
            const length = row.length
            const part1 = row.slice(0, length/2).split('');
            const part2 = row.slice(length/2)
            for (const c of part1) {
                if (part2.includes(c)) {
                    sum += this.score(c.charCodeAt(0))
                    break;
                }
            }
        })
        console.log(sum)
      };

    process2 = (data: string[]) => {
        let iter = 0
        let sum = 0
        while (iter < data.length) {
            const part1 = data[iter]
            const part2 = data[iter + 1]
            const part3 = data[iter + 2]
            for (const c of part1) {
                if (part2.includes(c) && part3.includes(c)) {
                    sum += this.score(c.charCodeAt(0))
                    break;
                }
            }
            iter += 3
        }
        console.log(sum)
    }
}
    
new Solve03();
    