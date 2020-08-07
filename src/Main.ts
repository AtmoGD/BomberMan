namespace BomberMan {
  export import ƒ = FudgeCore;
  export import ƒAid = FudgeAid;

  window.addEventListener("load", handleLoad);

  export let audioBackground: ƒ.Audio;
  export let audioWalk: ƒ.Audio;
  export let audioExplosion: ƒ.Audio;
  export let audioDie: ƒ.Audio;
  export let audioButtonClick: ƒ.Audio;
  export let audioLoseLife: ƒ.Audio;

  async function handleLoad(): Promise<void> {
    let path: string = window.location.pathname;
    let page: string | undefined = path.split("/").pop();
    if (!page) {
      initStartScreen();
      return;
    }

    await loadMusic();

    switch (page) {
      case "index.html":
      case "":
        initStartScreen();
        break;
      case "Game":
      case "Game.html":
        initGame();
        break;
      default:
        return;
    }
  }

  async function loadMusic(): Promise<void> {
    audioButtonClick = await ƒ.Audio.load("../assets/Sounds/Click.wav");
    audioBackground = await ƒ.Audio.load("../assets/Sounds/Background.mp3");
    audioExplosion = await ƒ.Audio.load("../assets/Sounds/Explosion.wav");
    audioLoseLife = await ƒ.Audio.load("../assets/Sounds/Hurt.wav");
    audioWalk = await ƒ.Audio.load("../assets/Sounds/Walk.wav");
    audioDie = await ƒ.Audio.load("../assets/Sounds/GameOver.wav");
  }
}