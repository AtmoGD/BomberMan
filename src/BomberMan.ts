///<reference path="Man.ts"/>
namespace BomberMan {
  export class BomberMan extends Man {
    private lives: number = 3;
    private score: number = 0;

    private liveElement: HTMLSpanElement;
    private scoreElement: HTMLSpanElement;
    private endScoreElement: HTMLSpanElement;

    constructor(_map: Map, _gameManager: GameManager, _name?: string) {
      super(_map, _gameManager, 4, data.playerStartLevel, data.playerMaxLevel,_name ? _name : "BomberMan");
      this.lives = data.playerStartLives;
      this.speed *= 2;
      this.initKeyEvent();
      this.liveElement = document.querySelector("#lives");
      this.liveElement.innerText = this.lives.toString();
      this.scoreElement = document.querySelector("#score");
      this.endScoreElement = document.querySelector("#endScore");
    }

    private initKeyEvent(): void {
      window.addEventListener("keypress", this.handleKeyPress.bind(this));
    }

    private handleKeyPress(_event: KeyboardEvent): void {
      switch (_event.code) {
        case ƒ.KEYBOARD_CODE.W:
          super.move(DIRECTION.UP);
          break;
        case ƒ.KEYBOARD_CODE.S:
          super.move(DIRECTION.DOWN);
          break;
        case ƒ.KEYBOARD_CODE.A:
          super.move(DIRECTION.LEFT);
          break;
        case ƒ.KEYBOARD_CODE.D:
          super.move(DIRECTION.RIGHT);
          break;
        case ƒ.KEYBOARD_CODE.SPACE:
          super.placeBomb();
          break;
      }
    }

    public takeScore(_amount: number): void {
      this.score += _amount;

      if (this.scoreElement)
        this.scoreElement.innerText = this.score.toString();
    }

    public getScore(): number {
      return this.score;
    }

    public die(): void {
      this.lives--;
      this.gameManager.playMusic(audioLoseLife, false);
      
      if (this.liveElement)
        this.liveElement.innerText = this.lives.toString();
      
      if (this.endScoreElement)
        this.endScoreElement.innerText = this.score.toString();

      if (this.lives <= 0) {
        setTimeout(()=> {
          let gameOver: CustomEvent = new CustomEvent("gameOver", {bubbles: true});
          this.dispatchEvent(gameOver);
        }, 100);
      }
    }

    public static generateSprites(_coat: ƒ.CoatTextured): void {
      BomberMan.animations = {};

      let sprite: ƒAid.SpriteSheetAnimation = new ƒAid.SpriteSheetAnimation(ACTION.IDLE + DIRECTION.UP, _coat);
      let startRect: ƒ.Rectangle = new ƒ.Rectangle(0, -16, 16, 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      sprite.generateByGrid(startRect, 1, ƒ.Vector2.ZERO(), 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      BomberMan.animations[ACTION.IDLE + DIRECTION.UP] = sprite;

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.IDLE + DIRECTION.DOWN, _coat);
      startRect = new ƒ.Rectangle(16, -16, 16, 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      sprite.generateByGrid(startRect, 1, ƒ.Vector2.ZERO(), 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      BomberMan.animations[ACTION.IDLE + DIRECTION.DOWN] = sprite;

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.IDLE + DIRECTION.LEFT, _coat);
      startRect = new ƒ.Rectangle(208, -16, 16, 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      sprite.generateByGrid(startRect, 1, ƒ.Vector2.ZERO(), 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      BomberMan.animations[ACTION.IDLE + DIRECTION.LEFT] = sprite;

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.IDLE + DIRECTION.RIGHT, _coat);
      startRect = new ƒ.Rectangle(64, -16, 16, 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      sprite.generateByGrid(startRect, 1, ƒ.Vector2.ZERO(), 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      BomberMan.animations[ACTION.IDLE + DIRECTION.RIGHT] = sprite;



      sprite = new ƒAid.SpriteSheetAnimation(ACTION.WALK + DIRECTION.UP, _coat);
      startRect = new ƒ.Rectangle(128, -16, 16, 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      sprite.generateByGrid(startRect, 2, ƒ.Vector2.ZERO(), 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      BomberMan.animations[ACTION.WALK + DIRECTION.UP] = sprite;

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.WALK + DIRECTION.DOWN, _coat);
      startRect = new ƒ.Rectangle(32, -16, 16, 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      sprite.generateByGrid(startRect, 2, ƒ.Vector2.ZERO(), 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      BomberMan.animations[ACTION.WALK + DIRECTION.DOWN] = sprite;

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.WALK + DIRECTION.LEFT, _coat);
      startRect = new ƒ.Rectangle(160, -16, 16, 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      sprite.generateByGrid(startRect, 3, ƒ.Vector2.ZERO(), 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      BomberMan.animations[ACTION.WALK + DIRECTION.LEFT] = sprite;

      sprite = new ƒAid.SpriteSheetAnimation(ACTION.WALK + DIRECTION.RIGHT, _coat);
      startRect = new ƒ.Rectangle(80, -16, 16, 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      sprite.generateByGrid(startRect, 3, ƒ.Vector2.ZERO(), 16, ƒ.ORIGIN2D.BOTTOMLEFT);
      BomberMan.animations[ACTION.WALK + DIRECTION.RIGHT] = sprite;
    }
    public show(_action: ACTION, _direction: DIRECTION): void {
      this.setAnimation(<ƒAid.SpriteSheetAnimation>BomberMan.animations[_action + _direction]);
    }
  }
}