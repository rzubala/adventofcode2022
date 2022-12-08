import { FileReader } from "../common";

class Solve08 extends FileReader {
  constructor() {
    super();
    this.readData("src/08/input.data")
      .then((data) => {
        this.process(data);
      })
      .catch((err) => console.log(err));
  }

  isTreeVisible = (trees: Array<Array<number>>, x: number, y: number): boolean => {
    const len = trees.length
    if (x === 0 || y === 0 || x === len - 1 || y === len - 1) {
        return true;
    }    
    let error = false
    const val = trees[y][x]
    for (let iy=0;iy<y;iy++) {
        const tmp = trees[iy][x]
        if (tmp >= val) {
            error = true
            break
        }
    }
    if (!error) {
        return true
    }

    error = false
    for (let ix=0;ix<x;ix++) {
        const tmp = trees[y][ix]
        if (tmp >= val) {
            error = true
            break
        }
    }
    if (!error) {
        return true
    }

    error = false
    for (let iy=len-1;iy>y;iy--) {
        const tmp = trees[iy][x]
        if (tmp >= val) {
            error = true
            break
        }
    }
    if (!error) {
        return true
    }

    error = false
    for (let ix=len-1;ix>x;ix--) {
        const tmp = trees[y][ix]
        if (tmp >= val) {
            error = true
            break
        }
    }
    if (!error) {
        return true
    }
    return false;
  }

  scenicScore = (trees: Array<Array<number>>, x: number, y: number): number => {
    const len = trees.length
    if (x === 0 || y === 0 || x === len - 1 || y === len - 1) {
        return 0;
    }    
    const val = trees[y][x]
    let result = 1
    let dist = 0
    for (let iy=y+1;iy<len;iy++) {
        dist++
        const tmp = trees[iy][x]
        if (tmp >= val) {
            break
        }
    }
    result *= dist

    dist = 0
    for (let ix=x-1;ix>=0;ix--) {
        dist++
        const tmp = trees[y][ix]
        if (tmp >= val) {            
            break            
        }
    }
    result *= dist

    dist = 0
    for (let iy=y-1;iy>=0;iy--) {
        dist++
        const tmp = trees[iy][x]
        if (tmp >= val) {
            break
        }
    }
    result *= dist

    dist = 0
    for (let ix=x+1;ix<len;ix++) {
        dist++
        const tmp = trees[y][ix]
        if (tmp >= val) {
            break
        }
    }
    result *= dist

    return result;
  }

  process = (data: string) => {        
    const trees = new Array<Array<number>>()    
    data.split("\n").forEach(row => {
        const treeRow: number[] = []
        trees.push(treeRow)
        row.split('').map(t => +t).forEach(x => treeRow.push(x))
    })
    const len = trees.length
    let cnt = 0
    let max = 0
    for (let x=0;x<len;x++) {
        for (let y=0;y<len;y++) {
            if (this.isTreeVisible(trees, x, y)) {
                cnt++;
            }
            const tmpMax = this.scenicScore(trees, x, y)
            max = tmpMax > max ? tmpMax : max
        }
    }
    console.log(cnt)
    console.log(max)
  };
}

new Solve08();