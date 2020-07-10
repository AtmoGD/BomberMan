namespace BomberMan {
  export class Map extends ƒAid.Node {
    public static grasImg: HTMLImageElement;
    public static boxImg: HTMLImageElement;
    public static wallsImg: HTMLImageElement;
    public static walltImg: HTMLImageElement;

    private data: number[][];
    private mapElements: ƒAid.Node[][] = [];

    constructor(_data: number[][]) {
      super("Map");

      this.data = _data;

      for (let i: number = 0; i < this.data[0].length; i++)
        this.mapElements[i] = [];
      
      this.generateMap();
    }

    private generateMap(): void {
      // <-------------------------------------------TODO make map appear in middle--------->
      for (let y: number = 0; y < this.data.length; y++) {
        for (let x: number = 0; x < this.data[y].length; x++) {
          let pos: ƒ.Vector3 = new ƒ.Vector3(x - (this.data[0].length / 2) + 0.5, -(y - (this.data.length / 2) + 0.5), 0);
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
          break;
        case 3:
          break;
        default:
          break;
      }

      if (tile) {
        this.appendChild(tile);
        this.mapElements[_y][_x] = tile;
      }
    }
    public createGras(_pos: ƒ.Vector3): ƒAid.Node {
      let mesh: ƒ.MeshSprite = new ƒ.MeshSprite();
      let mtr: ƒ.Material = this.getTextureMaterial("Gras", Map.grasImg);

      let gras: ƒAid.Node = new ƒAid.Node("gras", ƒ.Matrix4x4.IDENTITY(), mtr, mesh);

      let cmpTransform: ƒ.ComponentTransform = gras.getComponent(ƒ.ComponentTransform);
      cmpTransform.local.translate(_pos);

      return gras;
    }

    public createWallTop(_pos: ƒ.Vector3): ƒAid.Node {
      let mesh: ƒ.MeshSprite = new ƒ.MeshSprite();
      let mtr: ƒ.Material = this.getTextureMaterial("WallTop", Map.walltImg);

      let wallt: ƒAid.Node = new ƒAid.Node("gras", ƒ.Matrix4x4.IDENTITY(), mtr, mesh);

      let cmpTransform: ƒ.ComponentTransform = wallt.getComponent(ƒ.ComponentTransform);
      cmpTransform.local.translate(_pos);

      return wallt;
    }


    private createBox(): ƒ.Node {
      let floor: ƒ.Node = new ƒ.Node("Floor");
      return floor;
    }

    private createWallSide(): ƒ.Node {
      let floor: ƒ.Node = new ƒ.Node("Floor");
      return floor;
    }

    private getTextureMaterial(_name: string, _img: HTMLImageElement): ƒ.Material {
      let txt: ƒ.TextureImage = new ƒ.TextureImage();
      let coatTxt: ƒ.CoatTextured = new ƒ.CoatTextured();
      txt.image = _img;
      coatTxt.texture = txt;
      return new ƒ.Material(_name, ƒ.ShaderTexture, coatTxt);
    }
  }
}