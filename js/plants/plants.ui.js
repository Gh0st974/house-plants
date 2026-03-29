// 📄 Fichier : js/plants/plants.ui.js
// 🎯 Rôle : Rendu DOM de la page plantes (liste, grille, états vides)

const PlantsUI = {

  container: null,

  init() {
    this.container = document.getElementById('plants-container');
  },

  // Rendu principal selon la vue active
  render() {
    const plants = Plants.getFiltered();
    if (plants.length === 0) {
      this.renderEmpty();
      return;
    }
    if (Plants.currentView === 'list') {
      this.renderList(plants);
    } else {
      this.renderGrid(plants);
    }
  },

  // État vide
  renderEmpty() {
    this.container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🌱</div>
        <div class="empty-state-title">Aucune plante pour l'instant</div>
        <div class="empty-state-text">Ajoutez votre première plante en appuyant sur le bouton + Ajouter</div>
      </div>
    `;
  },

  // Vue liste
  renderList(plants) {
    const html = plants.map(p => this.buildListCard(p)).join('');
    this.container.innerHTML = `<div class="plant-list">${html}</div>`;
  },

  buildListCard(plant) {
    const thumb = plant.photo
      ? `<img class="plant-thumb" src="${plant.photo}" alt="${plant.name}" />`
      : `<div class="plant-thumb-placeholder">🌿</div>`;

    const species = plant.species
      ? `<div class="plant-species">${plant.species}</div>` : '';

    const hasExtra = plant.notes || (plant.urls && plant.urls.length > 0);
    const toggleBtn = hasExtra
      ? `<button class="plant-action-btn accordion-trigger" data-id="${plant.id}" title="Détails">
           ▾<span class="accordion-toggle" id="arrow-${plant.id}">▾</span>
         </button>` : '';

    return `
      <div class="plant-card-list" id="card-${plant.id}">
        <div class="plant-card-main">
          ${thumb}
          <div class="plant-info">
            <div class="plant-name">${plant.name}</div>
            ${species}
          </div>
          <div class="plant-actions">
            ${toggleBtn}
            <button class="plant-action-btn edit-plant" data-id="${plant.id}" title="Modifier">✏️</button>
            <button class="plant-action-btn delete plant-delete" data-id="${plant.id}" title="Supprimer">🗑️</button>
          </div>
        </div>
        ${hasExtra ? this.buildAccordion(plant) : ''}
      </div>
    `;
  },

  buildAccordion(plant) {
    let content = '';
    if (plant.notes) {
      content += `
        <div class="accordion-section">
          <div class="accordion-label">Notes</div>
          <div class="accordion-text">${plant.notes}</div>
        </div>`;
    }
    if (plant.urls && plant.urls.length > 0) {
      const links = plant.urls.map(u =>
        `<a class="accordion-link" href="${u}" target="_blank" rel="noopener">${u}</a>`
      ).join('');
      content += `
        <div class="accordion-section">
          <div class="accordion-label">Liens</div>
          <div class="accordion-links">${links}</div>
        </div>`;
    }
    return `<div class="plant-accordion" id="accordion-${plant.id}">${content}</div>`;
  },

  // Vue grille
  renderGrid(plants) {
    const html = plants.map(p => this.buildGridCard(p)).join('');
    this.container.innerHTML = `<div class="plant-grid">${html}</div>`;
  },

  buildGridCard(plant) {
    const img = plant.photo
      ? `<img class="plant-grid-img" src="${plant.photo}" alt="${plant.name}" data-id="${plant.id}" />`
      : `<div class="plant-grid-placeholder">🌿</div>`;

    return `
      <div class="plant-card-grid">
        ${img}
        <div class="plant-grid-footer">
          <div class="plant-grid-name">${plant.name}</div>
          <div class="plant-grid-actions">
            <button class="plant-action-btn edit-plant" data-id="${plant.id}" title="Modifier">✏️</button>
            <button class="plant-action-btn delete plant-delete" data-id="${plant.id}" title="Supprimer">🗑️</button>
          </div>
        </div>
      </div>
    `;
  },

  // Ouvre la modale photo (vue grille)
  openPhotoModal(plant) {
    if (!plant.photo) return;

    // Créer l'overlay via createElement pour permettre les listeners directs
    const overlay = document.createElement('div');
    overlay.className = 'photo-modal-overlay';

    // Créer le bouton de fermeture
    const closeBtn = document.createElement('button');
    closeBtn.className = 'photo-modal-close';
    closeBtn.textContent = '✕';

    // Créer l'image
    const img = document.createElement('img');
    img.className = 'photo-modal-img';
    img.src = plant.photo;
    img.alt = plant.name;

    overlay.appendChild(closeBtn);
    overlay.appendChild(img);

    // Fonction de fermeture unique — garantit le remove()
    const close = () => overlay.remove();

    // Fermeture via bouton ✕ — listener direct, fiable sur mobile
    closeBtn.addEventListener('click', close);

    // Fermeture via clic sur le fond — classList plus fiable que e.target === overlay sur mobile
    overlay.addEventListener('click', (e) => {
      if (e.target.classList.contains('photo-modal-overlay')) close();
    });

    document.body.appendChild(overlay);
  },

  // Met à jour les boutons de vue
  updateViewButtons() {
    document.getElementById('btn-view-list').classList.toggle('active', Plants.currentView === 'list');
    document.getElementById('btn-view-grid').classList.toggle('active', Plants.currentView === 'grid');
  }
};
