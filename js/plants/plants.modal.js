// 📄 Fichier : js/plants/plants.modal.js
// 🎯 Rôle : Gestion de la modale ajout/édition de plante

const PlantsModal = {

  isOpen: false,

  open(plant = null) {
    this.isOpen = true;
    this.resetForm();

    const title = document.getElementById('modal-plant-title');
    title.textContent = plant ? 'Modifier la plante' : 'Nouvelle plante';

    if (plant) this.fillForm(plant);

    document.getElementById('modal-plant').classList.remove('hidden');
  },

  close() {
    this.isOpen = false;
    document.getElementById('modal-plant').classList.add('hidden');
  },

  resetForm() {
    document.getElementById('form-plant').reset();
    document.getElementById('plant-id').value = '';
    document.getElementById('urls-container').innerHTML = '';

    // Reset photo
    const preview = document.getElementById('photo-preview');
    preview.innerHTML = `<span class="photo-placeholder">🌿</span>`;
  },

  fillForm(plant) {
    document.getElementById('plant-id').value    = plant.id;
    document.getElementById('plant-name').value  = plant.name;
    document.getElementById('plant-species').value = plant.species || '';
    document.getElementById('plant-notes').value = plant.notes || '';

    if (plant.photo) {
      const preview = document.getElementById('photo-preview');
      preview.innerHTML = `<img src="${plant.photo}" alt="Photo" />`;
      preview._photoData = plant.photo;
    }

    if (plant.urls && plant.urls.length > 0) {
      plant.urls.forEach(url => this.addUrlRow(url));
    }
  },

  // Retourne la photo actuelle (base64)
  getCurrentPhoto() {
    const preview = document.getElementById('photo-preview');
    const img = preview.querySelector('img');
    return img ? img.src : preview._photoData || null;
  },

  // Ajoute une ligne URL
  addUrlRow(value = '') {
    const container = document.getElementById('urls-container');
    const row = document.createElement('div');
    row.className = 'url-row';
    row.innerHTML = `
      <input type="url" class="form-input url-input" placeholder="https://…" value="${value}" />
      <button type="button" class="url-remove">✕</button>
    `;
    row.querySelector('.url-remove').addEventListener('click', () => row.remove());
    container.appendChild(row);
  },

// Collecte les données du formulaire
getFormData() {
  // DEBUG
  alert('nb plant-name: ' + document.querySelectorAll('#plant-name').length);
  alert('valeur: "' + document.getElementById('plant-name').value + '"');

  const name = document.getElementById('plant-name').value.trim();
  if (!name) {
    document.getElementById('plant-name').classList.add('error');
    return null;
  }
  document.getElementById('plant-name').classList.remove('error');

  const urls = Array.from(document.querySelectorAll('.url-input'))
    .map(i => i.value.trim())
    .filter(v => v.length > 0);

  return {
    name,
    species: document.getElementById('plant-species').value.trim(),
    notes:   document.getElementById('plant-notes').value.trim(),
    photo:   this.getCurrentPhoto(),
    urls
  };
},

  // Gère la sélection d'une photo (caméra ou galerie)
  handleFileInput(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = document.getElementById('photo-preview');
      preview.innerHTML = `<img src="${e.target.result}" alt="Photo" />`;
    };
    reader.readAsDataURL(file);
  }
};

