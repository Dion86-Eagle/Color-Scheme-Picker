const form = document.getElementById('form');

let schemeArray = [];

// Load Color Scheme
document.addEventListener('DOMContentLoaded', () => {
  const url =
    'https://www.thecolorapi.com/scheme?hex=F55A5A&mode=monochrome&count=5';

  fetch(url, { method: 'GET' })
    .then((res) => res.json())
    .then((scheme) => {
      scheme.colors.forEach((color) => {
        schemeArray.push(color.hex.value);
      });
      renderColors(schemeArray);
    });
});

// Selected Color Scheme
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const colorInput = document.getElementById('color-input');
  const colorScheme = document.getElementById('color-scheme');

  // Insert both input values to the url
  const url = `https://www.thecolorapi.com/scheme?hex=${colorInput.value.slice(1)}&mode=${colorScheme.value}&count=5`;

  // Ensure you empty the array for 5 "new" incoming colors
  let schemeArray = [];

  fetch(url, { method: 'GET' })
    .then((res) => res.json())
    .then((scheme) => {
      scheme.colors.forEach((color) => {
        schemeArray.push(color.hex.value);
      });
      renderColors(schemeArray);
    });
});

// Render Color Scheme
function renderColors(array) {
  let colorHtml = ``;

  array.forEach((color) => {
    colorHtml += `
            <div class="scheme-container">
                <div class="color" style="background-color: ${color}"></div>
                <p class="hex-code">${color}</p>
            </div>
        `;
  });
  // Load all elements to the page
  document.getElementById('scheme-grid').innerHTML = colorHtml;
}
