const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks()
{
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function renderTasks()
{
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = task.text;
    span.addEventListener('click', () => toggleTask(index));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => deleteTask(index));

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}
function addTask(text)
{
  tasks.push({ text, completed: false });
  saveTasks();
  renderTasks();
}
function toggleTask(index)
{
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}
function deleteTask(index)
{
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== '') {
    addTask(text);
    input.value = '';
  }
});
renderTasks();
