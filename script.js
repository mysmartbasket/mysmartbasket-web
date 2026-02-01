// Año automático
document.getElementById("year").textContent = new Date().getFullYear();

// Si Netlify redirige con ?success=true, mostramos mensaje (opcional)
const params = new URLSearchParams(window.location.search);
if (params.get("success") === "true") {
  const success = document.getElementById("success");
  if (success) success.hidden = false;
}
