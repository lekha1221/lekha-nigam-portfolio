const LOCALITIES = {
  Kokapet: {
    center: [17.395, 78.334],
    kpis: [
      ["Projects", "48"],
      ["Avg ticket", "₹1.12 Cr"],
      ["Inventory", "1,840"],
      ["Sources", "7"],
    ],
    mix: [
      { name: "2 BHK", value: 18 },
      { name: "3 BHK", value: 21 },
      { name: "4 BHK", value: 9 },
    ],
    projects: [
      { name: "Neopolis Tower A", bhk: "3 BHK", price: "₹1.28 Cr", lat: 17.398, lng: 78.331 },
      { name: "ORR Ridge", bhk: "2 BHK", price: "₹0.86 Cr", lat: 17.392, lng: 78.338 },
      { name: "Westlake Residences", bhk: "4 BHK", price: "₹2.10 Cr", lat: 17.401, lng: 78.329 },
    ],
  },
  Gachibowli: {
    center: [17.44, 78.348],
    kpis: [
      ["Projects", "62"],
      ["Avg ticket", "₹1.41 Cr"],
      ["Inventory", "2,210"],
      ["Sources", "7"],
    ],
    mix: [
      { name: "2 BHK", value: 16 },
      { name: "3 BHK", value: 28 },
      { name: "4 BHK", value: 18 },
    ],
    projects: [
      { name: "Lakeview One", bhk: "3 BHK", price: "₹1.55 Cr", lat: 17.444, lng: 78.351 },
      { name: "Botanica", bhk: "2 BHK", price: "₹0.98 Cr", lat: 17.437, lng: 78.344 },
      { name: "ITIR Heights", bhk: "4 BHK", price: "₹2.40 Cr", lat: 17.448, lng: 78.346 },
    ],
  },
  "Financial District": {
    center: [17.418, 78.342],
    kpis: [
      ["Projects", "39"],
      ["Avg ticket", "₹1.67 Cr"],
      ["Inventory", "1,120"],
      ["Sources", "7"],
    ],
    mix: [
      { name: "2 BHK", value: 8 },
      { name: "3 BHK", value: 19 },
      { name: "4 BHK", value: 12 },
    ],
    projects: [
      { name: "District Court", bhk: "3 BHK", price: "₹1.72 Cr", lat: 17.421, lng: 78.339 },
      { name: "Nanakramguda Park", bhk: "4 BHK", price: "₹2.85 Cr", lat: 17.416, lng: 78.347 },
      { name: "Wavefront", bhk: "2 BHK", price: "₹1.05 Cr", lat: 17.414, lng: 78.336 },
    ],
  },
  Kondapur: {
    center: [17.469, 78.364],
    kpis: [
      ["Projects", "54"],
      ["Avg ticket", "₹0.94 Cr"],
      ["Inventory", "2,640"],
      ["Sources", "7"],
    ],
    mix: [
      { name: "2 BHK", value: 27 },
      { name: "3 BHK", value: 20 },
      { name: "4 BHK", value: 7 },
    ],
    projects: [
      { name: "Kothaguda Grove", bhk: "2 BHK", price: "₹0.78 Cr", lat: 17.472, lng: 78.361 },
      { name: "Hafeezpet Square", bhk: "3 BHK", price: "₹1.18 Cr", lat: 17.466, lng: 78.369 },
      { name: "Kondapur Crest", bhk: "3 BHK", price: "₹1.09 Cr", lat: 17.475, lng: 78.358 },
    ],
  },
};

const map = L.map("map");
const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap",
});
tiles.addTo(map);
let markers = [];
const mixChart = echarts.init(document.getElementById("mix"));

function render(name) {
  const slice = LOCALITIES[name];
  document.getElementById("kpis").innerHTML = slice.kpis
    .map(([label, value]) => `<div class="kpi"><b>${value}</b><span>${label}</span></div>`)
    .join("");
  document.getElementById("table").innerHTML = `<table><thead><tr><th>Project</th><th>Typology</th><th>Ticket</th></tr></thead><tbody>${slice.projects
    .map((row) => `<tr><td>${row.name}</td><td>${row.bhk}</td><td>${row.price}</td></tr>`)
    .join("")}</tbody></table>`;
  markers.forEach((marker) => marker.remove());
  markers = slice.projects.map((row) =>
    L.marker([row.lat, row.lng]).addTo(map).bindPopup(`${row.name}<br>${row.bhk} · ${row.price}`)
  );
  map.setView(slice.center, 13);
  mixChart.setOption({
    tooltip: { trigger: "item" },
    series: [
      {
        type: "pie",
        radius: ["42%", "68%"],
        data: slice.mix,
        label: { formatter: "{b} {d}%" },
      },
    ],
  });
}

document.getElementById("analyze").addEventListener("submit", (event) => {
  event.preventDefault();
  render(document.getElementById("locality").value);
});

render("Kokapet");
