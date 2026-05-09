let firebaseApi = null;
let adminData = structuredClone(DEFAULT_PORTFOLIO);
let signedIn = false;

document.addEventListener("DOMContentLoaded", async () => {
  initTheme();
  initNav();
  initReveal();
  initAdmin();
});

async function initAdmin() {
  const status = document.getElementById("firebaseStatus");
  try {
    firebaseApi = await window.PortfolioFirebaseReady;
    if (!firebaseApi.enabled) {
      status.textContent = firebaseApi.reason;
      fillAdminForm(adminData);
      setEditorEnabled(false);
      return;
    }

    status.textContent = "Firebase connected. Sign in to edit.";
    firebaseApi.onAuthChange(async (user) => {
      signedIn = Boolean(user);
      status.textContent = user ? `Signed in as ${user.email}` : "Firebase connected. Sign in to edit.";
      setEditorEnabled(signedIn);
      if (signedIn) await loadRemoteContent();
    });
  } catch (error) {
    status.textContent = "Firebase could not initialize. Check firebase-config.js.";
    console.error(error);
    fillAdminForm(adminData);
    setEditorEnabled(false);
  }

  document.getElementById("loginForm").addEventListener("submit", handleLogin);
  document.getElementById("signOutButton").addEventListener("click", () => firebaseApi?.signOut?.());
  document.getElementById("loadDefaults").addEventListener("click", () => {
    adminData = structuredClone(DEFAULT_PORTFOLIO);
    fillAdminForm(adminData);
    setSaveStatus("Defaults loaded in the editor. Save to publish them.");
  });
  document.getElementById("addProject").addEventListener("click", addProject);
  document.getElementById("adminForm").addEventListener("submit", handleSave);
}

async function handleLogin(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  try {
    await firebaseApi.signIn(data.get("email"), data.get("password"));
    event.currentTarget.reset();
  } catch (error) {
    const domainHelp = error.code === "auth/unauthorized-domain"
      ? " Add this website domain in Firebase Authentication > Settings > Authorized domains."
      : "";
    setSaveStatus(`Sign in failed: ${error.message}${domainHelp}`);
  }
}

async function loadRemoteContent() {
  const remoteData = await firebaseApi.getPortfolioData();
  adminData = remoteData ? mergePortfolio(DEFAULT_PORTFOLIO, remoteData) : structuredClone(DEFAULT_PORTFOLIO);
  fillAdminForm(adminData);
  setSaveStatus(remoteData ? "Loaded content from Firebase." : "No Firebase content yet. Loaded defaults.");
}

async function handleSave(event) {
  event.preventDefault();
  if (!firebaseApi?.enabled || !signedIn) {
    setSaveStatus("Sign in with Firebase before saving.");
    return;
  }

  try {
    const payload = readAdminForm();
    await firebaseApi.savePortfolioData(payload);
    adminData = payload;
    setSaveStatus("Saved to Firebase. Refresh the public pages to see the changes.");
  } catch (error) {
    setSaveStatus(`Save failed: ${error.message}`);
  }
}

function fillAdminForm(data) {
  setField("profile.name", data.profile.name);
  setField("profile.role", data.profile.role);
  setField("profile.email", data.profile.email);
  setField("profile.phone", data.profile.phone);
  setField("profile.github", data.profile.github);
  setField("profile.linkedin", data.profile.linkedin);
  setField("profile.heroLead", data.profile.heroLead);
  setField("profile.aboutText", data.profile.aboutText);
  setField("profile.whatIDoText", data.profile.whatIDoText);
  setJsonField("stats", data.stats);
  setJsonField("skills", data.skills);
  setJsonField("education", data.education);
  setJsonField("profileFacts", data.profileFacts);
  setJsonField("skillBars", data.skillBars);
  setJsonField("documents", data.documents);
  setJsonField("contactCards", data.contactCards);
  renderProjectEditor(data.projects || []);
}

