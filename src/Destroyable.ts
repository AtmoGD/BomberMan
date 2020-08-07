///<reference path="Main.ts"/>
namespace BomberMan {
  export class Destroyable extends ƒ.Node {
    
    constructor(_name?: string) {
      super(_name ? name : "Destroyable");
    }

    protected checkCollision(_position: ƒ.Vector3): boolean {
      return this.mtxLocal.translation.isInsideSphere(_position, 1);
    }

    public die(): void {
      let eventDie: Event = new Event("die");
      this.dispatchEvent(eventDie);
    }
  }
}