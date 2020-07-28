namespace BomberMan {
  let startButton: HTMLButtonElement | null;
  let volumeInput: HTMLInputElement | null;

  export function initStartScreen(): void {
    startButton = document.querySelector("#startGameButton");
    if (startButton)
      startButton.addEventListener("click", startGame);

    volumeInput = document.querySelector("#volumeInput");
    if (volumeInput) {
      volumeInput.addEventListener("change", updateVolume);

      let volume: string | undefined = getCookie("volume");
      if (volume != undefined) {
        volumeInput.value = volume;
      }
    }
  }

  function startGame(): void {
    let audio = new Audio('../assets/Sounds/Click.wav');
    audio.play();
    setTimeout(() => {window.location.href = "./html/Game.html";}, 1000);
  }

  function updateVolume(): void {
    let volume: string | undefined = volumeInput?.value;
    if (!volume)
      return;

    setCookie("volume", volume);
  }
}