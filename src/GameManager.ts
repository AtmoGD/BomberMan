namespace BomberMan {
  export class GameManager {
    private viewport: ƒ.Viewport;
    public graph: ƒ.Node;
    private camera: ƒ.ComponentCamera;

    public map: Map = null;
    public mans: Man[] = [];
    public bomberman: BomberMan = null;
    public enemy: EnemyMan[] = [];

    private gameOver: boolean = false;

    constructor(_viewport: ƒ.Viewport, _graph: ƒ.Node, _camera: ƒ.ComponentCamera) {

      this.viewport = _viewport;
      this.graph = _graph;
      this.camera = _camera;
    }

    public startGame(): void {
      Map.loadImages();
      this.loadSprites();

      this.map = MapGenerator.generateRandomMap(21);
      
      this.bomberman = new BomberMan(this.map, this, "Bomberman");

      for(let i: number = 0; i < data.enemyCount; i++) {
        let newEnemy: EnemyMan = new EnemyMan(this.map, this, "EnemyMan");
        this.enemy.push(newEnemy);
        this.graph.appendChild(newEnemy);
      }
  
      this.graph.appendChild(this.map);
      this.graph.appendChild(this.bomberman);
    }
    
    public getMap(): Map {
      return this.map;
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