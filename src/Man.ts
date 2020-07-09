///<reference path="Destroyable.ts"/>
namespace BomberMan {
  export class Man extends Destroyable {
    private bombLevel: number = 1;
    private bombSpeed: number = 1;
    private canBomb: boolean = true;

    constructor(_name?: string) {
      super(_name ? _name : "Man");
    }
  }
}