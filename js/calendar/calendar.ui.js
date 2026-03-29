// 📄 Fichier : js/calendar/calendar.ui.js
// 🎯 Rôle : Rendu DOM de la page calendrier

const CalendarUI = {

  container: null,

  init() {
    this.container = document.getElementById('calendar-container');
  },

  render() {
    const tasks = Storage.getTasks();
    if (tasks.length === 0) {
      this.renderEmpty();
      return;
    }
    const groups = Calendar.getGrouped();
    this.renderGroups(groups);
  },

  renderEmpty() {
    this.container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📅</div>
        <div class="empty-state-title">Aucune tâche planifiée</div>
        <div class="empty-state-text">Ajoutez une tâche pour organiser l'entretien de vos plantes tout au long de l'année.</div>
      </div>
    `;
  },

  renderGroups(groups) {
    const html = groups.map(g => this.buildGroup(g)).join('');
    this.container.innerHTML = html;
  },

  buildGroup(group) {
    const isAll = group.plantId === 'all';
    let headerHtml;

    if (isAll) {
      headerHtml = `
        <div class="task-group-header">
          <div class="task-group-thumb-placeholder">🌿</div>
          <div class="task-group-title">Toutes les plantes</div>
        </div>`;
    } else {
      const plant = group.plant;
      const thumb = plant && plant.photo
        ? `<img class="task-group-thumb" src="${plant.photo}" alt="${plant.name}" />`
        : `<div class="task-group-thumb-placeholder">🌿</div>`;
      const name = plant ? plant.name : 'Plante inconnue';
      headerHtml = `
        <div class="task-group-header">
          ${thumb}
          <div class="task-group-title">${name}</div>
        </div>`;
    }

    const tasksHtml = group.tasks.map(t => this.buildTaskCard(t)).join('');
    return `<div class="task-group">${headerHtml}${tasksHtml}</div>`;
  },

  buildTaskCard(task) {
    const nextIdx = Calendar.getNextMonthIndex(task);
    const currentIdx = CONFIG.currentMonthIndex;
    const isNext = nextIdx === currentIdx;

    const monthIndexes = Calendar.getTaskMonthIndexes(task);
    const badges = monthIndexes.map(i => {
      const m = CONFIG.getMonth(i);
      if (!m) return '';
      const isActive = i === nextIdx;
      const border = isActive ? `border: 2px solid #2d2d2d;` : '';
      return `<span class="badge-month" style="background:${m.color};${border}">${m.label}</span>`;
    }).join('');

    const nextLabel = isNext
      ? `<span class="task-next-badge">Ce mois-ci</span>` : '';

    return `
      <div class="task-card ${isNext ? 'is-next' : ''}" id="task-${task.id}">
        <div class="task-info">
          <div class="task-name">${task.name}${nextLabel}</div>
          <div class="task-months">${badges}</div>
        </div>
        <div class="task-actions">
          <button class="task-action-btn edit-task" data-id="${task.id}" title="Modifier">✏️</button>
          <button class="task-action-btn delete task-delete" data-id="${task.id}" title="Supprimer">🗑️</button>
        </div>
      </div>
    `;
  }
};
