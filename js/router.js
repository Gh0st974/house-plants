// 📄 Fichier : js/router.js
// 🎯 Rôle : Navigation entre les pages via la bottom bar

const Router = {

  currentPage: 'plants',

  // Initialise la navigation
  init() {
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        this.navigate(page);
      });
    });
  },

  // Navigue vers une page
  navigate(page) {
    // Masque toutes les pages
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));

    // Affiche la page cible
    const target = document.getElementById(`page-${page}`);
    if (target) target.classList.remove('hidden');

    // Met à jour la nav
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === page);
    });

    this.currentPage = page;

    // Déclenche le rendu de la page
    document.dispatchEvent(new CustomEvent('page:change', { detail: { page } }));
  }
};
