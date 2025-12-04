// ===============================
// 🗣 CONVERSIÓN DE VOZ A TEXTO (MEJORADO)
// ===============================
const recBtn = document.getElementById("recBtn");
const langSelect = document.getElementById("langSelect");
const voiceText = document.getElementById("voiceText");

let recognition;

if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  recBtn.addEventListener("click", () => {
    recognition.lang = langSelect.value;
    recognition.start();
    recBtn.textContent = "Escuchando... habla ahora";
    voiceText.value += "[Escuchando...]\n";
  });

  // Cuando detecta voz
  recognition.onspeechstart = () => {
    console.log("Voz detectada");
  };

  // Cuando termina la voz
  recognition.onspeechend = () => {
    console.log("Fin de voz");
    recognition.stop();
    recBtn.textContent = "Iniciar reconocimiento";
  };

  // Si no entendió la voz
  recognition.onnomatch = () => {
    voiceText.value += "[No se detectó voz]\n";
  };

  // Cuando sí hay resultado
  recognition.onresult = (e) => {
    const text = e.results[0][0].transcript;
    voiceText.value += text + "\n";
  };

  // Manejo de errores
  recognition.onerror = (e) => {
    if (e.error === "no-speech") {
      voiceText.value += "[No se escuchó nada, intenta acercarte más al micrófono]\n";
    } else {
      voiceText.value += "[Error]: " + e.error + "\n";
    }
    recBtn.textContent = "Iniciar reconocimiento";
  };

} else {
  recBtn.disabled = true;
  voiceText.placeholder = "Este navegador no soporta reconocimiento de voz.";
}
