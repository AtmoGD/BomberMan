namespace BomberMan {
  export class Map extends ƒAid.Node {
    public static floorImg: HTMLImageElement;

    private data: number[][];

    constructor(_data: number[][]) {
      super("Map");
      Map.loadImages();

      this.data = _data;
      this.generateMap();
    }

    private generateMap(): void {
      for (let x: number = 0; x <= this.data.length; x++) {
        for (let y: number = 0; y < this.data[0].length; y++) {
          let pos: ƒ.Vector3 = new ƒ.Vector3(x, y, 0);
          this.appendChild(this.createTerrainNode(Map.floorImg));
        }
      }

    }

    private createFloor(_position: ƒ.Vector2): ƒ.Node {
      let floor: ƒ.Node = new ƒ.Node("Floor");

      // let groundMesh: ƒ.MeshQuad = new ƒ.MeshQuad();
      // let groundMeshComp: ƒ.ComponentMesh = new ƒ.ComponentMesh(groundMesh);
      // groundMeshComp.pivot.scaleY(30);
      // groundMeshComp.pivot.scaleX(30);
      // let groundIMG: HTMLImageElement = <HTMLImageElement>document.getElementById("ground");
      // let groundTextureIMG: ƒ.TextureImage = new ƒ.TextureImage();
      // groundTextureIMG.image = groundIMG;
      // let groundTextureCoat: ƒ.CoatTextured = new ƒ.CoatTextured();
      // groundTextureCoat.texture = groundTextureIMG;
      // groundTextureCoat.repetition = true;
      // groundTextureCoat.tilingX = 30;
      // groundTextureCoat.tilingY = 30;
      // let groundMaterial: ƒ.Material = new ƒ.Material("ground", ƒ.ShaderTexture, groundTextureCoat);
      // let groundComponentMat: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(groundMaterial);

      // let groundTransformComp: ƒ.ComponentTransform = new ƒ.ComponentTransform(
      //   ƒ.Matrix4x4.TRANSLATION(new ƒ.Vector3(0, 0, -1)))
      // floor.addComponent(groundTransformComp);
      // floor.addComponent(groundMeshComp);
      // floor.addComponent(groundComponentMat);

      // return floor;

      let cmpTransform: ƒ.ComponentTransform = new ƒ.ComponentTransform();
      cmpTransform.local.translate(new ƒ.Vector3(_position.x, _position.y, 0));

      let mesh: ƒ.MeshCube = new ƒ.MeshCube();
      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(mesh);

      let material: ƒ.Material = new ƒ.Material("SolidWhite", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material);

      floor.addComponent(cmpTransform);
      floor.addComponent(cmpMesh);
      floor.addComponent(cmpMaterial);

      console.log("Here")

      return floor;
    }
    public static loadImages(): void {
      Map.floorImg = document.querySelector("#floor");
    }

    public createTerrainNode(_img: HTMLImageElement): ƒAid.Node {
      let txt: ƒ.TextureImage = new ƒ.TextureImage();
      let coat: ƒ.CoatTextured = new ƒ.CoatTextured();
      txt.image = _img;
      coat.texture = txt;

      let mesh: ƒ.MeshSprite = new ƒ.MeshSprite();
      let mtr: ƒ.Material = new ƒ.Material("mtrTerrain", ƒ.ShaderTexture, coat);

      let terrain: ƒAid.Node = new ƒAid.Node("Terrain", ƒ.Matrix4x4.IDENTITY(), mtr, mesh);
      let terrainsCmpMesh: ƒ.ComponentMesh = terrain.getComponent(ƒ.ComponentMesh);
      terrainsCmpMesh.pivot.scale(new ƒ.Vector3(20, 20, 0));

      return terrain;
  }

    private getTextureMaterial(_name: string, _img: HTMLImageElement): ƒ.Material {
      let txt: ƒ.TextureImage = new ƒ.TextureImage();
      let coatTxt: ƒ.CoatTextured = new ƒ.CoatTextured();
      txt.image = _img;
      coatTxt.texture = txt;
      return new ƒ.Material(_name, ƒ.ShaderTexture, coatTxt);
    }

    private createGround(): ƒ.Node {
      let floor: ƒ.Node = new ƒ.Node("Floor");
      return floor;
    }

    private createBox(): ƒ.Node {
      let floor: ƒ.Node = new ƒ.Node("Floor");
      return floor;
    }
  }
}