///<reference path="Destroyable.ts"/>
namespace BomberMan {
  export class Box extends ƒAid.Node {

    private map: Map;
    private mat: ƒ.ComponentMaterial;
    private trans: ƒ.Vector3;
    public pos: ƒ.Vector2;
    public x: number;
    public y: number;

    constructor(_y: number, _x:number,_map: Map, _trans: ƒ.Vector3, _mesh: ƒ.MeshSprite) {
      super("Box", ƒ.Matrix4x4.IDENTITY(), _map.getBoxMaterial(), _mesh);
      this.map = _map;
      this.trans = _trans;
      this.x = _x;
      this.y = _y;
      this.pos = new ƒ.Vector2(_y, _x);
      this.mat = this.getComponent(ƒ.ComponentMaterial);

      let cmpTransform: ƒ.ComponentTransform = this.getComponent(ƒ.ComponentTransform);
      cmpTransform.local.translate(this.trans);
    }

    public die(): void {
      this.map.data[this.pos.x][this.pos.y] = 0;
      this.mat.material = this.map.getGrasMaterial();
      setTimeout(this.respawn.bind(this), Data.boxRespawnTime);
    }

    private respawn(): void {
      if (this.map.data[this.pos.x][this.pos.y] != 0) {
        setTimeout(this.respawn.bind(this), Data.boxRespawnTime);
        return;
      }
      this.map.data[this.pos.x][this.pos.y] = 2;
      this.mat.material = this.map.getBoxMaterial();
    }
  }
}