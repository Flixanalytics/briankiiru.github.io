
// Loader
window.addEventListener('load', () => {
  gsap.to('.loader', {
    duration: 1,
    opacity: 0,
    onComplete: () => document.querySelector('.loader').style.display = 'none'
  });
  
  const nameElement = document.querySelector('.name-animation h1');
  if (nameElement) {
    typeWriter(nameElement, 'Brian Karani Kiiru');
  }
});

// Typewriter effect
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Page Transition
function createTransition() {
  const transition = document.createElement('div');
  transition.className = 'page-transition';
  document.body.appendChild(transition);
  setTimeout(() => transition.remove(), 1000);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    createTransition();
    setTimeout(() => {
      const targetId = this.getAttribute('href').replace('/', '');
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    }, 500);
  });
});

// Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('active');
  }
});

// Close mobile menu on click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    createTransition();
    
    navLinks.classList.remove('active');
    
    setTimeout(() => {
      const targetId = this.getAttribute('href').replace('/', '');
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    }, 500);
  });
});

// Animate skills on load
const skills = ['Python', 'Machine Learning', 'Data Analysis', 'Statistics'];
const skillsCloud = document.getElementById('skills-cloud');

function populateSkills() {
  skillsCloud.innerHTML = '';
  skills.forEach((skill, index) => {
    const skillDiv = document.createElement('div');
    skillDiv.className = 'animated-skill';
    skillDiv.style.animationDelay = `${index * 0.2}s`;
    skillDiv.textContent = skill;
    skillsCloud.appendChild(skillDiv);
  });
}

populateSkills();

