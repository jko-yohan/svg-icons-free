// Icon data store
const allIcons = [];
let currentSVG = '';
let currentName = '';

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
}

function openModal(name, svg) {
    currentName = name;
    currentSVG = svg;
    document.getElementById('modal-preview').innerHTML = svg;
    document.getElementById('modal-name').textContent = name;
    document.getElementById('modal-code').textContent = svg;
    document.getElementById('modal').classList.add('show');
}

function closeModal() {
    document.getElementById('modal').classList.remove('show');
}

function copySVG() {
    navigator.clipboard.writeText(currentSVG).then(() => showToast('SVG code copied!'));
}

function downloadSVG() {
    const blob = new Blob([currentSVG], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentName.replace(/\s+/g, '-').toLowerCase() + '.svg';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded!');
}

function renderIcons(icons) {
    const grid = document.getElementById('icon-grid');
    if (!grid) return;
    grid.innerHTML = icons.map(icon => `
        <div class="icon-card" onclick="openModal('${icon.name}', \`${icon.svg.replace(/`/g, '\\`')}\`)" data-name="${icon.name.toLowerCase()}">
            ${icon.svg}
            <div class="icon-name">${icon.name}</div>
        </div>
    `).join('');
}

function filterIcons() {
    const q = document.getElementById('search').value.toLowerCase();
    const cards = document.querySelectorAll('.icon-card');
    cards.forEach(card => {
        card.style.display = card.dataset.name.includes(q) ? '' : 'none';
    });
}

function loadAllIcons() {
    const grid = document.getElementById('icon-grid');
    if (!grid) return;
    renderIcons(allIcons);
}

// For category pages
function registerIcons(icons) {
    icons.forEach(i => allIcons.push(i));
}
