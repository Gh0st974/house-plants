// 📄 Fichier : js/app.js
// 🎯 Rôle : Point d'entrée — initialise tous les modules

document.addEventListener('DOMContentLoaded', () => {

  // Modale de confirmation globale
  window.ConfirmModal = {
    _callback: null,

    open(message, onConfirm) {
      this._callback = onConfirm;
      document.getElementById('confirm-message').textContent = message;
      document.getElementById('modal-confirm').classList.remove('hidden');
    },

    close() {
      document.getElementById('modal-confirm').classList.add('hidden');
      this._callback = null;
    }
  };

  document.getElementById('btn-confirm-cancel').addEventListener('click', () => {
    ConfirmModal.close();
  });

  document.getElementById('btn-confirm-ok').addEventListener('click', () => {
    if (ConfirmModal._callback) ConfirmModal._callback();
    ConfirmModal.close();
  });

  document.getElementById('modal-confirm').addEventListener('click', (e) => {
    if (e.target.id === 'modal-confirm') ConfirmModal.close();
  });

  // Init modules
  Router.init();
  PlantsUI.init();
  PlantsEvents.init();
  PlantsEvents.bindContainer();
  CalendarUI.init();
  CalendarEvents.init();
  SettingsUI.init();
  SettingsEvents.init();

  // Affiche la page initiale
  Router.navigate('plants');

  // Enregistrement du Service Worker (PWA)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }

});
