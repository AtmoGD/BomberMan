namespace BomberMan {
  export class Map extends ƒAid.Node {
    public static grasImg: HTMLImageElement;
    public static boxImg: HTMLImageElement;
    public static wallsImg: HTMLImageElement;
    public static walltImg: HTMLImageElement;

    public data: number[][];
    public mapElements: ƒAid.Node[][] = [];

    constructor(_data: number[][]) {
      super("Map");

      this.data = _data;

      for (let i: number = 0; i < this.data[0].length; i++)
        this.mapElements[i] = [];

      this.generateMap();
    }

    private generateMap(): void {
      for (let y: number = 0; y < this.data.length; y++) {
        for (let x: number = 0; x < this.data[y].length; x++) {
          let pos: ƒ.Vector3 = new ƒ.Vector3(x - Math.floor((this.data[0].length / 2)), -Math.floor((y - (this.data.length / 2))), 0);
          this.createTile(y, x, pos);
        }
      }
    }

    public static loadImages(): void {
      Map.grasImg = document.querySelector("#gras");
      Map.boxImg = document.querySelector("#box");
      Map.wallsImg = document.querySelector("#walls");
      Map.walltImg = document.querySelector("#wallt");
    }

    private createTile(_y: number, _x: number, _pos: ƒ.Vector3) {
      let tile: ƒAid.Node = null;
      switch (this.data[_y][_x]) {
        case 0:
          tile = this.createGras(_pos);
          break;
        case 1:
          tile = this.createWallTop(_pos);
          break;
        case 2:
          tile = this.createBox(_pos);
          break;
        default:
          tile = this.createGras(_pos);
          break;
      }

      if (tile) {
        this.appendChild(tile);
        this.mapElements[_y][_x] = tile;
      }
    }

    public getRandomSpawnPoint(_type: number): ƒ.Vector2 {
      let x: number = Math.floor(Math.random() * this.data[0].length);
      let y: number = Math.floor(Math.random() * this.data.length);

      if (this.data[y][x] == 0)
        return new ƒ.Vector2(x, y);
      else
        return this.getRandomSpawnPoint(_type);
    }

    public createSpawnPoint(_type: number): ƒ.Vector2 {
      for (let y: number = 0; y < this.data.length; y++) {
        for (let x: number = 0; x < this.data[y].length; x++) {
          if (this.data[y][x] == 0 && this.data[y][x + 1] == 0 && this.data[y + 1][x] == 0) {
            this.data[y][x] = _type;
            return new ƒ.Vector2(x, y);
          }
        }
      }
      return null;
    }

    public createGras(_pos: ƒ.Vector3): ƒAid.Node {
      let mesh: ƒ.MeshSprite = new ƒ.MeshSprite();
      let mtr: ƒ.Material = getTextureMaterial("Gras", Map.grasImg);

      let gras: ƒAid.Node = new ƒAid.Node("gras", ƒ.Matrix4x4.IDENTITY(), mtr, mesh);

      let cmpTransform: ƒ.ComponentTransform = gras.getComponent(ƒ.ComponentTransform);
      cmpTransform.local.translate(_pos);

      return gras;
    }

    public createWallTop(_pos: ƒ.Vector3): ƒAid.Node {
      let mesh: ƒ.MeshSprite = new ƒ.MeshSprite();
      let mtr: ƒ.Material = getTextureMaterial("WallTop", Map.walltImg);

      let wallt: ƒAid.Node = new ƒAid.Node("walltop", ƒ.Matrix4x4.IDENTITY(), mtr, mesh);

      let cmpTransform: ƒ.ComponentTransform = wallt.getComponent(ƒ.ComponentTransform);
      cmpTransform.local.translate(_pos);

      return wallt;
    }

    public createBox(_pos: ƒ.Vector3): ƒAid.Node {
      let mesh: ƒ.MeshSprite = new ƒ.MeshSprite();
      let mtr: ƒ.Material = getTextureMaterial("Box", Map.boxImg);

      let box: ƒAid.Node = new ƒAid.Node("box", ƒ.Matrix4x4.IDENTITY(), mtr, mesh);

      let cmpTransform: ƒ.ComponentTransform = box.getComponent(ƒ.ComponentTransform);
      cmpTransform.local.translate(_pos);

      return box;
    }

    private createWallSide(): ƒ.Node {
      let floor: ƒ.Node = new ƒ.Node("Floor");
      return floor;
    }
  }
}