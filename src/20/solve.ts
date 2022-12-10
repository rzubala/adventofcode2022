import { FileReader } from "../common";

class Solve20 extends FileReader {
  constructor() {
    super();
    this.readData("src/20/input.data")
      .then((data) => {
        this.process(data.split("\n"));
      })
      .catch((err) => console.log(err));
  }

  process = (data: string[]) => {
  };
}

new Solve20();