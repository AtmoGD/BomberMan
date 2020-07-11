namespace BomberMan {
  export class MapGenerator {

    public static generateRandomMap(_size?: number): Map {
      if (!_size)
        _size = Math.floor((Math.random() * 5) + 5);

      let mode: number = Math.floor(Math.random() * 1);

      switch (mode) {
        default:
          return new Map(this.randomGrid(_size));
      }
    }
    private static randomGrid(_size: number): number[][] {

      let _data: number[][] = [];
      for (let i: number = 0; i < _size; i++)
        _data[i] = [];

      let rndSize: number = Math.floor(Math.random() * 7) + 4;

      for (let y: number = 0; y < _size; y++) {
        for (let x: number = 0; x < _size; x++) {
          if (x == 0 || y == 0 || x == _size - 1 || y == _size - 1) {
            _data[y][x] = 1;
          }
          else {
            if ((x % rndSize == 0) || y % rndSize == 0) {
              _data[y][x] = 2;
            }else {
              _data[y][x] = 0;
            }
          }
        }
      }
      return _data;
    }
    private static randomCross(_size: number): number[][] {

      let _data: number[][] = [];
      for (let i: number = 0; i < _size; i++)
        _data[i] = [];

      let rndSize: number = Math.floor(Math.random() * 5) + 4;

      for (let y: number = 0; y < _size; y++) {
        for (let x: number = 0; x < _size; x++) {

          if (x == 0 || y == 0 || x == _size - 1 || y == _size - 1) {
            _data[y][x] = 1;
          }
          else {
            if (_data[y][x] != undefined)
              continue;
            if (x % rndSize - 1 == 0 && y % rndSize == 0) {
              _data[y + 1][x] = 2;
              _data[y - 1][x] = 2;
              _data[y][x] = 2;
              _data[y][x + 1] = 2;
              _data[y][x - 1] = 2;
            }
            else
              _data[y][x] = 0;
          }
        }
      }
      return _data;
    }
  }

}