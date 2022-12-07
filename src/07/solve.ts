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
        }
    }
    print = (prefix: string = "") => {
        console.log(prefix, "Dir:", this.name, "parent:", this.parent?.name, "children:", this.childrenDir.map(c => c.name).join(", "), "files:", this.files.map(f => f.name).join(", "))
    }
}

class Solve07 extends FileReader {
  constructor() {
    super();
    this.readData("src/07/test.data")
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
    this.printTree(root, 2)
  };
}

new Solve07();