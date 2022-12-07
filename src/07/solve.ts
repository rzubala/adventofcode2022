import { FileReader } from "../common";

class File {
    name: string
    size: number
    constructor(name: string, size: number) {
        this.name = name
        this.size = size
    }
}

class Dir {
    name: string
    parent: Dir | undefined
    childrenDir: Dir[] = []
    files: File[] = []
    totalSize = 0
    constructor(name: string, parent: Dir | undefined) {
        this.name = name
        this.parent = parent
    }
    getOrCreateChildDir = (name: string) => {
        let child = this.childrenDir.find(d => d.name === name)
        if (!child) {
            child = new Dir(name, this)
            this.childrenDir.push(child)
        }
        return child
    }
    addFile = (name: string, size: number) => {
        let file = this.files.find(f => f.name === name)
        if (!file) {
            file = new File(name, size)
            this.files.push(file)
            this.totalSize += size
        }
    }
    updateTotalSize = (subDir: Dir) => {
        //console.log('update', this.name, '<-', subDir.name, subDir.totalSize)
        this.totalSize += subDir.totalSize
    }
    print = (prefix: string = "") => {
        console.log(prefix, "Dir:", this.name, this.totalSize, "p:", this.parent?.name, "sub:", this.childrenDir.map(c => c.name).join(", "), "files:", this.files.map(f => f.name).join(", "))
    }
}

class Solve07 extends FileReader {
  constructor() {
    super();
    this.readData("src/07/input.data")
      .then((data) => {
        this.process(data.split("\n"));
      })
      .catch((err) => console.log(err));
  }

  printTree = (dir: Dir, level: number) => {
    const prefix = Array(level).join(" ")
    dir.print(prefix)
    dir.childrenDir.forEach(d => this.printTree(d, level * 2))    
  }

  sizeLimit1 = 100000
  totalSum1 = 0
  totalSumCalc = (dir: Dir): void => {
    if (dir.totalSize <= this.sizeLimit1) {
        console.log('sum', dir.name, dir.totalSize)
        this.totalSum1 += dir.totalSize
    }
    dir.childrenDir.forEach(d => this.totalSumCalc(d))   
  }

  sumFiles = (dir: Dir): void => {
    dir.childrenDir.forEach(d => {
        this.sumFiles(d)
    })
    dir.parent?.updateTotalSize(dir)
  }

  process = (data: string[]) => {
    let root: Dir = new Dir("/", undefined)
    let parent: Dir | undefined = undefined
    let list: boolean = false

    for (const row of data) {
        // console.log(row)
        if (list) {
            const data = row.split(' ')
            const size = parseInt(data[0], 10)
            if (parent === undefined) {
                throw "Something went wrong"
            }
            if ("dir" === data[0]) {
                parent.getOrCreateChildDir(data[1])
                continue
            } else if (Number.isInteger(size)) {
                parent.addFile(data[1], size)
                continue
            }
            list = false
        }

        if (row.startsWith("$ cd ")) {
            const dirName = row.substring(5).trim();
            if ("/" === dirName) {
                parent = root
            } else if (".." === dirName) {
                if (parent === undefined) {
                    throw "Something went wrong"
                }
                parent = parent.parent
            } else {
                if (parent === undefined) {
                    throw "Something went wrong"
                }
                const newDir: Dir = parent.getOrCreateChildDir(dirName)                
                parent = newDir
            }
        } else if (row.startsWith("$ ls")) {
            list = true
        }
    }
    this.sumFiles(root)
    //this.printTree(root, 2)
    this.totalSumCalc(root)
    console.log(this.totalSum1)
  };
}

new Solve07();