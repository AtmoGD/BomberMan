namespace BomberMan {
  export class MapGenerator {

    public static generateRandomMap(_size?: number, _mode?: number): Map {
      if (!_size)
        _size = Math.floor((Math.random() * 5) + 5);

      let mode: number = _mode;
      if (!mode)
        mode = Math.floor(Math.random() * 3);

      switch (mode) {
        case 0:
          return new Map(this.randomGrid(_size));
        case 1:
          return new Map(this.randomCross(_size));
        default:
          return new Map(this.standardMap(_size));
      }
    }
    private static standardMap(_size: number): number[][] {
      let _data: number[][] = [];
      for (let i: number = 0; i < _size; i++)
        _data[i] = [];


      for (let y: number = 0; y < _size; y++) {
        for (let x: number = 0; x < _size; x++) {
          if (x == 0 || y == 0 || x == _size - 1 || y == _size - 1) {
            _data[y][x] = 1;
          }
          else {
            if (x % 2 == 0 && y % 2 == 0) {
              _data[y][x] = 1;
            } else {
              _data[y][x] = 0;
            }
          }
        }
      }
      _data = MapGenerator.addBoxes(_data, _size);
      return _data;
    }

    private static addBoxes(_data: number[][], _count: number): number[][] {
      let x: number = Math.floor(Math.random() * _data[0].length);
      let y: number = Math.floor(Math.random() * _data.length);

      if (_data[y][x] == 0) {
        _data[y][x] = 2;
        _count--;
      }

      if (_count <= 0)
        return _data;
      else
        return MapGenerator.addBoxes(_data, _count);
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
            if (x % rndSize == 0 || y % rndSize == 0) {
              _data[y][x] = 2;
            } else {
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