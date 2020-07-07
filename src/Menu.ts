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

      let volume: string | undefined= getCookie("Volume");
      console.log(document.cookie);
      if (volume != undefined) {
        volumeInput.value = volume;
      }
    }
  }

  function startGame(): void {
    window.location.href = "./html/Game.html"; 
  }

  function updateVolume(): void {
    let volume: string | undefined = volumeInput?.value;
    if (!volume)
      return;

    setCookie("Volume", volume);
    console.log(document.cookie);
  }
}