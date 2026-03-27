import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { todosApi } from './api/todos'
import { useState } from 'react'

import './App.css'

function App() {
  const queryClient = useQueryClient()
  const [newTitle, setNewTitle] = useState('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: todosApi.getAll,
  })

  const addTodoMutation = useMutation({
    mutationFn: (title: string) => todosApi.create({ title, completed: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      setNewTitle('')
    }
  })

  const updateTodoMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number, completed: boolean }) => 
      todosApi.update(id, { completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const removeTodoMutation = useMutation({
    mutationFn: (id: number) => todosApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading todos</div>
  }

  return (
    <div className="App">
      <h1>Todos</h1>

      <div className="input-container">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Нове завдання"
        />
        <button
          onClick={() => addTodoMutation.mutate(newTitle)}
          disabled={addTodoMutation.isPending || !newTitle.trim()}
        >
          {addTodoMutation.isPending ? 'Додаємо...' : 'Додати'}
        </button>
      </div>

      <ul>
        {data?.map((todo) => (
          <li 
            key={todo.id} 
            className={todo.completed ? 'completed' : ''}
          >
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={(e) => updateTodoMutation.mutate({ id: todo.id, completed: e.target.checked })} 
            />
            {todo.title}
            <button onClick={() => removeTodoMutation.mutate(todo.id)} disabled={removeTodoMutation.isPending}>
              {removeTodoMutation.isPending ? 'Видаляємо...' : 'Видалити'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App