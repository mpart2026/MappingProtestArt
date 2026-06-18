---
title: "Visualizations"
toc: false
---

<style>
.viz-row {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1.5rem;
  align-items: start;
  margin-bottom: 3rem;
}
.analysis-panel {
  background: #f8f7f4;
  border-left: 3px solid #d0cdc6;
  border-radius: 6px;
  padding: 1rem 1.25rem;
  font-size: 0.875rem;
  line-height: 1.6;
  color: #444;
  position: sticky;
  top: 1rem;
}
.analysis-panel h4 {
  margin: 0 0 0.5rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #888;
  font-weight: 600;
}
.analysis-panel p {
  margin: 0 0 0.75rem;
}
.analysis-panel p:last-child {
  margin-bottom: 0;
}
</style>

## Visualizations

```js
import * as topojson from "npm:topojson-client";

const world = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
  .then(r => r.json());

const land = topojson.feature(world, world.objects.land);

const data = await FileAttachment("../data/artwork.csv").csv({typed: true});

const validData = data.filter(d => 
  d.Latitude != null && 
  d.Longitude != null && 
  !isNaN(d.Latitude) && 
  !isNaN(d.Longitude) &&
  d.Year != null &&
  !isNaN(d.Year)
);

const dataWithDecade = validData.map(d => ({
  ...d,
  Decade: Math.floor(d.Year / 10) * 10
}));

const decades = [...new Set(dataWithDecade.map(d => d.Decade))].sort();

const selectedDecade = view(Inputs.select(
  [null, ...decades],
  {label: "Select Decade", value: null, format: d => d === null ? "All" : String(d)}
));
```

<div class="viz-row">
<div>

```js
Plot.plot({
  title: selectedDecade === null ? "All Artworks" : `Artworks from the ${selectedDecade}s`,
  width: 580,
  height: 420,
  projection: "equirectangular",
  marks: [
    Plot.geo(land, {fill: "#e0e0e0", stroke: "white", strokeWidth: 0.5}),
    Plot.sphere({stroke: "#000", strokeWidth: 1}),
    Plot.dot(selectedDecade === null ? dataWithDecade : dataWithDecade.filter(d => d.Decade === selectedDecade), {
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
    Plot.text([[0, 90]], {
      text: [`${(selectedDecade === null ? dataWithDecade : dataWithDecade.filter(d => d.Decade === selectedDecade)).length} artworks`],
      frameAnchor: "top-right",
      fontSize: 14,
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

</div>
<div class="analysis-panel">
<h4>Geographic distribution</h4>
<p>This map shows where artworks in the collection originate, colored by theme. Use the decade selector above to explore how geographic spread has shifted over time.</p>
<p>Dense clusters indicate cultural hubs or periods of concentrated production. Isolated dots may reflect rare surviving works in areas of limited artistic freedom.</p>
<p>Hover any dot for title, creator, location, and medium.</p>
</div>
</div>

---

```js
const themeCounts = d3.rollup(
  data,
  v => v.length,
  d => d.Theme
);

const themeData = Array.from(themeCounts, ([theme, count]) => ({
  theme,
  count
})).sort((a, b) => b.count - a.count);

