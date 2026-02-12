---
title: "Visualizations"
toc: false
---

## Visualizations

```js
// Load world geography data - topojson needs to be imported
import * as topojson from "npm:topojson-client";

const world = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
  .then(r => r.json());

const land = topojson.feature(world, world.objects.land);

// Load your CSV data
const data = await FileAttachment("../data/artwork.csv").csv({typed: true});

// Filter out records without coordinates
const validData = data.filter(d => 
  d.Latitude != null && 
  d.Longitude != null && 
  !isNaN(d.Latitude) && 
  !isNaN(d.Longitude) &&
  d.Year != null &&
  !isNaN(d.Year)
);

// Create decade bins
const dataWithDecade = validData.map(d => ({
  ...d,
  Decade: Math.floor(d.Year / 10) * 10
}));

// Get unique decades for faceting
const decades = [...new Set(dataWithDecade.map(d => d.Decade))].sort();

const selectedDecade = view(Inputs.select(
  decades,
  {label: "Select Decade", value: decades[0]}
));
```

```js
// Faceted small multiples by decade - adjusted width to fit container
Plot.plot({
  title: `Artworks from the ${selectedDecade}s`,
  width: 850,  // Slightly less than container max-width to account for padding
  height: 600,
  projection: "equirectangular",
  marks: [
    Plot.geo(land, {fill: "#e0e0e0", stroke: "white", strokeWidth: 0.5}),
    Plot.sphere({stroke: "#000", strokeWidth: 1}),
    Plot.dot(dataWithDecade.filter(d => d.Decade === selectedDecade), {
      x: "Longitude",
      y: "Latitude",
      fill: "Theme",
      r: 6,
      fillOpacity: 0.7,
      stroke: "white",
      strokeWidth: 1,
      title: d => `${d.Title}\n${d.Creator} (${d.Year})\n${d.Location}, ${d.Country}\n${d.Medium}`,
      tip: true
    }),
    // Annotation showing count
    Plot.text([[0, 90]], {
      text: [`${dataWithDecade.filter(d => d.Decade === selectedDecade).length} artworks`],
      frameAnchor: "top-right",
      fontSize: 16,
      fontWeight: "bold",
      fill: "#333",
      dx: -20,
      dy: 20
    })
  ],
  color: {
    legend: true,
    scheme: "tableau10",
    label: "Theme"
  }
})
```

```js
// Count artworks by theme
const themeCounts = d3.rollup(
  data,
  v => v.length,
  d => d.Theme
);

// Convert to array format for plotting
const themeData = Array.from(themeCounts, ([theme, count]) => ({
  theme: theme,
  count: count
})).sort((a, b) => b.count - a.count);

// Calculate total for percentages
const total = d3.sum(themeData, d => d.count);
```

```js
Plot.plot({
  title: "Artwork Themes (Grid View)",
  width: 850,  // Match the container width
  height: 400,
  axis: null,
  marginTop: 40,
  marks: [
    Plot.cell(themeData, {
      x: (d, i) => i % 4,  // 4 columns
      y: (d, i) => Math.floor(i / 4),  // rows
      fill: "count",
      tip: true,
      title: d => `${d.theme}\n${d.count} artworks (${(d.count/total*100).toFixed(1)}%)`,
      inset: 2
    }),
    Plot.text(themeData, {
      x: (d, i) => i % 4,
      y: (d, i) => Math.floor(i / 4),
      text: d => `${d.theme}\n${d.count}`,
      fill: "white",
      fontWeight: "bold",
      fontSize: 11,
      lineWidth: 10
    })
  ],
  color: {
    scheme: "turbo",
    legend: true,
    label: "Number of Artworks"
  }
})
```

```js
// Count artworks by SpaceDesc
const spaceDescCounts = d3.rollup(
  data.filter(d => d.SpaceDesc && d.SpaceDesc.trim() !== ""),
  v => v.length,
  d => d.SpaceDesc
);

// Convert to array format for plotting
const spaceDescData = Array.from(spaceDescCounts, ([spaceDesc, count]) => ({
  spaceDesc: spaceDesc,
  count: count
})).sort((a, b) => b.count - a.count);

// Calculate total for percentages
const totalSpaceDesc = d3.sum(spaceDescData, d => d.count);
```
```js
Plot.plot({
  title: "Artworks by Space Description",
  width: 850,
  height: 400,
  marginLeft: 150,
  marginBottom: 60,
  x: {
    label: "Number of Artworks",
    grid: true
  },
  y: {
    label: null
  },
  marks: [
    Plot.barX(spaceDescData, {
      y: "spaceDesc",
      x: "count",
      fill: "count",
      sort: {y: "-x"},
      tip: true,
      title: d => `${d.spaceDesc}\n${d.count} artworks (${(d.count/totalSpaceDesc*100).toFixed(1)}%)`
    }),
    Plot.text(spaceDescData, {
      y: "spaceDesc",
      x: "count",
      text: d => d.count,
      dx: 15,
      fill: "#333",
      fontSize: 11,
      fontWeight: "bold"
    })
  ],
  color: {
    scheme: "blues",
    legend: true,
    label: "Count"
  }
})
```