// Projects Data
const projects = [
  {
    title: 'Advanced Stock Market Predictor',
    skills: ['Python', 'TensorFlow', 'Pandas', 'SK-learn'],
    description: 'Deep learning model utilizing LSTM networks for accurate stock price prediction with real-time data integration.',
    video: './vid1.mp4'
  },
  {
    title: 'Economic Data Analysis Dashboard',
    skills: ['R', 'Shiny', 'ggplot2', 'tidyverse'],
    description: 'Interactive dashboard visualizing economic indicators with predictive analytics capabilities.',
    video: 'https://example.com/dashboard.mp4'
  },
  {
    title: 'ML-Powered Customer Segmentation',
    skills: ['Python', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
    description: 'Clustering algorithm for customer segmentation with interactive visualization.',
    video: 'https://example.com/clustering.mp4'
  }
];
// section to add projects from github
// Render Projects
function renderProjects() {
  const projectGrid = document.getElementById('projectGrid');
  if (!projectGrid) return;

  projects.forEach(project => {
    const tile = document.createElement('div');
    tile.className = 'project-tile';
    tile.innerHTML = `
      <h3>${project.title}</h3>
      <video class="project-video" controls>
        <source src="${project.video}" type="video/mp4">
      </video>
      <p>${project.description}</p>
      <div class="skills">
        ${project.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
      </div>
    `;
    projectGrid.appendChild(tile);
  });
}
// add articles data here
// Articles Data
const articles = [
  {
    title: 'Introduction to Machine Learning Algorithms',
    date: '2023-05-15',
    preview: 'A comprehensive guide to understanding basic ML algorithms and their applications in real-world scenarios...',
    pdf: './doc.pdf',
    readTime: '8 min read',
  },
  {
    title: 'Economic Data Analysis using Python',
    date: '2023-06-01',
    preview: 'Exploring economic data analysis techniques using Python libraries like Pandas and Matplotlib...',
    pdf: './doc.pdf',
    readTime: '12 min read',
  },
];

// Function to merge PDFs and create a single downloadable file
async function mergePDFs(pdfUrls) {
  const mergedPdf = await PDFLib.PDFDocument.create();
  
  for (const pdfUrl of pdfUrls) {
    const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
    const existingPdf = await PDFLib.PDFDocument.load(existingPdfBytes);
    const copiedPages = await mergedPdf.copyPages(existingPdf, existingPdf.getPageIndices());
    copiedPages.forEach(page => mergedPdf.addPage(page));
  }

  const pdfDataUri = await mergedPdf.saveAsBase64({ dataUri: true });
  const link = document.createElement('a');
  link.href = pdfDataUri;
  link.download = 'combined-articles.pdf';
  link.click();
}

// Render Articles
function renderArticles() {
  const container = document.getElementById('articlesContainer');
  if (!container) return;

  articles.forEach((article) => {
    const card = document.createElement('div');
    card.className = 'pdf-section';

    card.innerHTML = `
      <h3>${article.title}</h3>
      <p class="date">${article.date} • ${article.readTime}</p>
      <p>${article.preview}</p>
      <div class="pdf-container">
        <iframe
          class="pdf-preview"
          src=""
          title="${article.title} PDF"
        ></iframe>
      </div>
      <button class="btn download-btn" data-pdf="${article.pdf}">Download PDF</button>
    `;

    container.appendChild(card);
  });

  // Add click event listeners to download buttons
  document.querySelectorAll('.download-btn').forEach((button) => {
    button.addEventListener('click', (e) => {
      const pdfUrl = e.target.getAttribute('data-pdf');
      const iframe = e.target.previousElementSibling.querySelector('.pdf-preview');
      iframe.src = pdfUrl;
    });
  });

//   // Add a button to download all articles as a single PDF
//   const downloadAllButton = document.createElement('button');
//   downloadAllButton.className = 'btn download-all-btn';
//   downloadAllButton.innerText = 'Download All Articles as PDF';
//   downloadAllButton.addEventListener('click', () => {
//     const pdfUrls = articles.map(article => article.pdf);
//     mergePDFs(pdfUrls);
//   });
//   container.appendChild(downloadAllButton);
}

// Call renderArticles when the page loads
window.addEventListener('load', renderArticles);

// Skills Data
const skillsData = [
  { name: 'Python', icon: 'fab fa-python', progress: 90 },
  { name: 'Machine Learning', icon: 'fas fa-brain', progress: 85 },
  { name: 'Data Analysis', icon: 'fas fa-chart-line', progress: 88 },
  { name: 'R Programming', icon: 'fas fa-code', progress: 82 },
  { name: 'Statistics', icon: 'fas fa-square-root-alt', progress: 85 },
  { name: 'SQL', icon: 'fas fa-database', progress: 80 },
  { name: 'Data Visualization', icon: 'fas fa-chart-bar', progress: 87 },
  { name: 'Deep Learning', icon: 'fas fa-network-wired', progress: 78 }
];

// Render Skills
function renderSkills() {
  const skillsGrid = document.querySelector('.skills-grid');
  skillsData.forEach(skill => {
    const skillCard = document.createElement('div');
    skillCard.className = 'skill-card';
    skillCard.innerHTML = `
      <div class="skill-name">
        <i class="${skill.icon}"></i>
        <h3>${skill.name}</h3>
      </div>
      <div class="progress-bar">
        <div class="progress" style="width: 0%"></div>
      </div>
    `;
    skillsGrid.appendChild(skillCard);
  });
}

// Animate progress bars when they come into view
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar .progress');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const skillCard = entry.target.closest('.skill-card');
        const skillName = skillCard.querySelector('.skill-name h3').textContent;
        const skillData = skillsData.find(skill => skill.name === skillName);
        if (skillData) {
          entry.target.style.width = `${skillData.progress}%`;
        }
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => observer.observe(bar));
}

// Initialize skills section
renderSkills();
animateProgressBars();

// Scroll Animation
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px'
});

// Add initial styles in the CSS
const animatedElements = document.querySelectorAll('.project-tile, .article-card');
animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease-out';
  scrollObserver.observe(el);
});

// Initialize
renderProjects();


