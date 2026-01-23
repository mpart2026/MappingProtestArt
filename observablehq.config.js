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
    { name: "Contact", path: "contact/index", open: false }
  ],
  
  // Content to add to the head of the page, e.g. for a favicon:
  head: `
    <link rel="icon" href="observable.png" type="image/png" sizes="32x32">
    <style>
      #observablehq-header {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        position: static !important;
        top: 0;
        background: var(--theme-background, white);
        z-index: 1000;
        padding-bottom: 1rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      
      .observablehq {
        max-width: 100% !important;
        margin-left: auto !important;
        margin-right: auto !important;
        padding-left: 1rem !important;
        padding-right: 1rem !important;
      }
      
      #observablehq-center {
        padding-right: 1rem !important;
      }

      #observablehq-main {
        padding-top: 2rem;
      }
      
      .header-top {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.5rem 0;
      }
      
      .header-logo {
        height: 48px;
        width: auto;
        cursor: pointer;
      }
      
      .header-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
      }
      
      .header-link {
        display: flex;
        align-items: center;
        gap: 1rem;
        text-decoration: none;
        color: inherit;
        transition: opacity 0.2s;
      }
      
      .header-link:hover {
        opacity: 0.8;
      }
      
      #observablehq-header nav {
        display: flex;
        gap: 2rem;
        align-items: center;
        border-top: 1px solid var(--theme-foreground-faint, #ccc);
        padding-top: 1rem;
      }
      
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
        z-index: 1000;
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
    </style>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
          const toggle = dropdown.querySelector('.dropdown-toggle');
          const menu = dropdown.querySelector('.dropdown-menu');
          
          toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            // Close all other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(m => {
              if (m !== menu) m.classList.remove('show');
            });
            // Toggle this dropdown
            menu.classList.toggle('show');
          });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function() {
          document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
          });
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
      <a href="./home/index" class="header-link">
        <img src="./mpalogo.png" alt="Logo" class="header-logo">
        <h1 class="header-title">Mapping Protest Art</h1>
      </a>
    </div>
    <nav>
      
      <a href="./home/index" style="padding: 0.5rem 1rem; text-decoration: none; color: inherit;">Home</a>

      <a href="./map/index" style="padding: 0.5rem 1rem; text-decoration: none; color: inherit;">Map</a>

      <a href="./collection/index" style="padding: 0.5rem 1rem; text-decoration: none; color: inherit;">Collection</a>
           
      <a href="./visualizations/index" style="padding: 0.5rem 1rem; text-decoration: none; color: inherit;">Visualizations</a>

      <a href="./contact/index" style="padding: 0.5rem 1rem; text-decoration: none; color: inherit;">Contact</a>

    </nav>
  `,
  
  pager: false,
  toc: false,
};