// 📄 Fichier : js/storage.js
// 🎯 Rôle : CRUD localStorage pour plantes et tâches

const Storage = {

  // ---- PLANTES ----

  getPlants() {
    const raw = localStorage.getItem(CONFIG.STORAGE_PLANTS);
    return raw ? JSON.parse(raw) : [];
  },

  savePlants(plants) {
    localStorage.setItem(CONFIG.STORAGE_PLANTS, JSON.stringify(plants));
  },

  addPlant(plant) {
    const plants = this.getPlants();
    plant.id = Date.now().toString();
    plant.createdAt = new Date().toISOString();
    plants.push(plant);
    this.savePlants(plants);
    return plant;
  },

  updatePlant(id, data) {
    const plants = this.getPlants();
    const index = plants.findIndex(p => p.id === id);
    if (index === -1) return null;
    plants[index] = { ...plants[index], ...data, id };
    this.savePlants(plants);
    return plants[index];
  },

  deletePlant(id) {
    const plants = this.getPlants().filter(p => p.id !== id);
    this.savePlants(plants);
  },

  getPlantById(id) {
    return this.getPlants().find(p => p.id === id) || null;
  },

  // ---- TÂCHES ----

  getTasks() {
    const raw = localStorage.getItem(CONFIG.STORAGE_TASKS);
    return raw ? JSON.parse(raw) : [];
  },

  saveTasks(tasks) {
    localStorage.setItem(CONFIG.STORAGE_TASKS, JSON.stringify(tasks));
  },

  addTask(task) {
    const tasks = this.getTasks();
    task.id = Date.now().toString();
    task.createdAt = new Date().toISOString();
    tasks.push(task);
    this.saveTasks(tasks);
    return task;
  },

  updateTask(id, data) {
    const tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], ...data, id };
    this.saveTasks(tasks);
    return tasks[index];
  },

  deleteTask(id) {
    const tasks = this.getTasks().filter(t => t.id !== id);
    this.saveTasks(tasks);
  },

  // ---- EXPORT / IMPORT ----

  exportAll() {
    return JSON.stringify({
      plants: this.getPlants(),
      tasks:  this.getTasks(),
      exportedAt: new Date().toISOString()
    }, null, 2);
  },

  importAll(jsonString) {
    const data = JSON.parse(jsonString);
    if (!data.plants || !data.tasks) throw new Error('Format invalide');
    this.savePlants(data.plants);
    this.saveTasks(data.tasks);
  }
};
