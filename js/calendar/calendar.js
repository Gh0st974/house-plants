// 📄 Fichier : js/calendar/calendar.js
// 🎯 Rôle : Logique métier des tâches (tri, groupement, prochain mois)

const Calendar = {

  // Retourne les mois couverts par une tâche (tableau d'index 0-11)
  getTaskMonthIndexes(task) {
    if (task.mode === 'range') {
      const from = parseInt(task.monthFrom);
      const to   = parseInt(task.monthTo);
      if (isNaN(from) || isNaN(to)) return [];
      const indexes = [];
      if (from <= to) {
        for (let i = from; i <= to; i++) indexes.push(i);
      } else {
        // Plage qui chevauche l'année (ex: Nov → Fév)
        for (let i = from; i <= 11; i++) indexes.push(i);
        for (let i = 0; i <= to; i++) indexes.push(i);
      }
      return indexes;
    }
    // Mode individuel
    return (task.months || []).map(m => parseInt(m));
  },

  // Retourne le prochain mois actif d'une tâche (index 0-11), ou null
  getNextMonthIndex(task) {
    const current = CONFIG.currentMonthIndex;
    const indexes = this.getTaskMonthIndexes(task);
    if (indexes.length === 0) return null;

    // Cherche le prochain mois >= mois actuel dans l'année
    const future = indexes.filter(i => i >= current).sort((a, b) => a - b);
    if (future.length > 0) return future[0];

    // Sinon, premier mois de l'année prochaine
    return indexes.sort((a, b) => a - b)[0];
  },

  // Groupe les tâches par plante
  // Retourne : [ { plantId, plant|null, tasks: [] }, ... ]
  groupByPlant(tasks) {
    const groups = {};

    tasks.forEach(task => {
      const key = task.plantId || 'all';
      if (!groups[key]) {
        groups[key] = {
          plantId: key,
          plant: key === 'all' ? null : Storage.getPlantById(key),
          tasks: []
        };
      }
      groups[key].tasks.push(task);
    });

    // Trie les tâches dans chaque groupe par prochain mois
    Object.values(groups).forEach(group => {
      group.tasks.sort((a, b) => {
        const na = this.getNextMonthIndex(a) ?? 99;
        const nb = this.getNextMonthIndex(b) ?? 99;
        return na - nb;
      });
    });

    // Groupe "all" en premier, puis par nom de plante
    const sorted = Object.values(groups).sort((a, b) => {
      if (a.plantId === 'all') return -1;
      if (b.plantId === 'all') return  1;
      const na = a.plant ? a.plant.name : '';
      const nb = b.plant ? b.plant.name : '';
      return na.localeCompare(nb);
    });

    return sorted;
  },

  // Retourne toutes les tâches groupées
  getGrouped() {
    const tasks = Storage.getTasks();
    return this.groupByPlant(tasks);
  }
};
