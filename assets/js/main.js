/* Renders publications + projects from assets/data/publications.js,
   drives scrollspy nav, the mobile menu, and the theme toggle. */
(function () {
  "use strict";

  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  /* ---------- Publications ---------- */
  /* Newest first; within a year, peer-reviewed venues lead. */
  var RANK = { conference: 0, journal: 0, workshop: 1 };

  function authorsHTML(authors) {
    return authors.map(function (a) {
      return a.me
        ? '<span class="me">' + esc(a.n) + "</span>"
        : esc(a.n);
    }).join(", ");
  }

  function chipsHTML(links, status) {
    var out = (links || []).map(function (l) {
      return '<li><a href="' + esc(l.url) + '" rel="noopener">' + esc(l.label) + "</a></li>";
    });
    if (status) out.unshift("<li><span>" + esc(status) + "</span></li>");
    return out.join("");
  }

  function pubHTML(p) {
    var cites = p.citations
      ? '<span class="pub-cites">' + p.citations + " citation" + (p.citations === 1 ? "" : "s") + "</span>"
      : "";
    var primary = (p.links && p.links[0]) ? p.links[0].url : null;
    var title = primary
      ? '<a href="' + esc(primary) + '" rel="noopener">' + esc(p.title) + "</a>"
      : esc(p.title);
    var why = p.why ? '<p class="pub-why">' + esc(p.why) + "</p>" : "";

    return '<article class="pub" id="' + esc(p.id) + '">' +
      '<img class="pub-fig" src="' + esc(p.fig) + '" alt="' + esc(p.figAlt || "") + '" loading="lazy">' +
      "<div>" +
        '<h4 class="pub-title">' + title + "</h4>" +
        '<p class="pub-authors">' + authorsHTML(p.authors) + "</p>" +
        '<p class="pub-venue"><span class="badge">' + esc(p.badge) + "</span>" +
          esc(p.venue) + ", " + p.year + cites + "</p>" +
        why +
        '<ul class="chips">' + chipsHTML(p.links, p.status) + "</ul>" +
      "</div></article>";
  }

  function renderPublications() {
    var host = document.getElementById("pub-list");
    if (!host || typeof PUBLICATIONS === "undefined") return;

    host.innerHTML = PUBLICATIONS.slice().sort(function (a, b) {
      return (b.year - a.year) || ((RANK[a.group] || 0) - (RANK[b.group] || 0));
    }).map(pubHTML).join("");
  }

  /* ---------- Projects ---------- */
  function projectHTML(p) {
    var heading = p.url
      ? '<a href="' + esc(p.url) + '" rel="noopener">' + esc(p.name) + "</a>"
      : esc(p.name);
    var cta = p.url
      ? '<ul class="chips"><li><a href="' + esc(p.url) + '" rel="noopener">View on GitHub</a></li></ul>'
      : '<ul class="chips"><li><span>Code release pending</span></li></ul>';

    return '<article class="project">' +
      '<img class="project-fig" src="' + esc(p.fig) + '" alt="' + esc(p.figAlt || "") + '" loading="lazy">' +
      '<div class="project-body">' +
        "<h3>" + heading + "</h3>" +
        '<p class="meta">' + esc(p.meta) + "</p>" +
        "<p>" + esc(p.tagline) + "</p>" +
        "<p>" + esc(p.detail) + "</p>" +
        '<ul class="tech">' + p.tech.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
        cta +
      "</div></article>";
  }

  function renderProjects() {
    var host = document.getElementById("project-list");
    if (!host || typeof PROJECTS === "undefined") return;
    host.innerHTML = PROJECTS.map(projectHTML).join("");
  }

  /* ---------- JSON-LD, generated from the same data ---------- */
  function renderStructuredData() {
    if (typeof PUBLICATIONS === "undefined") return;
    var data = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Mengti Sun",
      url: "https://mengtis.github.io/",
      jobTitle: "Software Development Engineer II",
      worksFor: { "@type": "Organization", name: "Amazon Robotics" },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "University of Pennsylvania" },
        { "@type": "CollegeOrUniversity", name: "University of California, Berkeley" }
      ],
      knowsAbout: [
        "Robotics", "Robot Manipulation", "Contact Dynamics",
        "Computer Vision", "Legged Locomotion", "Machine Learning"
      ],
      sameAs: [
        "https://scholar.google.com/citations?user=hXb_RHoAAAAJ",
        "https://github.com/mengtis",
        "https://openreview.net/profile?id=~Mengti_Sun1",
        "https://www.grasp.upenn.edu/people/mengti-sun/"
      ],
      subjectOf: PUBLICATIONS.map(function (p) {
        return {
          "@type": "ScholarlyArticle",
          name: p.title,
          author: p.authors.map(function (a) { return { "@type": "Person", name: a.n }; }),
          datePublished: String(p.year),
          publisher: { "@type": "Organization", name: p.venue },
          url: (p.links && p.links[0]) ? p.links[0].url : undefined
        };
      })
    };
    var el = document.createElement("script");
    el.type = "application/ld+json";
    el.textContent = JSON.stringify(data);
    document.head.appendChild(el);
  }

  /* ---------- Mobile menu ---------- */
  function initMenu() {
    var btn = document.querySelector(".nav-toggle");
    var list = document.getElementById("nav-links");
    if (!btn || !list) return;

    var mq = window.matchMedia("(max-width: 800px)");
    var sync = function () {
      if (mq.matches) {
        list.hidden = true;
        btn.setAttribute("aria-expanded", "false");
      } else {
        list.hidden = false;
      }
    };
    sync();
    mq.addEventListener("change", sync);

    btn.addEventListener("click", function () {
      var open = list.hidden;
      list.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
    });
    list.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && mq.matches) {
        list.hidden = true;
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Scrollspy ---------- */
  function initScrollspy() {
    var links = Array.prototype.slice.call(document.querySelectorAll("#nav-links a[href^='#']"));
    if (!links.length) return;

    var map = {};
    var sections = [];
    links.forEach(function (a) {
      var el = document.getElementById(a.getAttribute("href").slice(1));
      if (el) { map[el.id] = a; sections.push(el); }
    });

    var setActive = function (id) {
      links.forEach(function (a) {
        a.classList.toggle("active", a.getAttribute("href") === "#" + id);
        if (a.classList.contains("active")) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    };

    var onScroll = function () {
      var line = window.scrollY + (parseFloat(getComputedStyle(document.documentElement)
        .getPropertyValue("--nav-h")) || 60) + 40;
      var current = sections[0];
      sections.forEach(function (s) { if (s.offsetTop <= line) current = s; });
      // pin the last section once the page bottom is reached
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 8) {
        current = sections[sections.length - 1];
      }
      if (current && map[current.id]) setActive(current.id);
    };

    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { onScroll(); ticking = false; });
    }, { passive: true });
    onScroll();
  }

  /* ---------- Theme toggle (overrides the OS preference) ---------- */
  function initTheme() {
    var btn = document.querySelector(".theme-btn");
    if (!btn) return;
    var root = document.documentElement;

    var stored = null;
    try { stored = localStorage.getItem("theme"); } catch (e) { /* private mode */ }
    if (stored === "dark" || stored === "light") root.setAttribute("data-theme", stored);

    var label = function () {
      var dark = root.getAttribute("data-theme") === "dark" ||
        (!root.hasAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
      btn.textContent = dark ? "☀" : "☾";
      btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    };
    label();

    btn.addEventListener("click", function () {
      var dark = root.getAttribute("data-theme") === "dark" ||
        (!root.hasAttribute("data-theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
      var next = dark ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* ignore */ }
      label();
    });
  }

  function init() {
    renderPublications();
    renderProjects();
    renderStructuredData();
    initMenu();
    initScrollspy();
    initTheme();
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
