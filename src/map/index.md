---
title: "Map"
toc: true
---
```js
import * as L from "https://cdn.skypack.dev/leaflet@1.9.4";

// Add Leaflet CSS
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
document.head.appendChild(link);

// Load and parse CSV file using FileAttachment
const data = await FileAttachment("../data/artwork.csv").csv({ typed: true });

// Extract unique themes
const themes = [...new Set(data.map(row => row.Theme).filter(Boolean))].sort();

// State variable
let activeTheme = null;
let markers = [];

// Create main container
const mainContainer = display(document.createElement("div"));
mainContainer.style.maxWidth = "1400px";
mainContainer.style.margin = "0 auto";
mainContainer.style.padding = "0 2rem";
mainContainer.style.width = "100%";
// mainContainer.style.width = "70vw";
// mainContainer.style.paddingLeft = "15rem";
// mainContainer.style.paddingRight = "2rem";

// Create theme filter section
const filterSection = document.createElement("div");
filterSection.style.marginBottom = "1rem";
filterSection.style.padding = "1rem";
filterSection.style.backgroundColor = "#f5f5f5";
filterSection.style.borderRadius = "8px";

const filterLabel = document.createElement("div");
filterLabel.textContent = "Browse by Theme:";
filterLabel.style.fontWeight = "bold";
filterLabel.style.marginBottom = "0.75rem";
filterLabel.style.fontSize = "1rem";
filterSection.appendChild(filterLabel);

const tagContainer = document.createElement("div");
tagContainer.style.display = "flex";
tagContainer.style.flexWrap = "wrap";
tagContainer.style.gap = "0.5rem";

// Create "All" tag
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

allTag.addEventListener("click", () => {
  activeTheme = null;
  updateMap();
  updateTagStyles();
});

tagContainer.appendChild(allTag);

// Create theme tags
const themeTags = {};
themes.forEach(theme => {
  const tag = document.createElement("button");
  tag.textContent = theme;
  tag.style.padding = "0.5rem 1rem";
  tag.style.border = "1px solid #0066cc";
  tag.style.borderRadius = "20px";
  tag.style.backgroundColor = "white";
  tag.style.color = "#0066cc";
  tag.style.cursor = "pointer";
  tag.style.fontSize = "0.9rem";
  tag.style.transition = "all 0.2s";
  
  tag.addEventListener("mouseover", () => {
    if (activeTheme !== theme) {
      tag.style.backgroundColor = "#e6f2ff";
    }
  });
  
  tag.addEventListener("mouseout", () => {
    if (activeTheme !== theme) {
      tag.style.backgroundColor = "white";
    }
  });
  
  tag.addEventListener("click", () => {
    activeTheme = theme;
    updateMap();
    updateTagStyles();
  });
  
  themeTags[theme] = tag;
  tagContainer.appendChild(tag);
});

filterSection.appendChild(tagContainer);
mainContainer.appendChild(filterSection);

// Create map container
const container = document.createElement("div");
container.style.width = "100%";
container.style.height = "600px";
mainContainer.appendChild(container);

// Load custom icon
const iconUrl = await FileAttachment("../img/marker-icon.png").url();
const customIcon = L.icon({
  iconUrl: iconUrl,
  iconSize: [25, 31],
  iconAnchor: [12, 31],
  popupAnchor: [1, -34]
});

// Initialize the map
const map = L.map(container).setView([40, -95], 4);

// Add OpenStreetMap tiles
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//   maxZoom: 19,
//   noWrap: true
// }).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 18
}).addTo(map);

function updateTagStyles() {
  allTag.style.backgroundColor = activeTheme === null ? "#0066cc" : "white";
  allTag.style.color = activeTheme === null ? "white" : "#0066cc";
  
  Object.keys(themeTags).forEach(theme => {
    const tag = themeTags[theme];
    tag.style.backgroundColor = activeTheme === theme ? "#0066cc" : "white";
    tag.style.color = activeTheme === theme ? "white" : "#0066cc";
  });
}

function updateMap() {
  // Clear existing markers
  markers.forEach(marker => map.removeLayer(marker));
  markers = [];
  
  // Filter data based on active theme
  const filteredData = activeTheme === null 
    ? data 
    : data.filter(row => row.Theme === activeTheme);
  
  // Create markers for filtered data
  filteredData.forEach(row => {
    const lat = parseFloat(row.Latitude);
    const lng = parseFloat(row.Longitude);
    
    // Skip rows with invalid coordinates
    if (isNaN(lat) || isNaN(lng)) return;
    
    // Create popup content
    const popupContent = `
      <div style="max-width: 300px;">
        <h3 style="margin-top: 0;">${row.Title || 'Untitled'}</h3>
        ${row.Creator ? `<p style="margin: 0;"><strong>Creator:</strong> ${row.Creator}</p>` : ''}
        ${row['Creation Year'] ? `<p style="margin: 0;"><strong>Year:</strong> ${row['Creation Year']}</p>` : ''}
        ${row.Material ? `<p style="margin: 0;"><strong>Material:</strong> ${row.Material}</p>` : ''}
        ${row.Medium ? `<p style="margin: 0;"><strong>Medium:</strong> ${row.Medium}</p>` : ''}
        ${row.Theme ? `<p style="margin: 0;"><strong>Theme:</strong> ${row.Theme}</p>` : ''}
        ${row.Location ? `<p style="margin: 0;"><strong>Location:</strong> ${row.Location}</p>` : ''}
        ${row.Description ? `<p style="margin: 0;">${row.Description}</p>` : ''}
        ${row['Visual Tags'] ? `<p style="margin: 0;"><em>Tags: ${row['Visual Tags']}</em></p>` : ''}
        ${row['InfoURL'] ? `<p style="margin: 0;"><a href="${row['InfoURL']}" target="_blank">More Info</a></p>` : ''}
      </div>
    `;
    
    // Create marker and add to map
    const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
    marker.bindPopup(popupContent);
    markers.push(marker);
  });
  
  // Fit map to show all visible markers
  if (markers.length > 0) {
    const validCoords = filteredData
      .filter(row => !isNaN(parseFloat(row.Latitude)) && !isNaN(parseFloat(row.Longitude)))
      .map(row => [parseFloat(row.Latitude), parseFloat(row.Longitude)]);
    
    if (validCoords.length > 0) {
      const bounds = L.latLngBounds(validCoords);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }
}

// Initial map display with all markers
updateMap();
```