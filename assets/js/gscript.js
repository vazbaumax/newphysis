const form = document.getElementById("miFormulario");
const btnEnviar = document.getElementById("btnEnviar");
const mensajeDiv = document.getElementById("mensaje");

const scriptURL =
  "https://script.google.com/macros/s/AKfycbxfz_2_tC8l3Ruy7R72F2uM0GwRZ6pIeFnEPlCUyd74sOt0oatIzt63ObUYn8747X57/exec";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Deshabilitar botón
  btnEnviar.disabled = true;
  btnEnviar.textContent = "Enviando...";
  mensajeDiv.style.display = "none";

  try {
    const formData = new FormData(form);

    const response = await fetch(scriptURL, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      mostrarMensaje("¡Datos enviados exitosamente! ✅", "exito");
      form.reset();
    } else {
      throw new Error("Error en el servidor");
    }
  } catch (error) {
    console.error("Error:", error);
    mostrarMensaje(
      "Hubo un error al enviar los datos. Por favor verifica la URL del script. ❌",
      "error"
    );
  } finally {
    btnEnviar.disabled = false;
    btnEnviar.textContent = "Enviar";
  }
});

function mostrarMensaje(texto, tipo) {
  mensajeDiv.textContent = texto;
  mensajeDiv.className = "mensaje " + tipo;
  mensajeDiv.style.display = "block";

  if (tipo === "exito") {
    setTimeout(() => {
      mensajeDiv.style.display = "none";
    }, 5000);
  }
}

const countries = [
  { name: "Afghanistan", code: "+93", flag: "af" },
  { name: "Argentina", code: "+54", flag: "ar" },
  { name: "Australia", code: "+61", flag: "au" },
  { name: "Brazil", code: "+55", flag: "br" },
  { name: "Canada", code: "+1", flag: "ca" },
  { name: "Chile", code: "+56", flag: "cl" },
  { name: "China", code: "+86", flag: "cn" },
  { name: "Colombia", code: "+57", flag: "co" },
  { name: "Costa Rica", code: "+506", flag: "cr" },
  { name: "Dominican Republic", code: "+1-809", flag: "do" },
  { name: "Ecuador", code: "+593", flag: "ec" },
  { name: "Egypt", code: "+20", flag: "eg" },
  { name: "El Salvador", code: "+503", flag: "sv" },
  { name: "France", code: "+33", flag: "fr" },
  { name: "Germany", code: "+49", flag: "de" },
  { name: "Greece", code: "+30", flag: "gr" },
  { name: "Guatemala", code: "+502", flag: "gt" },
  { name: "Honduras", code: "+504", flag: "hn" },
  { name: "India", code: "+91", flag: "in" },
  { name: "Italy", code: "+39", flag: "it" },
  { name: "Japan", code: "+81", flag: "jp" },
  { name: "Mexico", code: "+52", flag: "mx" },
  { name: "Netherlands", code: "+31", flag: "nl" },
  { name: "New Zealand", code: "+64", flag: "nz" },
  { name: "Peru", code: "+51", flag: "pe" },
  { name: "Portugal", code: "+351", flag: "pt" },
  { name: "South Africa", code: "+27", flag: "za" },
  { name: "Spain", code: "+34", flag: "es" },
  { name: "Sweden", code: "+46", flag: "se" },
  { name: "Switzerland", code: "+41", flag: "ch" },
  { name: "United Kingdom", code: "+44", flag: "gb" },
  { name: "United States", code: "+1", flag: "us" },
  { name: "Uruguay", code: "+598", flag: "uy" },
  { name: "Venezuela", code: "+58", flag: "ve" },
];

const listContainer = document.getElementById("countryList");
const searchInput = document.getElementById("countrySearch");
const selectedFlag = document.getElementById("selectedFlag");
const selectedCode = document.getElementById("selectedCode");
const hiddenInput = document.getElementById("countryCode");

function renderCountries(filter = "") {
  listContainer.innerHTML = "";
  const filtered = countries.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.slice(0, 5).forEach((c) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <button type="button" class="dropdown-item d-flex align-items-center country-option" data-code="${c.code}" data-flag="${c.flag}">
          <img src="https://flagcdn.com/${c.flag}.svg" alt="${c.flag}" width="20" height="14" class="me-2" style="object-fit:cover;">
          ${c.name} ${c.code}
        </button>
      `;
    listContainer.appendChild(li);
  });
}

renderCountries();

searchInput.addEventListener("input", (e) => renderCountries(e.target.value));

listContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".country-option");
  if (!btn) return;
  const code = btn.dataset.code;
  const flag = btn.dataset.flag;
  selectedFlag.src = `https://flagcdn.com/${flag}.svg`;
  selectedCode.textContent = code;
  hiddenInput.value = code;
});

// Control de número telefónico con formato visual 123 456 7890
const phoneInput = document.getElementById("telefono");

phoneInput.addEventListener("input", function () {
  // Elimina todo lo que no sea dígito
  let digits = this.value.replace(/\D/g, "").slice(0, 10);

  // Inserta espacios cada 3 dígitos: 123 456 7890
  let formatted = "";
  if (digits.length > 0) formatted = digits.slice(0, 3);
  if (digits.length >= 4) formatted += " " + digits.slice(3, 6);
  if (digits.length >= 7) formatted += " " + digits.slice(6, 10);

  this.value = formatted;
});

// Al enviar, elimina espacios antes de enviar al servidor (opcional)
document.querySelector("form")?.addEventListener("submit", (e) => {
  const clean = phoneInput.value.replace(/\s/g, "");
  phoneInput.value = clean;
});