const total = d3.sum(themeData, d => d.count);
```

<div class="viz-row">
<div>

```js
Plot.plot({
  title: "Artwork Themes (Grid View)",
  width: 580,
  height: 380,
  axis: null,
  marginTop: 40,
  marks: [
    Plot.cell(themeData, {
      x: (d, i) => i % 4,
      y: (d, i) => Math.floor(i / 4),
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
    scheme: "tableau10",
    legend: true,
    label: "Number of Artworks"
  }
})
```

</div>
<div class="analysis-panel">
<h4>Theme breakdown</h4>
<p>Each cell represents one theme, sized equally but shaded by count. Darker cells indicate themes with more artworks in the collection.</p>
<p>Dominant themes may reflect global struggles or the dataset's limited scope rather than the true historical distribution of subjects.</p>
<p>Hover a cell for the exact count and percentage.</p>
</div>
</div>

---

```js
const spaceDescCounts = d3.rollup(
  data.filter(d => d.SpaceDesc && d.SpaceDesc.trim() !== ""),
  v => v.length,
  d => d.SpaceDesc
);

const spaceDescData = Array.from(spaceDescCounts, ([spaceDesc, count]) => ({
  spaceDesc,
  count
})).sort((a, b) => b.count - a.count);

const totalSpaceDesc = d3.sum(spaceDescData, d => d.count);
```

<div class="viz-row">
<div>

```js
Plot.plot({
  title: "Artworks by Space Description",
  width: 580,
  height: 380,
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

</div>
<div class="analysis-panel">
<h4>Spatial context</h4>
<p>This chart ranks artworks by the type of space they were displayed in. The distribution reveals the collection's reach and potential impact.</p>
<p>A strong showing for public spaces may indicate that works with greater visibility and social impact are better preserved historically. </p>
</div>
</div>

---

```js
const tagField = "Visualtags";

const pairs = [];
data.forEach(d => {
  if (!d.Theme || !d[tagField]) return;
  const tags = String(d[tagField]).split(",").map(t => t.trim()).filter(Boolean);
  tags.forEach(tag => pairs.push({ theme: d.Theme, tag }));
});

const themes = [...new Set(pairs.map(p => p.theme))].sort();
const tags   = [...new Set(pairs.map(p => p.tag))].sort();

const matrix = d3.rollup(pairs, v => v.length, p => p.theme, p => p.tag);

const cellData = themes.flatMap(theme =>
  tags.map(tag => ({
    theme,
    tag,
    count: matrix.get(theme)?.get(tag) ?? 0
  }))
);

const maxCount = d3.max(cellData, d => d.count);
```

<div class="viz-row">
<div>

```js
const filteredCells = cellData.filter(d => d.count >= 2);
const activeThemes = [...new Set(filteredCells.map(d => d.theme))].sort();
const activeTags   = [...new Set(filteredCells.map(d => d.tag))].sort();
```

```js
Plot.plot({
  title: "Theme × Visual Tag co-occurrence",
  width: 580,
  height: 80 + activeTags.length * 22,
  marginLeft: 160,
  marginBottom: 120,
  x: {
    label: null,
    tickRotate: -45,
    domain: activeThemes,
    padding: 0
  },
  y: {
    label: null,
    domain: activeTags,
    padding: 0
  },
  color: {
    type: "sequential",
    scheme: "YlOrRd",
    domain: [0, maxCount],
    legend: true,
    label: "Co-occurrences"
  },
  marks: [
    Plot.cell(filteredCells, {
      x: "theme",
      y: "tag",
      fill: "count",
      inset: 0.5,
      stroke: "white",
      inset: 1,
      tip: true,
      title: d => `${d.theme} × ${d.tag}\n${d.count} artwork${d.count !== 1 ? "s" : ""}`
    }),
    Plot.text(filteredCells, {
      x: "theme",
      y: "tag",
      text: d => d.count,
      fill: d => d.count > maxCount * 0.6 ? "white" : "#333",
      fontSize: 10,
      fontWeight: "bold"
    }),
    Plot.frame()
  ]
})
```

</div>
<div class="analysis-panel">
<h4>Theme–tag co-occurrence</h4>
<p>The display features true co-occurrences i.e when the count is more than one. Each cell shows how often a visual tag appears alongside a given theme. Darker red indicates stronger co-occurrence — a visual vocabulary strongly associated with that theme.</p>
<p>Rows with many warm cells belong to tags that cut across themes, suggesting universal visual motifs. Sparse rows indicate niche or theme-specific imagery.</p>
<p>Blank cells (zero co-occurrences) reveal combinations that don't exist in the collection, which can be as revealing as the clusters.</p>
</div>
</div>