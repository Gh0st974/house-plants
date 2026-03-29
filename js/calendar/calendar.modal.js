// 📄 Fichier : js/calendar/calendar.modal.js
// 🎯 Rôle : Gestion de la modale ajout/édition de tâche

const CalendarModal = {

  currentMode: 'individual', // 'individual' | 'range'

  open(task = null) {
    this.resetForm();
    this.populatePlantSelect();
    this.buildMonthsSelector();
    this.buildRangeSelects();

    const title = document.getElementById('modal-task-title');
    title.textContent = task ? 'Modifier la tâche' : 'Nouvelle tâche';

    if (task) this.fillForm(task);

    document.getElementById('modal-task').classList.remove('hidden');
  },

  close() {
    document.getElementById('modal-task').classList.add('hidden');
  },

  resetForm() {
    document.getElementById('form-task').reset();
    document.getElementById('task-id').value = '';
    this.setMode('individual');
  },

  fillForm(task) {
    document.getElementById('task-id').value   = task.id;
    document.getElementById('task-name').value = task.name;
    document.getElementById('task-plant').value = task.plantId || 'all';

    this.setMode(task.mode || 'individual');

    if (task.mode === 'range') {
      document.getElementById('range-from').value = task.monthFrom ?? '';
      document.getElementById('range-to').value   = task.monthTo ?? '';
    } else {
      const months = task.months || [];
      document.querySelectorAll('.month-btn').forEach(btn => {
        btn.classList.toggle('selected', months.includes(btn.dataset.index));
      });
    }
  },

  // Remplit le select des plantes
  populatePlantSelect() {
    const select = document.getElementById('task-plant');
    const plants = Storage.getPlants();
    // Garde l'option "Toutes les plantes" et recrée les options plantes
    select.innerHTML = `<option value="all">Toutes les plantes</option>`;
    plants.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.name;
      select.appendChild(opt);
    });
  },

  // Construit les boutons mois individuels
  buildMonthsSelector() {
    const grid = document.getElementById('months-selector');
    grid.innerHTML = CONFIG.MONTHS.map((m, i) => `
      <button type="button"
        class="month-btn"
        data-index="${i}"
        style="background:${m.color}">
        ${m.label}
      </button>
    `).join('');

    grid.querySelectorAll('.month-btn').forEach(btn => {
      btn.addEventListener('click', () => btn.classList.toggle('selected'));
    });
  },

  // Construit les selects de plage
  buildRangeSelects() {
    const options = CONFIG.MONTHS.map((m, i) =>
      `<option value="${i}">${m.full}</option>`
    ).join('');
    document.getElementById('range-from').innerHTML =
      `<option value="">De…</option>${options}`;
    document.getElementById('range-to').innerHTML =
      `<option value="">À…</option>${options}`;
  },

  // Bascule entre les modes
  setMode(mode) {
    this.currentMode = mode;
    document.getElementById('months-individual').classList.toggle('hidden', mode !== 'individual');
    document.getElementById('months-range').classList.toggle('hidden', mode !== 'range');
    document.querySelectorAll('.btn-mode').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
  },

  // Collecte les données du formulaire
  getFormData() {
    const name = document.getElementById('task-name').value.trim();
    if (!name) {
      document.getElementById('task-name').classList.add('error');
      return null;
    }
    document.getElementById('task-name').classList.remove('error');

    const base = {
      name,
      plantId: document.getElementById('task-plant').value,
      mode: this.currentMode
    };

    if (this.currentMode === 'range') {
      const from = document.getElementById('range-from').value;
      const to   = document.getElementById('range-to').value;
      if (from === '' || to === '') {
        alert('Veuillez sélectionner une plage de mois complète.');
        return null;
      }
      return { ...base, monthFrom: parseInt(from), monthTo: parseInt(to) };
    }

    // Mode individuel
    const months = Array.from(document.querySelectorAll('.month-btn.selected'))
      .map(btn => btn.dataset.index);
    if (months.length === 0) {
      alert('Veuillez sélectionner au moins un mois.');
      return null;
    }
    return { ...base, months };
  }
};
