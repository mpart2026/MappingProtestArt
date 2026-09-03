// See https://observablehq.com/framework/config for documentation.
export default {
  // The app's title; used in the sidebar and webpage titles.
  title: "Mapping Protest Art",
  
  // Base path for GitHub Pages deployment - CHANGED from basePath to base
  base: "/MappingProtestArt",
  
  // The pages and sections in the sidebar. If you don't specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  pages: [
    { name: "Home", path: "home/index", open: false },
    { name: "Map", path: "map/index", open: false },
    { name: "Collection", path: "collection/index", open: false },
    { name: "Visualizations", path: "visualizations/index", open: false },
    { name: "About Us", path: "contact/index", open: false }
  ],
  
  // Content to add to the head of the page, e.g. for a favicon:
  head: `
    <link rel="icon" href="observable.png" type="image/png" sizes="32x32">
    <style>
      #observablehq-header {
        display: flex;
        min-height: 82px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;

        width: auto !important;
        max-width: none !important;

        /* Keep the header above page content */
        position: static !important;
        z-index: 1000 !important;

        top: 0;
        padding: 2rem 1rem;
        background: #000;

        box-shadow: none !important;
        border-bottom: none !important;
      }

      /* Keep the main page content below the header */
      #observablehq-main {
        position: relative;
        z-index: 1;
        width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
        padding: 0 !important;;
        padding-top: 0.5rem;
      }

      .observablehq {
        width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
        padding: 0 !important;
      }

      #observablehq-center {
        padding-right: 1rem !important;
      }


      /* =========================
        Header / Logo
        ========================= */

      .header-top {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0;

        position: relative;
        z-index: 1001;
      }

      .header-logo {
        height: 98px;
        width: auto;
        cursor: pointer;
      }

      .header-title {
        font-size: 2rem;
        font-family: var(--sans-serif, inherit);
        font-weight: 600;
        margin: 0;
        color: #cfb6b6;
      }

      .header-link {
        display: flex;
        align-items: center;
        gap: 0.75rem;

        position: relative;
        z-index: 1002;

        text-decoration: none;
        color: inherit;
      }

      .header-link:hover {
        opacity: 0.8;
      }


      /* =========================
        Navigation
        ========================= */

      #observablehq-header nav {
        display: flex;
        gap: 1rem;
        align-items: center;
        padding: 0;
        width: auto;
        justify-content: flex-end;
        flex-shrink: 1;
      }

      #observablehq-header nav a {
        display: inline-block;
        z-index: 1002;

        padding: 0.5rem 0.5rem;

        color: #cfb6b6 !important;
        font-family: var(--sans-serif, inherit);
        font-size: 1rem;

        text-decoration: none;

        /* Make sure page elements cannot intercept the click */
        pointer-events: auto !important;
      }

      #observablehq-header nav a:hover {
        text-decoration: underline;
      }

      #observablehq-header nav a.active-nav {
        color: #dc1616 !important;
        font-family: var(--sans-serif, inherit);
        font-size: 1rem;
        font-weight: 700;
      }


      /* =========================
        Back to Top
        ========================= */

      #back-to-top {
        position: fixed;
        bottom: 1.5rem;
        right: 1.5rem;

        width: 44px;
        height: 44px;

        border-radius: 50%;
        background: #1a1a1a;
        color: white;
        border: none;

        cursor: pointer;

        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 1.3rem;

        box-shadow: 0 2px 8px rgba(0,0,0,0.25);

        opacity: 0;
        visibility: hidden;

        transition:
          opacity 0.25s,
          visibility 0.25s,
          transform 0.2s;

        z-index: 2000;
      }

      #back-to-top.visible {
        opacity: 1;
        visibility: visible;
      }

      #back-to-top:hover {
        transform: translateY(-3px);
        background: #333;
      }


      /* =========================
        Responsive Header
        ========================= */

      @media (max-width: 900px) {

        #observablehq-header {
          position: static !important;
          display: flex !important;
          flex-direction: column;
          align-items: flex-start;
          widht: 100% !important;
          padding: 0.75rem 1rem;
          min-height: 0;
        }

          #observablehq-main {
          padding-top: 1rem;         
          }

        .header-top {
          width: 100%;
          }

          .header-logo {
          height: 48px;        
          }

        .header-title {
          font-size: 1.4rem;
        }

        #observablehq-header nav {
          width: 100%;
          flex-wrap: wrap;
          gap: 0.75rem 1rem;
          justify-content: flex-start;
          padding-top: 0.5rem;
        }

        #observablehq-header nav a {
          padding: 0.25rem 0 !important;
          font-size: 0.9rem;
        }
      }


      /* =========================
        Dropdown
        ========================= */

      .dropdown {
        position: relative;
        display: inline-block;
      }

      .dropdown-toggle {
        background: none;
        border: none;
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        cursor: pointer;
        padding: 0.5rem 1rem;
        text-decoration: none;
      }

      .dropdown-toggle:hover {
        text-decoration: underline;
      }

      .dropdown-menu {
        display: none;

        position: absolute;
        top: 100%;
        left: 0;

        background: var(--theme-background, white);

        border: 1px solid var(--theme-foreground-faint, #ccc);
        border-radius: 4px;

        min-width: 160px;

        box-shadow: 0 2px 8px rgba(0,0,0,0.15);

        z-index: 1100;

        margin-top: 0.25rem;
      }

      .dropdown-menu.show {
        display: block;
      }

      .dropdown-menu a {
        display: block;
        padding: 0.5rem 1rem;

        text-decoration: none;
        color: inherit;

        white-space: nowrap;
      }

      .dropdown-menu a:hover {
        background: var(--theme-foreground-faintest, #f5f5f5);
      }


      /* =========================
        Footer
        ========================= */

      .site-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        margin-top: 4rem;
        padding: 1.5rem 0;

        border-top: 1px solid #d0cdc6;

        font-size: 0.9rem;
        color: #666;
      }

      .footer-logo {
        height: 40px;
        width: auto;
      }

      @media (max-width: 768px) {

        .site-footer {
          flex-direction: column;
          text-align: center;
          gap: 0.5rem;
        }

        .footer-logo {
          height: 32px;
        }
      }

    </style>

    <button id="back-to-top" aria-label="Back to top">↑</button>

    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const dropdowns = document.querySelectorAll('.dropdown');

        dropdowns.forEach(dropdown => {
          const toggle = dropdown.querySelector('.dropdown-toggle');
          const menu = dropdown.querySelector('.dropdown-menu');

          if (!toggle || !menu) return;

          toggle.addEventListener('click', function(e) {
            e.stopPropagation();

            document.querySelectorAll('.dropdown-menu').forEach(m => {
              if (m !== menu) m.classList.remove('show');
            });

            menu.classList.toggle('show');
          });
        });

        document.addEventListener('click', function() {
          document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
          });
        });

        // Back to top button
        const backToTopBtn = document.getElementById('back-to-top');

        if (backToTopBtn) {
          window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
              backToTopBtn.classList.add('visible');
            } else {
              backToTopBtn.classList.remove('visible');
            }
          });

          backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        }
      });

    </script>

    <script>
      document.addEventListener('DOMContentLoaded', () => {
        const path = location.pathname.replace(/\\/+$/, '') || '/';

        document.querySelectorAll('#observablehq-header nav a').forEach(link => {
          const linkPath = new URL(link.href).pathname.replace(/\\/+$/, '') || '/';
          if (path === linkPath) link.classList.add('active-nav');
        });
      });
    </script>

  `,
  
  // The path to the source root.
  root: "src",
  
  // Disable the sidebar and add a custom header with navigation
  sidebar: false,
  
  header: `

    <div class="header-top">
      <a href="/home/" class="header-link">
        <img src="img/mpalogo.png" alt="Logo" class="header-logo" width="78" height="78">
        <h1 class="header-title">Mapping Protest Art</h1>
      </a>
    </div>
 
    <nav>
      
      <a href="home/" style="padding: 0.5rem 1rem; text-decoration: none; color: inherit;">Home</a>

      <a href="map/" style="padding: 0.5rem 1rem; text-decoration: none; color: inherit;">Map</a>

      <a href="collection/" style="padding: 0.5rem 1rem; text-decoration: none; color: inherit;">Collection</a>
           
      <a href="visualizations/" style="padding: 0.5rem 1rem; text-decoration: none; color: inherit;">Visualizations</a>

      <a href="contact/" style="padding: 0.5rem 1rem; text-decoration: none; color: inherit;">About Us</a>

    </nav>
  `,
  
  footer: `
  <footer class="site-footer">
    <img src="img/gc-logo.jpg" alt="CUNY Graduate Center" class="footer-logo">
    <span>© 2026 Mapping Protest Art</span>
  </footer>
`,

  pager: false,
  toc: false,
};
