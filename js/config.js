// 📄 Fichier : js/config.js
// 🎯 Rôle : Constantes globales, couleurs des mois, clés localStorage

const CONFIG = {

  // Clés localStorage
  STORAGE_PLANTS: 'hp_plants',
  STORAGE_TASKS:  'hp_tasks',

  // Mois (index 0 = Janvier)
  MONTHS: [
    { key: 'JAN', label: 'Jan', full: 'Janvier',   color: '#90CAF9' },
    { key: 'FEV', label: 'Fév', full: 'Février',   color: '#CE93D8' },
    { key: 'MAR', label: 'Mar', full: 'Mars',       color: '#A5D6A7' },
    { key: 'AVR', label: 'Avr', full: 'Avril',      color: '#80DEEA' },
    { key: 'MAI', label: 'Mai', full: 'Mai',        color: '#FFCC80' },
    { key: 'JUN', label: 'Jun', full: 'Juin',       color: '#EF9A9A' },
    { key: 'JUL', label: 'Jul', full: 'Juillet',    color: '#FFF59D' },
    { key: 'AOU', label: 'Aoû', full: 'Août',       color: '#FFAB91' },
    { key: 'SEP', label: 'Sep', full: 'Septembre',  color: '#BCAAA4' },
    { key: 'OCT', label: 'Oct', full: 'Octobre',    color: '#FF8A65' },
    { key: 'NOV', label: 'Nov', full: 'Novembre',   color: '#78909C' },
    { key: 'DEC', label: 'Déc', full: 'Décembre',   color: '#80CBC4' },
  ],

  // Retourne un mois par son index (0-11)
  getMonth(index) {
    return this.MONTHS[index] || null;
  },

  // Retourne un mois par sa clé (ex: 'JAN')
  getMonthByKey(key) {
    return this.MONTHS.find(m => m.key === key) || null;
  },

  // Index du mois actuel (0-11)
  get currentMonthIndex() {
    return new Date().getMonth();
  }
};
