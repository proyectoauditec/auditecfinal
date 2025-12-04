// =========================
// 🎤 ACTIVAR EL MICRÓFONO
// =========================
const micBtn = document.getElementById("micBtn");
const micStatus = document.getElementById("micStatus");

micBtn.addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    micStatus.textContent = "Micrófono ACTIVADO ✔";
    micStatus.style.color = "#00ffc3";

    // Detener después de 5 segundos para evitar uso continuo
    setTimeout(() => {
      stream.getTracks().forEach(track => track.stop());
      micStatus.textContent = "Micrófono detenido automáticamente.";
      micStatus.style.color = "#fff";
    }, 5000);

  } catch (err) {
    micStatus.textContent = "❌ No se pudo acceder al micrófono";
    micStatus.style.color = "#ff8a8a";
    console.error(err);
  }
});
