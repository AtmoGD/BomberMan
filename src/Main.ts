namespace BomberMan {
  window.addEventListener("load", handleLoad);

  function handleLoad(): void {
    let path: string = window.location.pathname;
    let page: string | undefined = path.split("/").pop();

    if (!page)
      return;

    switch (page) {
      
    }
  }
}