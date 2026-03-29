// 📄 Fichier : js/plants/plants.events.js
// 🎯 Rôle : Événements de la page plantes

const PlantsEvents = {

  init() {
    this.bindNav();
    this.bindModal();
    this.bindSearch();
    this.bindPhotoInputs();
    this.bindPageChange();
  },

  // Rendu initial et à chaque retour sur la page
  bindPageChange() {
    document.addEventListener('page:change', (e) => {
      if (e.detail.page === 'plants') {
        PlantsUI.render();
      }
    });
  },

  // Boutons vue liste / grille
  bindNav() {
    document.getElementById('btn-view-list').addEventListener('click', () => {
      Plants.setView('list');
      PlantsUI.updateViewButtons();
      PlantsUI.render();
    });

    document.getElementById('btn-view-grid').addEventListener('click', () => {
      Plants.setView('grid');
      PlantsUI.updateViewButtons();
      PlantsUI.render();
    });

    // Bouton ajouter
    document.getElementById('btn-add-plant').addEventListener('click', () => {
      PlantsModal.open();
    });
  },

  // Recherche en temps réel
  bindSearch() {
    document.getElementById('plant-search').addEventListener('input', (e) => {
      Plants.setSearch(e.target.value);
      PlantsUI.render();
    });
  },

  // Événements délégués sur le container (edit, delete, accordion, photo modal)
  bindContainer() {
    const container = document.getElementById('plants-container');

    container.addEventListener('click', (e) => {
      // Éditer
      const editBtn = e.target.closest('.edit-plant');
      if (editBtn) {
        const plant = Storage.getPlantById(editBtn.dataset.id);
        if (plant) PlantsModal.open(plant);
        return;
      }

      // Supprimer
      const deleteBtn = e.target.closest('.plant-delete');
      if (deleteBtn) {
        ConfirmModal.open(
          'Supprimer cette plante ? Les tâches liées ne seront pas supprimées.',
          () => {
            Storage.deletePlant(deleteBtn.dataset.id);
            PlantsUI.render();
          }
        );
        return;
      }

      // Accordéon
      const accordionBtn = e.target.closest('.accordion-trigger');
      if (accordionBtn) {
        const id = accordionBtn.dataset.id;
        const acc = document.getElementById(`accordion-${id}`);
        if (acc) acc.classList.toggle('open');
        return;
      }

      // Photo modal (vue grille)
      const gridImg = e.target.closest('.plant-grid-img');
      if (gridImg) {
        const plant = Storage.getPlantById(gridImg.dataset.id);
        if (plant) PlantsUI.openPhotoModal(plant);
        return;
      }
    });
  },

  // Modale plante
  bindModal() {
    // Fermer
    document.getElementById('modal-plant-close').addEventListener('click', () => PlantsModal.close());
    document.getElementById('btn-plant-cancel').addEventListener('click', () => PlantsModal.close());

    // Clic hors modale
    document.getElementById('modal-plant').addEventListener('click', (e) => {
      if (e.target.id === 'modal-plant') PlantsModal.close();
    });

    // Sauvegarder
    document.getElementById('btn-plant-save').addEventListener('click', () => {
      const data = PlantsModal.getFormData();
      if (!data) return;

      const id = document.getElementById('plant-id').value;
      if (id) {
        Storage.updatePlant(id, data);
      } else {
        Storage.addPlant(data);
      }
      PlantsModal.close();
      PlantsUI.render();
    });

    // Ajouter URL
    document.getElementById('btn-add-url').addEventListener('click', () => {
      PlantsModal.addUrlRow();
    });
  },

  // Photo : appareil photo et galerie
  bindPhotoInputs() {
    document.getElementById('btn-camera').addEventListener('click', () => {
      document.getElementById('input-camera').click();
    });

    document.getElementById('btn-gallery').addEventListener('click', () => {
      document.getElementById('input-gallery').click();
    });

    document.getElementById('input-camera').addEventListener('change', (e) => {
      PlantsModal.handleFileInput(e.target.files[0]);
    });

    document.getElementById('input-gallery').addEventListener('change', (e) => {
      PlantsModal.handleFileInput(e.target.files[0]);
    });
  }
};
