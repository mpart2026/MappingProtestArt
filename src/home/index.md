---
title: "Home"
toc: true
---
```js
// Load data to show statistics
const data = await FileAttachment("../data/artwork.csv").csv({ typed: true });

// Create main container
const container = display(document.createElement("div"));
container.style.maxWidth = "1200px";
container.style.margin = "0 auto";
container.style.padding = "2rem";
container.style.fontFamily = "system-ui, -apple-system, sans-serif";

// Add welcome header
const header = document.createElement("h1");
header.textContent = "Welcome to the Artwork Collection";
header.style.marginBottom = "1rem";
header.style.textAlign = "center";
header.style.color = "#333";
container.appendChild(header);

// Add subtitle
const subtitle = document.createElement("p");
subtitle.textContent = "Explore our collection through the map or browse by themes and categories";
subtitle.style.textAlign = "center";
subtitle.style.color = "#666";
subtitle.style.fontSize = "1.1rem";
subtitle.style.marginBottom = "3rem";
container.appendChild(subtitle);

// Create widgets container
const widgetsContainer = document.createElement("div");
widgetsContainer.style.display = "grid";
widgetsContainer.style.gridTemplateColumns = "repeat(auto-fit, minmax(300px, 1fr))";
widgetsContainer.style.gap = "2rem";
widgetsContainer.style.marginBottom = "3rem";

// Calculate statistics
const totalArtworks = data.length;
const uniqueThemes = [...new Set(data.map(row => row.Theme).filter(Boolean))].length;
const uniqueCreators = [...new Set(data.map(row => row.Creator).filter(Boolean))].length;

// Widget 1: Map View
const mapWidget = document.createElement("div");
mapWidget.style.backgroundColor = "#f8f9fa";
mapWidget.style.padding = "2rem";
mapWidget.style.borderRadius = "12px";
mapWidget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
mapWidget.style.cursor = "pointer";
mapWidget.style.transition = "transform 0.2s, box-shadow 0.2s";
mapWidget.style.border = "2px solid transparent";

mapWidget.addEventListener("mouseover", () => {
  mapWidget.style.transform = "translateY(-5px)";
  mapWidget.style.boxShadow = "0 8px 12px rgba(0,0,0,0.15)";
  mapWidget.style.borderColor = "#0066cc";
});

mapWidget.addEventListener("mouseout", () => {
  mapWidget.style.transform = "translateY(0)";
  mapWidget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
  mapWidget.style.borderColor = "transparent";
});

mapWidget.addEventListener("click", () => {
  window.location.href = "../Map/index";
});

const mapIcon = document.createElement("div");
mapIcon.innerHTML = "🗺️";
mapIcon.style.fontSize = "3rem";
mapIcon.style.marginBottom = "1rem";
mapWidget.appendChild(mapIcon);

const mapTitle = document.createElement("h2");
mapTitle.textContent = "Explore Map";
mapTitle.style.marginTop = "0";
mapTitle.style.marginBottom = "0.5rem";
mapTitle.style.color = "#0066cc";
mapWidget.appendChild(mapTitle);

const mapDesc = document.createElement("p");
mapDesc.textContent = `View ${totalArtworks} artworks on an interactive map. Filter by theme and explore geographical locations.`;
mapDesc.style.color = "#666";
mapDesc.style.lineHeight = "1.6";
mapWidget.appendChild(mapDesc);

const mapButton = document.createElement("div");
mapButton.textContent = "View Map →";
mapButton.style.marginTop = "1rem";
mapButton.style.color = "#0066cc";
mapButton.style.fontWeight = "bold";
mapWidget.appendChild(mapButton);

widgetsContainer.appendChild(mapWidget);

// Widget 2: Collections View
const collectionsWidget = document.createElement("div");
collectionsWidget.style.backgroundColor = "#f8f9fa";
collectionsWidget.style.padding = "2rem";
collectionsWidget.style.borderRadius = "12px";
collectionsWidget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
collectionsWidget.style.cursor = "pointer";
collectionsWidget.style.transition = "transform 0.2s, box-shadow 0.2s";
collectionsWidget.style.border = "2px solid transparent";

collectionsWidget.addEventListener("mouseover", () => {
  collectionsWidget.style.transform = "translateY(-5px)";
  collectionsWidget.style.boxShadow = "0 8px 12px rgba(0,0,0,0.15)";
  collectionsWidget.style.borderColor = "#0066cc";
});

collectionsWidget.addEventListener("mouseout", () => {
  collectionsWidget.style.transform = "translateY(0)";
  collectionsWidget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
  collectionsWidget.style.borderColor = "transparent";
});

collectionsWidget.addEventListener("click", () => {
  window.location.href = "../collection/index";
});

const collectionsIcon = document.createElement("div");
collectionsIcon.innerHTML = "📚";
collectionsIcon.style.fontSize = "3rem";
collectionsIcon.style.marginBottom = "1rem";
collectionsWidget.appendChild(collectionsIcon);

const collectionsTitle = document.createElement("h2");
collectionsTitle.textContent = "Browse Collections";
collectionsTitle.style.marginTop = "0";
collectionsTitle.style.marginBottom = "0.5rem";
collectionsTitle.style.color = "#0066cc";
collectionsWidget.appendChild(collectionsTitle);

const collectionsDesc = document.createElement("p");
collectionsDesc.textContent = `Browse ${totalArtworks} artworks organized by theme. Sort by title, creator, or year.`;
collectionsDesc.style.color = "#666";
collectionsDesc.style.lineHeight = "1.6";
collectionsWidget.appendChild(collectionsDesc);

const collectionsButton = document.createElement("div");
collectionsButton.textContent = "Browse Collections →";
collectionsButton.style.marginTop = "1rem";
collectionsButton.style.color = "#0066cc";
collectionsButton.style.fontWeight = "bold";
collectionsWidget.appendChild(collectionsButton);

widgetsContainer.appendChild(collectionsWidget);

container.appendChild(widgetsContainer);

// Add statistics section
const statsSection = document.createElement("div");
statsSection.style.backgroundColor = "#fff";
statsSection.style.padding = "2rem";
statsSection.style.borderRadius = "12px";
statsSection.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
statsSection.style.marginTop = "2rem";

const statsTitle = document.createElement("h2");
statsTitle.textContent = "Collection Overview";
statsTitle.style.marginTop = "0";
statsTitle.style.marginBottom = "1.5rem";
statsTitle.style.textAlign = "center";
statsTitle.style.color = "#333";
statsSection.appendChild(statsTitle);

const statsGrid = document.createElement("div");
statsGrid.style.display = "grid";
statsGrid.style.gridTemplateColumns = "repeat(auto-fit, minmax(150px, 1fr))";
statsGrid.style.gap = "2rem";
statsGrid.style.textAlign = "center";

const stats = [
  { label: "Total Artworks", value: totalArtworks, color: "#0066cc" },
  { label: "Themes", value: uniqueThemes, color: "#28a745" },
  { label: "Creators", value: uniqueCreators, color: "#dc3545" }
];

stats.forEach(stat => {
  const statItem = document.createElement("div");
  
  const statValue = document.createElement("div");
  statValue.textContent = stat.value;
  statValue.style.fontSize = "2.5rem";
  statValue.style.fontWeight = "bold";
  statValue.style.color = stat.color;
  statValue.style.marginBottom = "0.5rem";
  statItem.appendChild(statValue);
  
  const statLabel = document.createElement("div");
  statLabel.textContent = stat.label;
  statLabel.style.color = "#666";
  statLabel.style.fontSize = "0.9rem";
  statLabel.style.textTransform = "uppercase";
  statLabel.style.letterSpacing = "1px";
  statItem.appendChild(statLabel);
  
  statsGrid.appendChild(statItem);
});

statsSection.appendChild(statsGrid);
container.appendChild(statsSection);
```
