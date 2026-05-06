let allProjects = [];
let activeFilter = "all";
let activeSlide = 0;
let slideTimer;

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNav();
  initReveal();
  initCounters();
  initModal();
  initContactForm();
  loadFeaturedCarousel();
  loadProjectGrid();
});

function initTheme() {
  const saved = localStorage.getItem("portfolio-theme");
  if (saved === "dark") document.body.classList.add("dark");
  document.querySelectorAll(".theme-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("portfolio-theme", document.body.classList.contains("dark") ? "dark" : "light");
    });
  });
}

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((item) => observer.observe(item));
}

function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const decimalPlaces = (el.dataset.count.split(".")[1] || "").length;
      const isDecimal = decimalPlaces > 0;
      let current = 0;
      const step = target / 42;
      const tick = () => {
        current += step;
        if (current >= target) {
          el.textContent = isDecimal ? target.toFixed(decimalPlaces) : String(target);
          return;
        }
        el.textContent = isDecimal ? current.toFixed(decimalPlaces) : String(Math.ceil(current));
        requestAnimationFrame(tick);
      };
      tick();
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach((counter) => observer.observe(counter));
}

async function fetchGithubProjects() {
  return FALLBACK_PROJECTS;
}

async function getProjects() {
  if (!allProjects.length) allProjects = await fetchGithubProjects();
  return allProjects;
}

async function loadFeaturedCarousel() {
  const track = document.getElementById("featuredCarousel");
  const dots = document.getElementById("carouselDots");
  if (!track || !dots) return;
  const projects = (await getProjects()).filter((project) => project.featured).slice(0, 5);
  track.innerHTML = projects.map(projectCard).join("");
  dots.innerHTML = projects.map((_, index) => `<button aria-label="Show slide ${index + 1}" data-slide="${index}"></button>`).join("");
  track.querySelectorAll(".project-card").forEach((card, index) => {
    card.addEventListener("click", () => openProjectModal(projects[index]));
  });
  document.querySelector(".carousel .prev")?.addEventListener("click", () => moveSlide(-1, projects.length));
  document.querySelector(".carousel .next")?.addEventListener("click", () => moveSlide(1, projects.length));
  dots.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => showSlide(Number(button.dataset.slide), projects.length));
  });
  showSlide(0, projects.length);
}

function moveSlide(direction, total) {
  showSlide((activeSlide + direction + total) % total, total);
}

function showSlide(index, total) {
  const track = document.getElementById("featuredCarousel");
  const dots = document.getElementById("carouselDots");
  if (!track || !total) return;
  activeSlide = index;
  track.style.transform = `translateX(-${index * 100}%)`;
  dots?.querySelectorAll("button").forEach((button, i) => button.classList.toggle("active", i === index));
  clearInterval(slideTimer);
  slideTimer = setInterval(() => moveSlide(1, total), 4500);
}

async function loadProjectGrid() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;
  const projects = await getProjects();
  renderProjects(projects);
  document.getElementById("projectSearch")?.addEventListener("input", () => renderProjects(projects));
  document.querySelectorAll("#projectFilters button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("#projectFilters button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      activeFilter = button.dataset.filter;
      renderProjects(projects);
    });
  });
}

function renderProjects(projects) {
  const grid = document.getElementById("projectGrid");
  const search = document.getElementById("projectSearch")?.value.toLowerCase().trim() || "";
  const filtered = projects.filter((project) => {
    const text = `${project.title} ${project.name} ${project.description} ${project.language} ${project.tags.join(" ")}`.toLowerCase();
    const matchesSearch = !search || text.includes(search);
    const matchesFilter = activeFilter === "all" || project.language === activeFilter || project.tags.includes(activeFilter);
    return matchesSearch && matchesFilter;
  });
  grid.innerHTML = filtered.length ? filtered.map(projectCard).join("") : `<p class="loading">No projects match that search.</p>`;
  grid.querySelectorAll(".project-card").forEach((card, index) => {
    card.addEventListener("click", () => openProjectModal(filtered[index]));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProjectModal(filtered[index]);
      }
    });
  });
}

function projectCard(project) {
  return `
    <article class="project-card" tabindex="0">
      <div class="card-top">
        <span>${project.language || "Code"}</span>
        <span>${project.type || "Project"} / ${project.year || "Recent"}</span>
      </div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="tag-row">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      <div class="card-actions">
        <a href="${project.homepage || project.url}" target="_blank" rel="noreferrer" onclick="event.stopPropagation()">View Project</a>
        <button type="button">Details</button>
      </div>
    </article>
  `;
}

function initModal() {
  const modal = document.getElementById("projectModal");
  if (!modal) return;
  modal.querySelector(".modal-close")?.addEventListener("click", closeProjectModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeProjectModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeProjectModal();
  });
}

function openProjectModal(project) {
  const modal = document.getElementById("projectModal");
  if (!modal) return;
  document.getElementById("modalMeta").textContent = `${project.type || "Project"} - ${project.language || "Code"}`;
  document.getElementById("modalTitle").textContent = project.title;
  document.getElementById("modalDescription").textContent = project.description;
  document.getElementById("modalTags").innerHTML = project.tags.map((tag) => `<span>${tag}</span>`).join("");
  document.getElementById("modalLink").href = project.homepage || project.url;
  modal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Portfolio inquiry: ${data.get("type")}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\nProject Type: ${data.get("type")}\n\n${data.get("message")}`);
    document.getElementById("formStatus").textContent = "Opening your email app with the message prepared.";
    window.location.href = `mailto:viirantmishra2005@gmail.com?subject=${subject}&body=${body}`;
  });
}
