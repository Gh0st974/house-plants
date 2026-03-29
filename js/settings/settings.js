// 📄 Fichier : js/settings/settings.js
// 🎯 Rôle : Logique métier des paramètres (export/import)

const Settings = {

  // Exporte les données en fichier JSON
  exportData() {
    const json = Storage.exportAll();
    const blob = new Blob([json], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `house-plants-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  // Importe les données depuis un fichier JSON
  importData(file, onSuccess, onError) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        Storage.importAll(e.target.result);
        onSuccess();
      } catch (err) {
        onError(err.message);
      }
    };
    reader.readAsText(file);
  }
};
