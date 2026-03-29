// 📄 Fichier : js/plants/plants.js
// 🎯 Rôle : Logique métier des plantes (filtrage, tri, vue active)

const Plants = {

  currentView: 'list',   // 'list' | 'grid'
  searchQuery: '',

  // Retourne les plantes filtrées par la recherche
  getFiltered() {
    const all = Storage.getPlants();
    if (!this.searchQuery.trim()) return all;
    const q = this.searchQuery.toLowerCase();
    return all.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.species && p.species.toLowerCase().includes(q))
    );
  },

  // Bascule la vue liste / grille
  setView(view) {
    this.currentView = view;
  },

  // Met à jour la recherche
  setSearch(query) {
    this.searchQuery = query;
  }
};
