import { FileReader } from "../common";

class Solve25 extends FileReader {
  constructor() {
    super();
    this.readData("src/25/input.data")
      .then((data) => {
        this.process(data.split("\n"));
      })
      .catch((err) => console.log(err));
  }

  process = (data: string[]) => {
  };
}

new Solve25();