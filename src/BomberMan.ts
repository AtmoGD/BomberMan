///<reference path="Man.ts"/>
namespace BomberMan {
  export class BomberMan extends Man {
    private lives: number = 3;
    private score: number = 0;

    constructor(_name?: string) {
      super(_name ? _name : "BomberMan");
    }
  }
}