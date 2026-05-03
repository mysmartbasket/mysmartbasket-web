document.getElementById("year").textContent = new Date().getFullYear();

const form = document.querySelector('form[name="waitlist"]');
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = "Enviando…";

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      form.hidden = true;
      const success = document.getElementById("success");
      if (success) success.hidden = false;
    } catch {
      btn.disabled = false;
      btn.textContent = "Quiero acceso anticipado";
      alert("Hubo un error. Por favor, inténtalo de nuevo.");
    }
  });
}
