// 📄 Fichier : js/calendar/calendar.events.js
// 🎯 Rôle : Événements de la page calendrier

const CalendarEvents = {

  init() {
    this.bindPageChange();
    this.bindAddButton();
    this.bindModal();
    this.bindModeToggle();
    this.bindContainer();
  },

  bindPageChange() {
    document.addEventListener('page:change', (e) => {
      if (e.detail.page === 'calendar') {
        CalendarUI.render();
      }
    });
  },

  bindAddButton() {
    document.getElementById('btn-add-task').addEventListener('click', () => {
      CalendarModal.open();
    });
  },

  bindModal() {
    document.getElementById('modal-task-close').addEventListener('click', () => CalendarModal.close());
    document.getElementById('btn-task-cancel').addEventListener('click', () => CalendarModal.close());

    document.getElementById('modal-task').addEventListener('click', (e) => {
      if (e.target.id === 'modal-task') CalendarModal.close();
    });

    document.getElementById('btn-task-save').addEventListener('click', () => {
      const data = CalendarModal.getFormData();
      if (!data) return;

      const id = document.getElementById('task-id').value;
      if (id) {
        Storage.updateTask(id, data);
      } else {
        Storage.addTask(data);
      }
      CalendarModal.close();
      CalendarUI.render();
    });
  },

  bindModeToggle() {
    document.querySelectorAll('.btn-mode').forEach(btn => {
      btn.addEventListener('click', () => {
        CalendarModal.setMode(btn.dataset.mode);
      });
    });
  },

  bindContainer() {
    const container = document.getElementById('calendar-container');

    container.addEventListener('click', (e) => {
      // Éditer
      const editBtn = e.target.closest('.edit-task');
      if (editBtn) {
        const task = Storage.getTasks().find(t => t.id === editBtn.dataset.id);
        if (task) CalendarModal.open(task);
        return;
      }

      // Supprimer
      const deleteBtn = e.target.closest('.task-delete');
      if (deleteBtn) {
        ConfirmModal.open(
          'Supprimer cette tâche ?',
          () => {
            Storage.deleteTask(deleteBtn.dataset.id);
            CalendarUI.render();
          }
        );
      }
    });
  }
};
