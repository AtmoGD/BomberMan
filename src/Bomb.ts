///<reference path="Main.ts"/>
namespace BomberMan {
  export class Bomb extends ƒAid.NodeSprite {
    private lifetime: number = 2;
    private level: number;

    constructor (_level: number) {
      super("Bomb");
      this.level = _level;
    }
  }
}