---
title: "Visualizations"
toc: false
---

```js
// Create container for the collection
const container = display(document.createElement("div"));
container.style.maxWidth = "900px";
container.style.margin = "0 auto";
container.style.padding = "2rem";
container.style.fontFamily = "system-ui, -apple-system, sans-serif";

// Add a header
const header = document.createElement("h1");
header.textContent = "Visualizations";
header.style.marginBottom = "1rem";
header.style.paddingBottom = "1rem";
container.appendChild(header);
```