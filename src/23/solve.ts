import { FileReader } from "../common";

class Solve23 extends FileReader {
  constructor() {
    super();
    this.readData("src/23/input.data")
      .then((data) => {
        this.process(data.split("\n"));
      })
      .catch((err) => console.log(err));
  }

  process = (data: string[]) => {
  };
}

new Solve23();