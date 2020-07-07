namespace BomberMan {
  export abstract class Destroyable extends ƒ.Node {
    
    constructor() {
      super("Destroyable");
    }

    public checkCollision(_position: ƒ.Vector3): boolean {
      return this.mtxLocal.translation.isInsideSphere(_position, 1);
    }

    public abstract die(): void;
  }
}