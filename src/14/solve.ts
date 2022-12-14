import { FileReader } from "../common";

class Solve14 extends FileReader {
  constructor() {
    super();
    this.readData("src/14/test.data")
      .then((data) => {
        this.process(data.split("\n"));
      })
      .catch((err) => console.log(err));
  }

  process = (data: string[]) => {
  };
}

new Solve14();