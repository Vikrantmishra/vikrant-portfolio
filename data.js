const FALLBACK_PROJECTS = [
  {
    name: "lightsOut",
    title: "Lights Out Game",
    description: "Interactive Lights Out puzzle game built with Express.js, Node.js, Tailwind, and JavaScript. The project focuses on mathematical implementation, level progression, optimal-solution thinking, and hints for players.",
    language: "CSS",
    tags: ["Node.js", "Express.js", "Tailwind", "JavaScript", "Game Logic"],
    url: "https://github.com/Vikrantmishra/lightsOut",
    homepage: "",
    stars: 0,
    forks: 0,
    featured: true
  },
  {
    name: "nurseryniche",
    title: "Nursery Management Website",
    description: "A data-backed website for nursery owners to manage daily farm and business details. Built with PHP, MySQL, JavaScript, HTML, and CSS, with categories for storing nursery records.",
    language: "PHP",
    tags: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    url: "https://github.com/Vikrantmishra/nurseryniche",
    homepage: "https://vikrantmishra.github.io/nurseryniche/",
    stars: 1,
    forks: 0,
    featured: true
  },
  {
    name: "Jokesproject",
    title: "Jokes API Project",
    description: "A jokes webpage that fetches data from an API and renders it with a server-side JavaScript stack.",
    language: "EJS",
    tags: ["EJS", "API", "JavaScript"],
    url: "https://github.com/Vikrantmishra/Jokesproject",
    homepage: "",
    stars: 0,
    forks: 0,
    featured: true
  },
  {
    name: "DiceGame",
    title: "Dice Game",
    description: "A compact browser game built with JavaScript fundamentals, DOM updates, and random game state.",
    language: "JavaScript",
    tags: ["JavaScript", "DOM", "Game"],
    url: "https://github.com/Vikrantmishra/DiceGame",
    homepage: "",
    stars: 0,
    forks: 0,
    featured: true
  }
];

const PROJECT_OVERRIDES = {
  lightsOut: FALLBACK_PROJECTS[0],
  nurseryniche: FALLBACK_PROJECTS[1],
  Jokesproject: FALLBACK_PROJECTS[2],
  DiceGame: FALLBACK_PROJECTS[3]
};
