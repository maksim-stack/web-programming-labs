import { useQuery } from '@tanstack/react-query'
import { todosApi } from './api/todos'

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: todosApi.getAll
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