---
title: "Map"
toc: false
---

<style>
.map-container {
  position: relative;
  width: 100%;
  margin-bottom: 3rem;
}

.info-button {
  position: absolute;
  top: 0;
  right: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: #d0cdc6;
  color: #0f0f0f;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.3rem;
  z-index: 10;
}

.info-tooltip {
  position: absolute;
  top: 36px;
  right: 0;
  width: 320px;
  max-width: 90vw;
  background: #f8f7f4;
  border: 1px solid #d0cdc6;
  border-radius: 6px;
  padding: 1rem;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #444;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);

  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease;
  z-index: 100;
}

.info-button:hover + .info-tooltip,
.info-tooltip:hover {
  opacity: 1;
  visibility: visible;
}

.info-tooltip h4 {
  margin: 0 0 0.5rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #888;
  font-weight: 600;
}

.info-tooltip p:last-child {
  margin-bottom: 0;
}

.popup-scroll {
  max-height: 250px;
  overflow-y: auto;
}

.filter-box {
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.filter-box label {
  font-weight: bold;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  display: block;
}

.filter-select {
  padding: 0.5rem 1rem;
  border: 1px solid #0066cc;
  border-radius: 8px;
  background-color: white;
  color: #0066cc;
  font-size: 0.9rem;
  cursor: pointer;
  min-width: 220px;
}

.filter-select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0,102,204,0.25);
}

#visual-tag-box {
  display: none;
}

#map-container {
  width: 100%;
  height: 600px;
  margin-bottom: 1rem;
}
</style>

<div class="map-container">
<button class="info-button"><i>i</i></button>

<div class="info-tooltip">
<h4>Map Navigation</h4>
<p>Browse by theme.  For selected theme, browse by Visual Tag </p>
<p>Click on a map marker to view details about an artwork</p>
</div>
</div>

<div class="filter-box">
  <label for="theme-select">Browse by Theme:</label>
  <select id="theme-select" class="filter-select">
    <option value="__all__">All</option>
  </select>
</div>

<div class="filter-box" id="visual-tag-box">
  <label for="tag-select">Browse by Visual Tag:</label>
  <select id="tag-select" class="filter-select">
    <option value="__all__">All</option>
  </select>
</div>

<div id="map-container"></div>

```js
import * as L from "https://cdn.skypack.dev/leaflet@1.9.4";

// Add Leaflet CSS
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
document.head.appendChild(link);

const data = await FileAttachment("../data/artwork.csv").csv({ typed: true });

const themes = [...new Set(data.map(row => row.Theme).filter(Boolean))].sort();

// Grab the HTML elements already defined above
const themeSelect = document.querySelector("#theme-select");
const tagSelect = document.querySelector("#tag-select");
const visualTagBox = document.querySelector("#visual-tag-box");
const mapContainer = document.querySelector("#map-container");

// Populate the theme dropdown
themes.forEach(theme => {
  const opt = document.createElement("option");
  opt.value = theme;
  opt.textContent = theme;
  themeSelect.appendChild(opt);
});

// State
let markers = [];

// Load custom icon
const iconUrl = await FileAttachment("../img/marker-icon.png").url();
const customIcon = L.icon({
  iconUrl: iconUrl,
  iconSize: [20, 23],
  iconAnchor: [12, 31],
  popupAnchor: [0, -34]
});

// Initialize map
const map = L.map(mapContainer, {
  worldCopyJump: false,
  maxBounds: [[-90, -180], [90, 180]],
  maxBoundsViscosity: 1.0,
  minZoom: 2
}).setView([40, -95], 4);

L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 18
}).addTo(map);

// Rebuild the visual tag dropdown options based on the current theme selection
function refreshTagOptions() {
  const activeTheme = themeSelect.value;

  const subset = activeTheme === "__all__"
    ? data
    : data.filter(row => row.Theme === activeTheme);

  const allTags = subset.flatMap(row =>
    row['Visualtags'] ? row['Visualtags'].split(',').map(t => t.trim()).filter(Boolean) : []
  );
  const uniqueTags = [...new Set(allTags)].sort();

  // Clear existing options except "All"
  tagSelect.innerHTML = '<option value="__all__">All</option>';
  uniqueTags.forEach(tag => {
    const opt = document.createElement("option");
    opt.value = tag;
    opt.textContent = tag;
    tagSelect.appendChild(opt);
  });

  // Show/hide the visual tag box depending on whether a theme is selected
  visualTagBox.style.display = activeTheme === "__all__" ? "none" : "block";
  tagSelect.value = "__all__";
}

// Redraw markers on the map based on current filter selections
function updateMap() {
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  const activeTheme = themeSelect.value;
  const activeTag = tagSelect.value;

  let filteredData = data;
  if (activeTheme !== "__all__") {
    filteredData = filteredData.filter(row => row.Theme === activeTheme);
  }
  if (activeTag !== "__all__") {
    filteredData = filteredData.filter(row => {
      const tags = row['Visualtags'] ? row['Visualtags'].split(',').map(t => t.trim()) : [];
      return tags.includes(activeTag);
    });
  }

  filteredData.forEach(row => {
    const lat = parseFloat(row.Latitude);
    const lng = parseFloat(row.Longitude);
    if (isNaN(lat) || isNaN(lng)) return;

    const popupContent = `
      <div class="popup-scroll">
        <div style="max-width: 300px; padding-top:12px;">
          <h3 style="margin-top: 0;">${row.Title || 'Untitled'}</h3>
          ${row.Creator ? `<p style="margin: 0;"><strong>Creator:</strong> ${row.Creator}</p>` : ''}
          ${row['Creation Year'] ? `<p style="margin: 0;"><strong>Year:</strong> ${row['Creation Year']}</p>` : ''}
          ${row.Year ? `<p style="margin: 0;"><strong>Year:</strong> ${row.Year}</p>` : ''}
          ${row.Medium ? `<p style="margin: 0;"><strong>Medium:</strong> ${row.Medium}</p>` : ''}
          ${row.Theme ? `<p style="margin: 0;"><strong>Theme:</strong> ${row.Theme}</p>` : ''}
          ${(row.Location || row.Country) ? `<p style="margin: 0;"><strong>Location:</strong> ${[row.Location, row.Country].filter(Boolean).join(', ')}</p>` : ''}
          ${row.Description ? `<p style="margin: 0;">${row.Description}</p>` : ''}
          ${row['Visualtags'] ? `<p style="margin: 0;"><strong>Tags:</strong> ${row['Visualtags']}</p>` : ''}
          ${row['InfoURL'] ? `<p style="margin: 0;"><a href="${row['InfoURL']}" target="_blank">More Info</a></p>` : ''}
        </div>
      </div>
    `;

    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
    marker.bindPopup(popupContent);
    markers.push(marker);
  });

  if (markers.length > 0) {
    const validCoords = filteredData
      .filter(row => !isNaN(parseFloat(row.Latitude)) && !isNaN(parseFloat(row.Longitude)))
      .map(row => [parseFloat(row.Latitude), parseFloat(row.Longitude)]);
    if (validCoords.length > 0) {
      map.fitBounds(L.latLngBounds(validCoords), { padding: [50, 50] });
    }
  }
}

// Wire up event listeners directly
themeSelect.addEventListener("change", () => {
  refreshTagOptions();
  updateMap();
});

tagSelect.addEventListener("change", () => {
  updateMap();
});

// Initial render
refreshTagOptions();
updateMap();
```