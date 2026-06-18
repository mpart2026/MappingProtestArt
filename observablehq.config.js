export default {
  title: "Mapping Protest Art",
  base: "/MappingProtestArt",
  pages: [
    { name: "Home", path: "home/", open: false },
    { name: "Map", path: "map/", open: false },
    { name: "Collection", path: "collection/", open: false },
    { name: "Visualizations", path: "visualizations/", open: false },
    { name: "About Us", path: "contact/", open: false }
  ],

  head: `
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="observable.png" type="image/png" sizes="32x32">
    <style>
      #observablehq-header {
        display: flex;
        flex-direction: column;
        background: #bbe71a !important;
        padding: 0.75rem 1rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        position: relative;
        z-index: 1000;
      }

      .header-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }

      .header-link {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        text-decoration: none;
        color: inherit;
      }

      .header-link:hover { opacity: 0.8; }

      .header-logo {
        height: 40px;
        width: auto;
      }

      .header-title {
        font-size: 1.75rem;
        font-weight: 600;
        margin: 0;
        white-space: nowrap;
      }

      /* Desktop nav */
      #observablehq-header nav {
        display: flex;
        flex-wrap: nowrap;
        gap: 0.25rem;
        align-items: center;
        border-top: 1px solid rgba(0,0,0,0.15);
        margin-top: 0.75rem;
        padding-top: 0.75rem;
        justify-content: center;
      }

      #observablehq-header nav a {
        padding: 0.4rem 0.75rem;
        text-decoration: none;
        color: inherit;
        white-space: nowrap;
        font-size: 1rem;
        border-radius: 4px;
      }

      #observablehq-header nav a:hover {
        background: rgba(0,0,0,0.1);
      }

      /* Hamburger button — hidden on desktop */
      .hamburger {
        display: none;
        flex-direction: column;
        gap: 5px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
      }

      .hamburger span {
        display: block;
        width: 24px;
        height: 2px;
        background: currentColor;
        border-radius: 2px;
        transition: all 0.2s;
      }

      /* Mobile nav drawer — hidden by default */
      .mobile-nav {
        display: none;
        flex-direction: column;
        gap: 0;
        margin-top: 0.75rem;
        border-top: 1px solid rgba(0,0,0,0.15);
        padding-top: 0.5rem;
      }

      .mobile-nav.open {
        display: flex;
      }

      .mobile-nav a {
        padding: 0.6rem 0.5rem;
        text-decoration: none;
        color: inherit;
        font-size: 1rem;
        border-bottom: 1px solid rgba(0,0,0,0.08);
      }

      .mobile-nav a:hover {
        background: rgba(0,0,0,0.08);
      }

      /* Main content */
      #observablehq-main {
        padding-top: 2rem;
      }

      .observablehq {
        max-width: 100% !important;
        padding-left: 1rem !important;
        padding-right: 1rem !important;
      }

      /* ── MOBILE ── */
      @media (max-width: 768px) {
        .header-title {
          font-size: 1.1rem;
        }

        .header-logo {
          height: 28px;
        }

        /* Hide desktop nav, show hamburger */
        #observablehq-header nav {
          display: none;
        }

        .hamburger {
          display: flex;
        }
      }
    </style>
  `,

  root: "src",
  sidebar: false,

  header: `
    <div class="header-top">
      <a href="/home/" class="header-link">
        <img src="img/mpalogo.png" alt="" class="header-logo">
        <h1 class="header-title">Mapping Protest Art</h1>
        <img src="img/mpalogoflip.png" alt="" class="header-logo">
      </a>
      <button class="hamburger" id="hamburger-btn" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Desktop nav -->
    <nav>
      <a href="/home/">Home</a>
      <a href="/map/">Map</a>
      <a href="/collection/">Collection</a>
      <a href="/visualizations/">Visualizations</a>
      <a href="/contact/">About Us</a>
    </nav>

    <!-- Mobile nav drawer -->
    <div class="mobile-nav" id="mobile-nav">
      <a href="/home/">Home</a>
      <a href="/map/">Map</a>
      <a href="/collection/">Collection</a>
      <a href="/visualizations/">Visualizations</a>
      <a href="/contact/">About Us</a>
    </div>

    <script>
      document.getElementById('hamburger-btn').addEventListener('click', function() {
        document.getElementById('mobile-nav').classList.toggle('open');
      });
    </script>
  `,

  pager: false,
  toc: false,
};