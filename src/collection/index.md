---
title: "Collection"
toc: false
---

<style>
.collection-container {
  position: relative;
  width: 100%;
  margin-bottom: 0.25rem;
  z-index: 100;
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
  z-index: 100;
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

#collection-container {
  width: 100%;
  height: 1px;
  margin-bottom: 0;
  position: relative;
  z-index: 1;
}

</style>

<div class="collection-container">
  <button class="info-button"><i>i</i></button>

  <div class="info-tooltip">
  <h4>Browse Collection</h4>
  <p>Browse by theme.  Sort by Title, Creator or Year. Click the same attribute again to toggle between ascending and descending order. Click an artwork title to view its details.</p>
  </div>
  <div id="collection-container"></div>
</div>

```js
// Load and parse CSV file using FileAttachment
const data = await FileAttachment("../data/artwork.csv").csv({ typed: true });

// Create container for the collection
const container = display(document.createElement("div"));
container.style.maxWidth = "100%";
container.style.margin = "0 auto";
container.style.padding = "0 2rem 2rem 2rem";
container.style.fontFamily = "system-ui, -apple-system, sans-serif";

// Add a header
const header = document.createElement("h1");
header.textContent = "Artwork Collection";
header.style.marginBottom = "1rem";
header.style.paddingBottom = "1rem";
container.appendChild(header);

// Add a divider line that matches the width of the controls below
const divider = document.createElement("div");
divider.style.borderBottom = "2px solid #333";
divider.style.marginBottom = "1rem";
divider.style.marginLeft = "-1rem";  // Compensate for container padding
divider.style.marginRight = "-1rem"; // Compensate for container padding
container.appendChild(divider);

// State variables
let activeTheme = null;
let sortBy = "title";
let sortDirection = "asc";

// Extract unique themes
const themes = [...new Set(data.map(row => row.Theme).filter(Boolean))].sort();

// Create controls container
const controlsContainer = document.createElement("div");
controlsContainer.style.marginBottom = "2rem";

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
  updateDisplay();
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
    updateDisplay();
    updateTagStyles();
  });
  
  themeTags[theme] = tag;
  tagContainer.appendChild(tag);
});

filterSection.appendChild(tagContainer);
controlsContainer.appendChild(filterSection);

// Create sort section
const sortSection = document.createElement("div");
sortSection.style.padding = "1rem";
sortSection.style.backgroundColor = "#f5f5f5";
sortSection.style.borderRadius = "8px";

const sortLabel = document.createElement("div");
sortLabel.textContent = "Sort by:";
sortLabel.style.fontWeight = "bold";
sortLabel.style.marginBottom = "0.75rem";
sortSection.appendChild(sortLabel);

const sortButtonsContainer = document.createElement("div");
sortButtonsContainer.style.display = "flex";
sortButtonsContainer.style.gap = "0.5rem";
sortButtonsContainer.style.flexWrap = "wrap";

const sortOptions = [
  { value: "title", label: "Title" },
  { value: "creator", label: "Creator" },
  { value: "year", label: "Year" }
];

const sortButtons = {};

sortOptions.forEach(option => {
  const button = document.createElement("button");
  button.textContent = option.label;
  button.style.padding = "0.5rem 1rem";
  button.style.border = "1px solid #666";
  button.style.borderRadius = "20px";
  button.style.cursor = "pointer";
  button.style.fontSize = "0.9rem";
  button.style.transition = "all 0.2s";
  button.style.backgroundColor = option.value === "title" ? "#666" : "white";
  button.style.color = option.value === "title" ? "white" : "#666";
  
  button.addEventListener("mouseover", () => {
    if (sortBy !== option.value) {
      button.style.backgroundColor = "#e6e6e6";
    }
  });
  
  button.addEventListener("mouseout", () => {
    if (sortBy !== option.value) {
      button.style.backgroundColor = "white";
    }
  });
  
  button.addEventListener("click", () => {
    if (sortBy === option.value) {
      // Same sort clicked again — flip direction
      sortDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
      // New sort field selected — reset to ascending
      sortBy = option.value;
      sortDirection = "asc";
    }
    updateDisplay();
    updateSortStyles();
  });
  
  sortButtons[option.value] = button;
  sortButtonsContainer.appendChild(button);
});

sortSection.appendChild(sortButtonsContainer);
controlsContainer.appendChild(sortSection);
container.appendChild(controlsContainer);

// Create items container
const itemsContainer = document.createElement("div");
container.appendChild(itemsContainer);

// Create footer for count
const footer = document.createElement("div");
footer.style.marginTop = "2rem";
footer.style.textAlign = "center";
footer.style.color = "#666";
footer.style.fontStyle = "italic";
container.appendChild(footer);

function updateTagStyles() {
  allTag.style.backgroundColor = activeTheme === null ? "#0066cc" : "white";
  allTag.style.color = activeTheme === null ? "white" : "#0066cc";
  
  Object.keys(themeTags).forEach(theme => {
    const tag = themeTags[theme];
    tag.style.backgroundColor = activeTheme === theme ? "#0066cc" : "white";
    tag.style.color = activeTheme === theme ? "white" : "#0066cc";
  });
}

function updateSortStyles() {
  Object.keys(sortButtons).forEach(value => {
    const button = sortButtons[value];
    button.style.backgroundColor = sortBy === value ? "#666" : "white";
    button.style.color = sortBy === value ? "white" : "#666";
  });
}

function sortData(dataToSort) {
  const sorted = [...dataToSort];
  const dir = sortDirection === "asc" ? 1 : -1;

  if (sortBy === "title") {
    sorted.sort((a, b) => {
      const titleA = (a.Title || 'Untitled').toLowerCase();
      const titleB = (b.Title || 'Untitled').toLowerCase();
      return dir * titleA.localeCompare(titleB);
    });
  } else if (sortBy === "creator") {
    sorted.sort((a, b) => {
      const creatorA = (a.Creator || '').toLowerCase();
      const creatorB = (b.Creator || '').toLowerCase();
      return dir * creatorA.localeCompare(creatorB);
    });
  } else if (sortBy === "year") {
    sorted.sort((a, b) => {
      const yearA = parseInt(a['Year']) || 0;
      const yearB = parseInt(b['Year']) || 0;
      return dir * (yearA - yearB);  // note: dir=1 gives ascending years now
    });
  }

  return sorted;
}

function updateDisplay() {
  // Clear items
  itemsContainer.innerHTML = "";
  
  // Filter data
  const filteredData = activeTheme === null 
    ? data 
    : data.filter(row => row.Theme === activeTheme);
  
  // Sort data
  const sortedData = sortData(filteredData);
  
  // Create items for each row
  sortedData.forEach(row => {
    // Create item container
    const item = document.createElement("div");
    item.width = "100%";
    item.style.marginBottom = "2.5rem";
    item.style.paddingBottom = "2rem";
    item.style.borderBottom = "1px solid #ddd";
    
    // Title with link
    const title = document.createElement("h2");
    title.style.marginTop = "0";
    title.style.marginBottom = "0.5rem";
    title.textContent = row.Title || 'Untitled';
    
    // if (row.InfoURL) {
    //   const link = document.createElement("a");
    //   link.href = row.InfoURL;
    //   link.target = "_blank";
    //   link.textContent = row.Title || 'Untitled';
    //   link.style.color = "#0066cc";
    //   link.style.textDecoration = "none";
    //   link.addEventListener("mouseover", () => link.style.textDecoration = "underline");
    //   link.addEventListener("mouseout", () => link.style.textDecoration = "none");
    //   title.appendChild(link);
    // } else {
    //   title.textContent = row.Title || 'Untitled';
    // }
    
    item.appendChild(title);
    
    // Metadata line
    const metadata = [];
    if (row.Creator) metadata.push(`<strong>Creator:</strong> ${row.Creator}`);
    if (row['Year']) metadata.push(`<strong>Year:</strong> ${row['Year']}`);
    if (row.Material) metadata.push(`<strong>Material:</strong> ${row.Material}`);
    if (row.Medium) metadata.push(`<strong>Medium:</strong> ${row.Medium}`);
    
    if (metadata.length > 0) {
      const metaDiv = document.createElement("div");
      metaDiv.innerHTML = metadata.join(" • ");
      metaDiv.style.color = "#666";
      metaDiv.style.fontSize = "0.9rem";
      metaDiv.style.marginBottom = "0.75rem";
      item.appendChild(metaDiv);
    }
    
    // Description
    if (row.Description) {
      const desc = document.createElement("div");
      desc.textContent = row.Description;
      desc.style.marginTop = "0.75rem";
      desc.style.marginBottom = "0.5rem";
      desc.style.lineHeight = "1.6";
      item.appendChild(desc);
    }
    
    // Additional details
    const details = [];
    if (row.Theme) details.push(`<strong>Theme:</strong> ${row.Theme}`);
    if (row.Location) details.push(`<strong>Location:</strong> ${row.Location}`);
    if (row['Visualtags']) details.push(`<strong>Tags:</strong> ${row['Visualtags']}</em>`);
    
    if (details.length > 0) {
      const detailsDiv = document.createElement("div");
      detailsDiv.innerHTML = details.join(" • ");
      detailsDiv.style.fontSize = "0.85rem";
      detailsDiv.style.color = "#888";
      detailsDiv.style.marginTop = "0.5rem";
      item.appendChild(detailsDiv);
    }
    
  // More Info link (opens InfoURL), only shown if the field is present
    if (row.InfoURL) {
      const moreInfo = document.createElement("a");
      moreInfo.href = row.InfoURL;
      moreInfo.target = "_blank";
      moreInfo.textContent = "More Info";
      moreInfo.style.display = "inline-block";
      moreInfo.style.marginTop = "0.75rem";
      moreInfo.style.color = "#0066cc";
      moreInfo.style.textDecoration = "none";
      moreInfo.style.fontSize = "0.9rem";
      moreInfo.style.fontWeight = "600";
      moreInfo.addEventListener("mouseover", () => moreInfo.style.textDecoration = "underline");
      moreInfo.addEventListener("mouseout", () => moreInfo.style.textDecoration = "none");
            
      moreInfo.addEventListener("click", (e) => {
        e.preventDefault();
        const confirmed = window.confirm(
          "You are about to leave this site and visit an external website:\n\n" + row.InfoURL + "\n\nDo you want to continue?"
        );
        if (confirmed) {
          window.open(row.InfoURL, "_blank", "noopener,noreferrer");
        }
      });
      
      item.appendChild(moreInfo);
    }
    
    itemsContainer.appendChild(item);
  });
  
  // Update footer count
  footer.textContent = `Showing ${sortedData.length} of ${data.length} items`;
}

// Initial display
updateDisplay();
```