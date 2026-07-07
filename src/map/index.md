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
</style>

<div class="map-container">
<button class="info-button"><i>i</i></button>

<div class="info-tooltip">
<h4>Map Navigation</h4>
<p>Browse by theme. </p>
<p>For selected theme, browse by Visual Tag window available below the map.  </p>
<p>Click on a map marker to view details about an artwork</p>
</div>
</div>

```js
import * as L from "https://cdn.skypack.dev/leaflet@1.9.4";

// Add Leaflet CSS
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
document.head.appendChild(link);

const data = await FileAttachment("../data/artwork.csv").csv({ typed: true });

const themes = [...new Set(data.map(row => row.Theme).filter(Boolean))].sort();

// State variables
let activeTheme = null;
let activeVisualTag = null;
let markers = [];

// Create main container
const mainContainer = display(document.createElement("div"));
mainContainer.style.maxWidth = "1400px";
mainContainer.style.margin = "0 auto";
mainContainer.style.padding = "0 2rem";
mainContainer.style.width = "100%";

// Helper: get visual tags relevant to current theme (or all if no theme selected)
function getRelevantVisualTags() {
  const subset = activeTheme !== null
    ? data.filter(row => row.Theme === activeTheme)
    : data;
  const all = subset.flatMap(row =>
    row['Visualtags'] ? row['Visualtags'].split(',').map(t => t.trim()).filter(Boolean) : []
  );
  return [...new Set(all)].sort();
}

// Helper: create a filter section with tags
function createFilterSection(labelText, tags, getActive, onAllClick, onTagClick) {
  const section = document.createElement("div");
  section.style.marginBottom = "1rem";
  section.style.padding = "1rem";
  section.style.backgroundColor = "#f5f5f5";
  section.style.borderRadius = "8px";

  const label = document.createElement("div");
  label.textContent = labelText;
  label.style.fontWeight = "bold";
  label.style.marginBottom = "0.75rem";
  label.style.fontSize = "1rem";
  section.appendChild(label);

  const tagContainer = document.createElement("div");
  tagContainer.style.display = "flex";
  tagContainer.style.flexWrap = "wrap";
  tagContainer.style.gap = "0.5rem";

  const allTag = document.createElement("button");
  allTag.textContent = "All";
  allTag.style.padding = "0.5rem 1rem";
  allTag.style.border = "1px solid #0066cc";
  allTag.style.borderRadius = "20px";
  allTag.style.cursor = "pointer";
  allTag.style.fontSize = "0.9rem";
  allTag.style.transition = "all 0.2s";
  allTag.style.backgroundColor = "#0066cc";
  allTag.style.color = "white";

  const tagButtons = {};

  function updateStyles() {
    const active = getActive();
    allTag.style.backgroundColor = active === null ? "#0066cc" : "white";
    allTag.style.color = active === null ? "white" : "#0066cc";
    Object.keys(tagButtons).forEach(key => {
      tagButtons[key].style.backgroundColor = active === key ? "#0066cc" : "white";
      tagButtons[key].style.color = active === key ? "white" : "#0066cc";
    });
  }

  allTag.addEventListener("click", () => {
    onAllClick();
    updateStyles();
    updateMap();
  });
  tagContainer.appendChild(allTag);

  tags.forEach(tag => {
    const btn = document.createElement("button");
    btn.textContent = tag;
    btn.style.padding = "0.5rem 1rem";
    btn.style.border = "1px solid #0066cc";
    btn.style.borderRadius = "20px";
    btn.style.backgroundColor = "white";
    btn.style.color = "#0066cc";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "0.9rem";
    btn.style.transition = "all 0.2s";

    btn.addEventListener("mouseover", () => {
      if (getActive() !== tag) btn.style.backgroundColor = "#e6f2ff";
    });
    btn.addEventListener("mouseout", () => {
      if (getActive() !== tag) btn.style.backgroundColor = "white";
    });
    btn.addEventListener("click", () => {
      onTagClick(tag);
      updateStyles();
      updateMap();
    });

    tagButtons[tag] = btn;
    tagContainer.appendChild(btn);
  });

  section.appendChild(tagContainer);
  section._updateStyles = updateStyles;

  return section;
}

// --- Visual tag section (rebuilt dynamically, only shown once a theme is selected) ---
const visualTagWrapper = document.createElement("div");

function buildVisualTagSection() {
  // Clear out whatever was there before
  visualTagWrapper.innerHTML = "";

  // Hide entirely until a theme has been chosen
  if (activeTheme === null) {
    visualTagWrapper.style.display = "none";
    return;
  }

  visualTagWrapper.style.display = "block";

  const relevantTags = getRelevantVisualTags();

  const section = createFilterSection(
    "Browse by Visual Tag:",
    relevantTags,
    () => activeVisualTag,
    () => { activeVisualTag = null; },
    (tag) => { activeVisualTag = tag; }
  );

  visualTagWrapper.appendChild(section);
}

// --- Theme filter section ---
const themeSection = createFilterSection(
  "Browse by Theme:",
  themes,
  () => activeTheme,
  () => {
    activeTheme = null;
    activeVisualTag = null;  // reset tag when theme cleared
    buildVisualTagSection();
  },
  (tag) => {
    activeTheme = tag;
    activeVisualTag = null;  // reset tag when theme changes
    buildVisualTagSection();
  }
);
mainContainer.appendChild(themeSection);

// Map container
const container = document.createElement("div");
container.style.width = "100%";
container.style.height = "600px";
container.style.marginBottom = "1rem";
mainContainer.appendChild(container);

// Build initial visual tag section (hidden by default, no theme selected yet) and append
buildVisualTagSection();
mainContainer.appendChild(visualTagWrapper);

// Load custom icon
const iconUrl = await FileAttachment("../img/marker-icon.png").url();
const customIcon = L.icon({
  iconUrl: iconUrl,
  iconSize: [20, 23],
  iconAnchor: [12, 31],
  popupAnchor: [1, -34]
});

// Initialize map
const map = L.map(container, {
  worldCopyJump: false,
  maxBounds: [[-90, -180], [90, 180]],
  maxBoundsViscosity: 1.0,
  minZoom: 2
}).setView([40, -95], 4);

L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 18
}).addTo(map);

function updateMap() {
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];

  let filteredData = data;
  if (activeTheme !== null) {
    filteredData = filteredData.filter(row => row.Theme === activeTheme);
  }
  if (activeVisualTag !== null) {
    filteredData = filteredData.filter(row => {
      const tags = row['Visualtags'] ? row['Visualtags'].split(',').map(t => t.trim()) : [];
      return tags.includes(activeVisualTag);
    });
  }

  filteredData.forEach(row => {
    const lat = parseFloat(row.Latitude);
    const lng = parseFloat(row.Longitude);
    if (isNaN(lat) || isNaN(lng)) return;

    const popupContent = `
      <div style="max-width: 300px;">
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

updateMap();
```