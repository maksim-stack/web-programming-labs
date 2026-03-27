import type { Todo, CreateTodoDto, UpdateTodoDto } from '../types/todo'

const BASE_URL = 'http://localhost:3001/todos'

export const todosApi = {
    getAll: async (): Promise<Todo[]> => {
        const res = await fetch(BASE_URL)

        if (!res.ok) {
            throw new Error('Failed to fetch todos')
        }

        return res.json()
    },

    create: async (data: CreateTodoDto): Promise<Todo> => {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return res.json()
    },

    update: async (id: number, data: UpdateTodoDto): Promise<Todo> => {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return res.json()
    },

    remove: async (id: number): Promise<void> => {
        const res = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        })

        if (!res.ok) {
            throw new Error('Failed to delete todo')
        }
    },
}