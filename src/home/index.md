---
title: "Home"
toc: true
---
```js
// Load data to show statistics
const data = await FileAttachment("../data/artwork.csv").csv({ typed: true });
// Calculate statistics
const totalArtworks = data.length;
const uniqueThemes = [...new Set(data.map(row => row.Theme).filter(Boolean))].length;
const uniqueCreators = [...new Set(data.map(row => row.Creator).filter(Boolean))].length;
```

# Welcome to the Protest Art Collection

Explore our collection through the map or browse by themes and categories

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin: 3rem 0;">
  <a href="../map/index" style="text-decoration: none; color: inherit;">
    <div style="background: #f8f9fa; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 2px solid transparent; transition: all 0.2s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 12px rgba(0,0,0,0.15)'; this.style.borderColor='#0066cc';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'; this.style.borderColor='transparent';">
      <div style="font-size: 3rem; margin-bottom: 1rem;">🗺️</div>
      <h2 style="margin: 0 0 0.5rem 0; color: #0066cc; font-size: 1.5rem;">Explore Map</h2>
      <p style="color: #666; line-height: 1.6; margin: 0 0 1rem 0; font-size: 1rem;">View ${totalArtworks} artworks on an interactive map. <br>Filter by theme and explore geographical locations.</p> 
      <div style="color: #0066cc; font-weight: bold; font-size: 1rem;">View Map →</div>
    </div>
  </a>

  <a href="../collection/index" style="text-decoration: none; color: inherit;">
    <div style="background: #f8f9fa; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 2px solid transparent; transition: all 0.2s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 12px rgba(0,0,0,0.15)'; this.style.borderColor='#0066cc';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'; this.style.borderColor='transparent';">
      <div style="font-size: 3rem; margin-bottom: 1rem;">📚</div>
      <h2 style="margin: 0 0 0.5rem 0; color: #0066cc; font-size: 1.5rem;">Browse Collections</h2>
      <p style="color: #666; line-height: 1.6; margin: 0 0 1rem 0; font-size: 1rem;">Browse the collection organized by theme. <br> Sort by title, creator, or year.</p> <br>
      <div style="color: #0066cc; font-weight: bold; font-size: 1rem;">Browse Collections →</div>
    </div>
  </a>

  <a href="../visualizations/index" style="text-decoration: none; color: inherit;">
    <div style="background: #f8f9fa; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 2px solid transparent; transition: all 0.2s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 12px rgba(0,0,0,0.15)'; this.style.borderColor='#0066cc';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(0,0,0,0.1)'; this.style.borderColor='transparent';">
      <div style="font-size: 3rem; margin-bottom: 1rem;">📊</div>
      <h2 style="margin: 0 0 0.5rem 0; color: #0066cc; font-size: 1.5rem;">View Visualizations</h2>
      <p style="color: #666; line-height: 1.6; margin: 0 0 1rem 0; font-size: 1rem;">Explore data visualizations including geographic distributions, theme breakdowns, and space descriptions.</p>
      <div style="color: #0066cc; font-weight: bold; font-size: 1rem;">View Charts →</div>
    </div>
  </a>
</div>

<h2>Collection Overview </h2>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 2rem; text-align: center; background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-top: 2rem;">
  <div>
    <div style="font-size: 2.5rem; font-weight: bold; color: #0066cc; margin-bottom: 0.5rem;">${totalArtworks}</div>
    <div style="color: #666; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">Total Artworks</div>
  </div>
  <div>
    <div style="font-size: 2.5rem; font-weight: bold; color: #28a745; margin-bottom: 0.5rem;">${uniqueThemes}</div>
    <div style="color: #666; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">Themes</div>
  </div>
  <div>
    <div style="font-size: 2.5rem; font-weight: bold; color: #dc3545; margin-bottom: 0.5rem;">${uniqueCreators}</div>
    <div style="color: #666; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">Creators</div>
  </div>
</div>