namespace BomberMan {
  export function getCookie(name: string): string | undefined {
    const value: string = "; " + document.cookie;
    const parts: string[] = value.split("; " + name + "=");

    if (parts.length == 2) {
      return parts.pop()?.split(";").shift();
    }
    return undefined;
  }

  export function setCookie(_name: string, _val: string): void {
    const date: Date = new Date();
    const value: string = _val;

    // Set it expire in 7 days
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

    document.cookie = _name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
  }
  export function deleteCookie(_name: string): void {
    const date: Date = new Date();
    date.setTime(date.getTime() - 1000);
    
    document.cookie = _name + "=" + "; expires=" + date.toUTCString() + "; path=/";
  }
}