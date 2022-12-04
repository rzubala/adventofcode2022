import { FileReader } from "../common";

class Solve03 extends FileReader {
    constructor() {
      super();
      this.readData("src/03/input.data")
        .then((data) => {
          this.process(data.split("\n"));
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

    process = (data: string[]) => {
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
}
    
new Solve03();
    