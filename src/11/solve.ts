import { FileReader } from "../common";

type operation = (param: number) => number
const add = (param1: number): operation => (param2: number) => param1 + param2
const multiply = (param1: number): operation => (param2: number) => param1 * param2
const square = (): operation => (param: number) => param * param
const nop = (): operation => (param: number) => param
const getOperation = (data: string[]): operation => {
  const param = parseInt(data[1], 10)
  switch (data[0]) {
    case '*':
      return Number.isNaN(param) ? square() : multiply(param)
    case '+':
      return add(param)
    default:
      throw 'Something went wrong'
  }
}

class Monkey {
  id: number
  private _items: number[] = [];
  //private _newItems: number[] = [];
  private _op: operation = nop();
  private _test: number = 1;
  private _tM: number = -1;
  private _fM: number = -1;
  private _cnt: number = 0;

  addNewItemToMonkey = (id: number, value: number, monkeys: Monkey[]) => monkeys.find(m => m.id === id)?.items.push(value)

  process(monkeys: Monkey[]) {
    this.items.forEach(item => {
      let newItem = Math.floor(this.op(item) / 3)
      let nextId = this.fM
      if (newItem % this.test === 0) {
        nextId = this.tM
      }
      this.cnt += 1
      this.addNewItemToMonkey(nextId, newItem, monkeys)
    })
    this.items = []
  }

  constructor(id: number) {
    this.id = id
  }
  public get items(): number[] {
    return this._items;
  }
  public set items(value: number[]) {
    this._items = value;
  }

  public get op(): operation {
    return this._op;
  }
  public set op(value: operation) {
    this._op = value;
  }
  public get test(): number {
    return this._test;
  }
  public set test(value: number) {
    this._test = value;
  }
  public get tM(): number {
    return this._tM;
  }
  public set tM(value: number) {
    this._tM = value;
  }
  public get fM(): number {
    return this._fM;
  }
  public set fM(value: number) {
    this._fM = value;
  }
  public get cnt(): number {
    return this._cnt;
  }
  public set cnt(value: number) {
    this._cnt = value;
  }
}

class Solve11 extends FileReader {
  constructor() {
    super();
    this.readData("src/11/input.data")
      .then((data) => {
        this.process(data.split("\n"));
      })
      .catch((err) => console.log(err));
  }

  process = (data: string[]) => {
    const monkeys: Monkey[] = []
    let monkey: Monkey | undefined = undefined

    data.forEach(row => {
      if (row.includes('Monkey ')) {
        const id = parseInt(row.split(' ')[1].split(':')[0], 10)
        monkey = new Monkey(id)
        monkeys.push(monkey)
      } else if (row.includes('Starting items')) {
        const items = row.split(': ')[1].split(', ').map(e => +e)
        monkey!.items = items
      } else if (row.includes('Operation')) {
        const ops = row.split('= old ')[1].split(' ')
        monkey!.op = getOperation(ops)
      } else if (row.includes('Test')) {
        const test = parseInt(row.split('Test: divisible by ')[1], 10)
        monkey!.test = test
      } else if (row.includes('If true')) {
        const trueMonkey = parseInt(row.split('If true: throw to monkey ')[1], 10)
        monkey!.tM = trueMonkey
      } else if (row.includes('If false')) {
        const falseMonkey = parseInt(row.split('If false: throw to monkey ')[1], 10)
        monkey!.fM = falseMonkey
      }
    })

    let cnt = 20
    for (let i=0;i<cnt;i++) {
      monkeys.forEach(monkey => {
        monkey.process(monkeys)
      })
    }

    const max: number[] = new Array<number>(2).fill(0)
    monkeys.forEach(monkey => {
      for (let m in max) {
        if (monkey.cnt > max[m]) {
          max[m] = monkey.cnt
          break;
        }
      }
      max.sort((a, b) => a - b)
    })
    console.log(max.reduce((acc, cur) => {
      acc = acc * cur;
      return acc
    }, 1))

  };
}

new Solve11();