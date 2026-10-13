function matchesFilter(types, filter) {
  return filter === "all" || types.includes(filter);
}

function setYear() {
  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());
}

function bindMenu() {
  const menu = document.querySelector(".menu");
  const links = document.querySelector("#nav-links");
  if (!menu || !links) return;

  menu.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
  });

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      menu.setAttribute("aria-expanded", "false");
    });
  });
}

function bindFilters() {
  const bar = document.querySelector("[data-filters]");
  const cards = [...document.querySelectorAll("[data-types]")];
  if (!bar || !cards.length) return;

  bar.addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-filter]");
    if (!btn) return;

    const filter = btn.dataset.filter;
    bar.querySelectorAll("button").forEach((b) => {
      b.setAttribute("aria-pressed", String(b === btn));
    });

    cards.forEach((card) => {
      const types = card.dataset.types.split(" ");
      card.classList.toggle("hidden", !matchesFilter(types, filter));
    });
  });
}

function bindForm() {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.elements.namedItem("name");
    const email = form.elements.namedItem("email");
    const message = form.elements.namedItem("message");
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);

    if (!name.value.trim() || !emailOk || !message.value.trim()) {
      if (status) status.textContent = "Please add your name, a valid email, and a message.";
      return;
    }

    const subject = encodeURIComponent("Portfolio note from " + name.value.trim());
    const body = encodeURIComponent(message.value.trim() + "\n\n- " + email.value.trim());
    if (status) status.textContent = "Opening your email app…";
    window.location.href = "mailto:lekhanigam1221@gmail.com?subject=" + subject + "&body=" + body;
  });
}

setYear();
bindMenu();
bindFilters();
bindForm();
