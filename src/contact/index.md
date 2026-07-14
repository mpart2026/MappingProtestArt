---
title: "Contact"
toc: false
---

<style>
  .content-wrapper {
    padding-top: 6rem;
    max-width: 900px;
    margin: 0 auto;
  }
</style>
<div class="content-wrapper", style="max-width: 100%; width: 90%;">

<h2> About MPA </h2>

Mapping Protest Art seeks to illuminate the global language of resistance through creative expression by allowing the viewer to access different forms of protest. The project transforms individual acts of civic dissent into a collective narrative of resilience by charting how communities worldwide have used art to challenge injustice, defend their rights, and mobilize social change.

<h2>About MPA Data </h2>

Data was gathered by researching online sources as well as scholarship published on protest art over the past decade. Data collection efforts were focused on art created from the twentieth century till date. The published sources are listed below. 
<details style="margin-top: 2rem; width: 100%; max-width: none;">
  <summary style="cursor: pointer; font-size: 1.2rem; font-weight: bold; padding: 1rem; background: #f8f9fa; border-radius: 8px; border: 1px solid #ddd;">
    📚 View Sources
  </summary>

  <div style="padding: 20px; border: solid 1px #ddd; border-radius: 5px; font-size: 0.9rem; margin-top: 0.5rem; background: white; width: 100%; max-width: none; box-sizing: border-box;">

```js
const data = await FileAttachment("../data/artwork.csv").csv({ typed: true });

const manualSources = [
  "Best, Makeda, and Baca, Miguel de, eds. Conflict, Identity, and Protest in American Art. Newcastle-upon-Tyne: Cambridge Scholars Publishing, 2016.",
  "Bose, S. “Democratising Dissent: Counter-Hegemony Through Art in India’s Citizenship Protests.” Critical Debates in Humanities, Science and Global Justice, 5, Issue 1 (2025), 31–43.",
  "Brenner, Lexa. “The Bansky Effect Revolutionizing Humanitarian Protest Art.“ Harvard International Review 40, no. 2 (2019)",
  "de Baca, Miguel, and Makeda Best, eds. Conflict, Identity, and Protest in American Art. 1st ed. Newcastle upon Tyne, England: Cambridge Scholars Publishing, 2015.",
  "DeRosa, Robin Ph.D., “Webinar: Open Pedagogy, Social Justice, and the Practical Path to Commons-Oriented Learning“ (2021). Teaching, Learning & Assessment. 64.",
  "D’Ignazio, Catherine, and Lauren F. Klein. Data Feminism. The MIT Press, 2020.",
  "Lynskey, Dorian. “Wall of Love: the incredible story behind the national Covid memorial.” The Guardian, 18 Jul 2021.",
  "Makhubu, Nomusa. “On Apartheid Ruins: Art, Protest and the South African Social Landscape.” Third Text 34, no. 4–5 (2020): 569–90.",
  "Radhakrishnan, Lini. “National Covid Memorial Wall.” Digital Memories Project Reviews, Vol. V, Spring 2025, City University of New York (CUNY).",
  "Risam, Roopika. 2019. “Postcolonial Digital Pedagogy.” In New Digital Worlds: Postcolonial Digital Humanities in Theory, Praxis, and Pedagogy, 89–114. Northwestern University Press.",
  "Risam, Roopika and Gil, Alex. “Introduction: The Questions of Minimal Computing.” Digital Humanities Quarterly Vol 16.2 (2022).",
  "Sharma, Riddhima. “#AntiCAAProtests: Negotiating Online and Off-Line Resistance.” Journal of Feminist Studies in Religion 37, no. 2 (2021): 121–26.",
  "Shivaprasad, Madhavi. “Protest and Performance: My Engagement with the Anti-CAA-NRC Protests in India.” Journal of Feminist Studies in Religion 37, no. 2 (2021): 137–41.",
  "Subramanian, Sujatha. “Icons and Archive of the Protests against the Citizenship (Amendment) Act and the National Register of Citizens.” Journal of Feminist Studies in Religion 37, no. 2 (2021): 127–35.",
  "Topaz, Chad M., et al. “Diversity of Artists in Major U.S. Museums.” PloS One, vol. 14, no. 3, 2019, pp. e0212852–e0212852."
];

const dataUrls = new Set(data.map(row => row.InfoURL).filter(Boolean));

display(html`
<style>
.bibliography {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 0.75rem 2rem;
  margin-top: 0.5rem;
}

.bib-item {
  padding-left: 1.5rem;
  text-indent: -1.5rem;
  line-height: 1.6;
  font-size: 0.95rem;
}

.url-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 0.5rem 2rem;
  margin-top: 0.5rem;
}

.url-item {
  font-size: 0.9rem;
  word-break: break-all;
}
</style>

<h3 style="margin-top:0;">Collection Data Sources</h3>

<div class="bibliography">
  ${manualSources.map(citation => html`
    <div class="bib-item">${citation}</div>
  `)}
</div>

`);
``` 
<!-- <h4 style="margin-top:2rem;color:#0066cc;">
  Artwork References (${dataUrls.size})
</h4>

<div class="url-list">
  ${[...dataUrls].map(url => html`
    <div class="url-item">
      <a href="${url}" target="_blank">${url}</a>
    </div>
  `)}
</div> -->


  </div>
</details>

<br>

<h2> How to Use the Site </h2>
There is no single way to explore the site. The following suggestions should help navigate the collection:

* <b>Map</b>: Browse by theme to discover artworks related to specific social, political, and cultural issues. Refine your search by applying a Visual Tag filter after selecting a theme. Click on a map marker to view details about an artwork.
* <b>Collection</b>: Explore the collection in list form, where artworks can be browsed by theme and sorted by title, creator, or year of creation.
* <b>Visualizations</b>: View data visualizations to gain insight into patterns within the collection. Interpretive notes are available through the Info button in the upper-right corner, though visitors are encouraged to draw their own conclusions from the data.


</br>
<h2> Contact Us </h2>
We invite viewers to participate and contribute items to expand the collection.</br>
Do you know of protest art that you believe should be part of the collection?</br>
Send us details about the item(s): Creator name, artwork title, country of origin, URLs with more information.</br>
Email us at mpart2026@gmail.com <br>

</br>
<h2> About the Creator </h2>

My name is L Radhakrishnan. I am a student at CUNY GC and I created Mapping Protest Art as the capstone project to fulfil the final requirement for my M.A in Digital Humanities.

I have a background in art having completed the Masters and Doctoral program at Rugters in Art History. Hence the decision to make art the cornerstone of the project.

</div>
