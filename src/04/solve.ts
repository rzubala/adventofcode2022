import { FileReader } from "../common";

class Solve04 extends FileReader {
    constructor() {
      super();
      this.readData("src/04/input.data")
        .then((data) => {
          this.process1(data.split("\n"));
          this.process2(data.split("\n"));
        })
        .catch((err) => console.log(err));
    }

    process1 = (data: string[]) => {
        let sum = 0
        data.forEach(row => {
            const data = row.split(",")
            const p1 = data[0].split("-").map(x => +x)
            const p2 = data[1].split("-").map(x => +x)
            if (p1[0] <= p2[0] && p1[1] >= p2[1] 
                || p2[0] <= p1[0] && p2[1] >= p1[1]) {
                    sum++
            }
        })
        console.log(sum)
      };

      process2 = (data: string[]) => {
        let sum = 0
        data.forEach(row => {
            const data = row.split(",")
            const p1 = data[0].split("-").map(x => +x)
            const p2 = data[1].split("-").map(x => +x)
            if (p1[1] >= p2[0] && p1[0] <= p2[1]
                || p2[0] <= p1[1] && p2[1] >= p1[0]) {
                sum++
            }
        })
        console.log(sum)
      };      
}
    
new Solve04();
    