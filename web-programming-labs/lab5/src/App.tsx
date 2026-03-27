import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { todosApi } from './api/todos'
import { useState } from 'react'

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

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading todos</div>
  }

  return (
    <div>
      <h1>Todos</h1>

      <div>
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
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          >
          {todo.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App