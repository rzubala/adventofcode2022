import { isLetter } from "../utils";
import { FileReader } from "../common";

class Solve05 extends FileReader {  
    constructor() {
      super();
      this.readData("src/05/input.data")
        .then((data) => {
          this.process1(data.split("\n"));
        })
        .catch((err) => console.log(err));
    }

    addToStack = (stacks: Map<number, string[]>, index: number, value: string) => {
      if (!isLetter(value)) {
        return
      }
      let stack = stacks.get(index)
      if (stack === undefined) {
        stack = []
      }
      stack.unshift(value)
      stacks.set(index, stack);
    }

    move = (stacks: Map<number, string[]>, move: number, from: number, to: number) => {
      const stackFrom = stacks.get(from)
      if (stackFrom === undefined) {
        return
      }
      const stackTo = stacks.get(to)
      if (stackTo === undefined) {
        return
      }
      const tmp = stackFrom?.splice(stackFrom.length - move, move)
      if (tmp === undefined) {
        return
      }
      tmp.reverse()
      stackTo.push(...tmp)
      stacks.set(from, stackFrom)
      stacks.set(to,  stackTo)
    }

    getValue = (m: RegExpExecArray | null, index: number): number | undefined => {
      if (m === null) {
        return undefined
      }
      const valueStr = m.at(index)
      if (valueStr === undefined) {
        return undefined
      }
      return parseInt(valueStr, 10)
    }

    process1 = (data: string[]) => {
      let stacksFinished = false
      const stacks = new Map<number, string[]>()

      for (const row of data) {        
        const data = row.split('')
        if(data.length === 0) {
          continue
        }
        if (Number.isInteger(parseInt(data[1], 10))) {
          stacksFinished = true
          continue;
        }
        if (!stacksFinished) {
          let it = 1;
          let stack = 1;
          while (it < data.length) {
            this.addToStack(stacks, stack++, data[it])
            it += 4
          }
          continue;
        }


        const regex = new RegExp('move (\\d+) from (\\d+) to (\\d+)', 'gm')
        const m = regex.exec(row)
        const move = this.getValue(m, 1)
        const from = this.getValue(m, 2)
        const to = this.getValue(m, 3)
        if (move === undefined || from === undefined || to === undefined) {
          continue;
        }
        this.move(stacks, move, from, to)
      }
     
      let result = ""
      for (let s=1;s<=stacks.size;s++) {
        result += stacks.get(s)?.pop()
      }
      console.log(result)
    };    
}
    
new Solve05();
    