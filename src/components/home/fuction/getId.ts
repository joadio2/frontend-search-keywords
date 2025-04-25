export const getId = async (): Promise<string> => {
  const res = await fetch("https://api.ipify.org?format=json");
  const { ip } = await res.json();

  const userAgent = navigator.userAgent;
  const rawString = `${ip}-${userAgent}`;

  // Codificamos en UTF-8
  const encoder = new TextEncoder();
  const data = encoder.encode(rawString);

  // Hasheamos con SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // Lo convertimos a hex string
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
};
