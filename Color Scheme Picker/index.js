const form = document.getElementById('form');

// Load Color Scheme
document.addEventListener('DOMContentLoaded', () => {
  const url =
    'https://www.thecolorapi.com/scheme?hex=F55A5A&mode=monochrome&count=5';

  fetchUrl(url)  
});

// Selected Color Scheme
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const colorInput = document.getElementById('color-input');
  const colorScheme = document.getElementById('color-scheme');

  // Insert both input values to the url
  const url = `https://www.thecolorapi.com/scheme?hex=${colorInput.value.slice(1)}&mode=${colorScheme.value}&count=5`;

  fetchUrl(url)
});

function fetchUrl(colorAPI) {
  // Ensure the schemeArray is empty before "pushing" 5 new colors
  let schemeArray = []

  fetch(colorAPI, { method: 'GET' })
  .then((res) => res.json())
  .then((scheme) => {
    scheme.colors.forEach((color) => {
      schemeArray.push(color.hex.value);
    });
    renderColors(schemeArray);
  });  
}

// Render Color Scheme
function renderColors(colorsArray) {
  let colorHtml = ``;

  colorsArray.forEach((color) => {
    colorHtml += `
            <div class="scheme-container">
                <div class="color" style="background-color: ${color}"></div>
                <p id="hex-color" class="hex-code">${color}</p>
            </div>
        `;
  });  
  document.getElementById('scheme-grid').innerHTML = colorHtml;
}