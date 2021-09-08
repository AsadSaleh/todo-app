// Fungsi untuk mengambil daftar `todos` dari local storage.
export function loadTodos() {
  return JSON.parse(localStorage.getItem("todos")) ?? [];
}

// Fungsi untuk menyimpan daftar `todos` ke dalam local storage.
export function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
