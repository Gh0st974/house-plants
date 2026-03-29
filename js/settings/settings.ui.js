// 📄 Fichier : js/settings/settings.ui.js
// 🎯 Rôle : Rendu DOM de la page paramètres

const SettingsUI = {

  container: null,

  init() {
    this.container = document.getElementById('settings-container');
  },

  render() {
    this.container.innerHTML = `
      <div class="settings-list">

        <div class="settings-card">
          <div class="settings-card-info">
            <div class="settings-card-title">Exporter mes données</div>
            <div class="settings-card-desc">Télécharge un fichier JSON avec toutes vos plantes et tâches.</div>
          </div>
          <button class="btn btn-primary" id="btn-export">Exporter</button>
        </div>

        <div class="settings-card">
          <div class="settings-card-info">
            <div class="settings-card-title">Importer des données</div>
            <div class="settings-card-desc">Restaure vos données depuis un fichier JSON exporté précédemment. Les données actuelles seront remplacées.</div>
          </div>
          <button class="btn btn-secondary" id="btn-import">Importer</button>
          <input type="file" id="input-import" accept=".json" />
        </div>

      </div>
    `;
  }
};
