const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Note {
    id: string;
    title: string;
    content: string;
    summary?: string;
    created_at: string;
}

export const noteApi = {
    getAll: async (): Promise<Note[]> => {
        const res = await fetch(`${API_URL}/notes`);
        if (!res.ok) throw new Error('Failed to fetch notes');
        return res.json();
    },

    getOne: async (id: string): Promise<Note> => {
        const res = await fetch(`${API_URL}/notes/${id}`);
        if (!res.ok) throw new Error('Failed to fetch note');
        return res.json();
    },

    create: async (title: string, content: string): Promise<Note> => {
        const res = await fetch(`${API_URL}/notes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
        });
        if (!res.ok) throw new Error('Failed to create note');
        return res.json();
    },

    summarize: async (id: string): Promise<Note> => {
        const res = await fetch(`${API_URL}/notes/${id}/summarize`, {
            method: 'POST',
        });
        if (!res.ok) throw new Error('Failed to summarize note');
        return res.json();
    },

    delete: async (id: string): Promise<{ id: string }> => {
        const res = await fetch(`${API_URL}/notes/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete note');
        return res.json();
    },
};
