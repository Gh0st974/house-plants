// 📄 Fichier : js/settings/settings.events.js
// 🎯 Rôle : Événements de la page paramètres

const SettingsEvents = {

  init() {
    this.bindPageChange();
  },

  bindPageChange() {
    document.addEventListener('page:change', (e) => {
      if (e.detail.page === 'settings') {
        SettingsUI.render();
        this.bindButtons();
      }
    });
  },

  bindButtons() {
    document.getElementById('btn-export').addEventListener('click', () => {
      Settings.exportData();
    });

    document.getElementById('btn-import').addEventListener('click', () => {
      document.getElementById('input-import').click();
    });

    document.getElementById('input-import').addEventListener('change', (e) => {
      Settings.importData(
        e.target.files[0],
        () => {
          alert('Import réussi ! Vos données ont été restaurées.');
          Router.navigate('plants');
        },
        (msg) => {
          alert(`Erreur lors de l'import : ${msg}`);
        }
      );
    });
  }
};
