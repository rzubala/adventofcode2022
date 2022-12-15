import { FileReader } from "../common";

class Point {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

class Beacon extends Point {}

class Sensor extends Point {}

const dist = (p1: Point, p2: Point): number => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)

class Solve15 extends FileReader {
  sensorBeacon: Map<Sensor, Beacon> = new Map()
  sensorDist: Map<Sensor, number> = new Map()
  minX: number = Number.MAX_SAFE_INTEGER
  maxX: number = Number.MIN_SAFE_INTEGER

  constructor() {
    super();
    this.readData("src/15/test.data")
      .then((data) => {
        this.process(data.split("\n"), 10);
      })
      .catch((err) => console.log(err));
  }

  process = (data: string[], y: number) => {
    // Sensor at x=2, y=18: closest beacon is at x=-2, y=15
    data.forEach(row => {
      const data = row.split(': closest beacon is at x=')
      const sensorData = data[0].slice(12).split(', y=')
      const beaconData = data[1].split(', y=')
      const sensor: Point = new Sensor(+sensorData[0], +sensorData[1]) 
      const beacon: Point = new Beacon(+beaconData[0], +beaconData[1]) 
      console.log(sensor, beacon)
      this.sensorBeacon.set(sensor, beacon)
      this.sensorDist.set(sensor, dist(sensor, beacon))
    })
  };
}

new Solve15();