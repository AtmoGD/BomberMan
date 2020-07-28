namespace BomberMan {
  export class GameManager {
    private viewport: ƒ.Viewport;
    public graph: ƒ.Node;
    private camera: ƒ.ComponentCamera;

    public map: Map = null;
    public mans: Man[] = [];
    public bomberman: BomberMan = null;
    public enemys: EnemyMan[] = [];

    private gameOver: boolean = false;
    private upgrade: CustomEvent;

    constructor(_viewport: ƒ.Viewport, _graph: ƒ.Node, _camera: ƒ.ComponentCamera) {

      this.viewport = _viewport;
      this.graph = _graph;
      this.camera = _camera;
      this.upgrade = new CustomEvent("upgrade", {bubbles: true});
    }

    public startGame(): void {
      Map.loadImages();
      this.loadSprites();

      this.map = MapGenerator.generateRandomMap(21);

      this.bomberman = new BomberMan(this.map, this, "Bomberman");

      for (let i: number = 0; i < data.enemyCount; i++) {
        this.createEnemy();
      }

      this.graph.appendChild(this.map);
      this.graph.appendChild(this.bomberman);
      
      setInterval(() => {
        this.graph.broadcastEvent(this.upgrade);
      }, data.upgradeSpeed);
    }

    public getMap(): Map {
      return this.map;
    }

    public createEnemy(): void {
      let newEnemy: EnemyMan = new EnemyMan(this.map, this, "EnemyMan");
      this.enemys.push(newEnemy);
      this.graph.appendChild(newEnemy);
    }

    public getEnemy(_position: ƒ.Vector2): EnemyMan | null {
      for (let enemy of this.enemys) {
        let enemyPos: ƒ.Vector2 = enemy.getPosition();
        if (_position.x == enemyPos.x && _position.y == enemyPos.y)
          return enemy;
      }
      return null;
    }

    private loadSprites(): void {
      let img: HTMLImageElement = document.querySelector("#spritesheet");
      let coat: ƒ.CoatTextured = new ƒ.CoatTextured();
      coat.texture = new ƒ.TextureImage();
      coat.texture.image = img;
      BomberMan.generateSprites(coat);
      EnemyMan.generateSprites(coat);
      Bomb.takeCoat(coat);
      Explosion.generateSprites(coat);
    }
  }
}