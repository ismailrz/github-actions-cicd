import { useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build a todo app', completed: false },
    { id: 3, text: 'Deploy with GitHub Actions', completed: false },
  ])
  const [filter, setFilter] = useState('all')

  function addTodo(text) {
    setTodos([...todos, { id: Date.now(), text, completed: false }])
  }

  function toggleTodo(id) {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function deleteTodo(id) {
    setTodos(todos.filter(t => t.id !== id))
  }

  function clearCompleted() {
    setTodos(todos.filter(t => !t.completed))
  }

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const activeCount = todos.filter(t => !t.completed).length

  return (
    <div className="app">
      <h1>Todo List</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList todos={filtered} onToggle={toggleTodo} onDelete={deleteTodo} />
      <footer className="footer">
        <span>{activeCount} item{activeCount !== 1 ? 's' : ''} left</span>
        <div className="filters">
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              className={filter === f ? 'active' : ''}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <button onClick={clearCompleted}>Clear completed</button>
      </footer>
    </div>
  )
}

export default App
