import { hasDuplicates } from "../utils";
import { FileReader } from "../common";

class Solve06 extends FileReader {
  constructor() {
    super();
    this.readData("src/06/input.data")
      .then((data) => {
        this.process(data.split("\n"), 4);
        this.process(data.split("\n"), 14);
      })
      .catch((err) => console.log(err));
  }

  process = (data: string[], size: number) => {
    const history = new Array<number>(size)
    let iter = 0;
    let cnt = 0
    for (const letter of data[0].split('')) {      
      const letterCode = letter.charCodeAt(0)      
      history[iter] = letterCode
      iter++
      iter = iter % size
      cnt++
      if (cnt > size && !hasDuplicates(history)) {
        break;
      }
    }
    console.log(cnt)
  };
}

new Solve06();