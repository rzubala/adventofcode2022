import { FileReader } from "../common";

class Solve21 extends FileReader {
  constructor() {
    super();
    this.readData("src/21/input.data")
      .then((data) => {
        this.process(data.split("\n"));
      })
      .catch((err) => console.log(err));
  }

  process = (data: string[]) => {
  };
}

new Solve21();