function readAdminForm() {
  const form = document.getElementById("adminForm");
  const data = new FormData(form);
  return {
    ...adminData,
    profile: {
      ...adminData.profile,
      name: data.get("profile.name"),
      role: data.get("profile.role"),
      email: data.get("profile.email"),
      phone: data.get("profile.phone"),
      github: data.get("profile.github"),
      linkedin: data.get("profile.linkedin"),
      heroLead: data.get("profile.heroLead"),
      aboutText: data.get("profile.aboutText"),
      whatIDoText: data.get("profile.whatIDoText")
    },
    stats: readJsonField("stats"),
    skills: readJsonField("skills"),
    education: readJsonField("education"),
    profileFacts: readJsonField("profileFacts"),
    skillBars: readJsonField("skillBars"),
    projects: readProjects(),
    documents: readJsonField("documents"),
    contactCards: readJsonField("contactCards")
  };
}

function renderProjectEditor(projects) {
  const editor = document.getElementById("projectEditor");
  editor.innerHTML = projects.map((project, index) => `
    <article class="project-editor" data-project-index="${index}">
      <div class="card-top">
        <span>Project ${index + 1}</span>
        <button type="button" data-remove-project="${index}">Remove</button>
      </div>
      <div class="admin-grid">
        <label>Title<input name="project.title" value="${escapeAttribute(project.title)}"></label>
        <label>Name<input name="project.name" value="${escapeAttribute(project.name)}"></label>
        <label>Language<input name="project.language" value="${escapeAttribute(project.language)}"></label>
        <label>Type<input name="project.type" value="${escapeAttribute(project.type)}"></label>
        <label>Year<input name="project.year" value="${escapeAttribute(project.year)}"></label>
        <label>URL<input name="project.url" value="${escapeAttribute(project.url)}"></label>
      </div>
      <label>Description<textarea name="project.description" rows="4">${escapeHtml(project.description)}</textarea></label>
      <label>Tags, comma separated<input name="project.tags" value="${escapeAttribute((project.tags || []).join(", "))}"></label>
      <label class="check-row"><input type="checkbox" name="project.featured" ${project.featured ? "checked" : ""}> Featured in carousel</label>
    </article>
  `).join("");
  editor.querySelectorAll("[data-remove-project]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.removeProject);
      const projects = readProjects();
      projects.splice(index, 1);
      renderProjectEditor(projects);
    });
  });
}

function addProject() {
  const projects = readProjects();
  projects.push({
    name: "new-project",
    title: "New Project",
    description: "Write a short project description.",
    language: "JavaScript",
    type: "Project",
    year: "2026",
    tags: ["Portfolio"],
    url: "#",
    homepage: "",
    featured: true
  });
  renderProjectEditor(projects);
}

function readProjects() {
  return Array.from(document.querySelectorAll(".project-editor")).map((project) => {
    const get = (name) => project.querySelector(`[name='${name}']`)?.value.trim() || "";
    return {
      name: get("project.name"),
      title: get("project.title"),
      description: get("project.description"),
      language: get("project.language"),
      type: get("project.type"),
      year: get("project.year"),
      tags: get("project.tags").split(",").map((tag) => tag.trim()).filter(Boolean),
      url: get("project.url"),
      homepage: "",
      featured: project.querySelector("[name='project.featured']").checked
    };
  });
}

function setEditorEnabled(enabled) {
  document.querySelectorAll("#adminForm input, #adminForm textarea, #adminForm button").forEach((field) => {
    field.disabled = !enabled;
  });
}

function setField(name, value) {
  const field = document.querySelector(`[name='${name}']`);
  if (field) field.value = value || "";
}

function setJsonField(name, value) {
  setField(name, JSON.stringify(value, null, 2));
}

function readJsonField(name) {
  const value = document.querySelector(`[name='${name}']`)?.value || "[]";
  try {
    return JSON.parse(value);
  } catch (error) {
    throw new Error(`${name} must contain valid JSON.`);
  }
}

function setSaveStatus(message) {
  document.getElementById("saveStatus").textContent = message;
}

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

function mergePortfolio(defaults, remote) {
  return {
    ...defaults,
    ...remote,
    profile: { ...defaults.profile, ...(remote.profile || {}) },
    stats: remote.stats || defaults.stats,
    skills: remote.skills || defaults.skills,
    education: remote.education || defaults.education,
    profileFacts: remote.profileFacts || defaults.profileFacts,
    skillBars: remote.skillBars || defaults.skillBars,
    projects: remote.projects || defaults.projects,
    documents: remote.documents || defaults.documents,
    contactCards: remote.contactCards || defaults.contactCards
  };
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value = "") {
  return escapeHtml(value);
}
