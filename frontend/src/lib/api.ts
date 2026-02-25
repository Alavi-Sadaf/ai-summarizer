const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Note {
    id: string;
    title: string;
    content: string;
    summary?: string;
    created_at: string;
}

export const getNotes = async (): Promise<Note[]> => {
    return fetch(`${BASE_URL}/notes`).then(res => {
        if (!res.ok) throw new Error('Failed to fetch notes');
        return res.json();
    });
};

export const createNote = async (data: { title: string; content: string }): Promise<Note> => {
    return fetch(`${BASE_URL}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(res => {
        if (!res.ok) throw new Error('Failed to create note');
        return res.json();
    });
};

export const getNote = async (id: string): Promise<Note> => {
    return fetch(`${BASE_URL}/notes/${id}`).then(res => {
        if (!res.ok) throw new Error('Failed to fetch note');
        return res.json();
    });
};

export const summarizeNote = async (id: string): Promise<Note> => {
    return fetch(`${BASE_URL}/notes/${id}/summarize`, {
        method: "POST"
    }).then(res => {
        if (!res.ok) throw new Error('Failed to summarize note');
        return res.json();
    });
};

export const deleteNote = async (id: string): Promise<{ id: string }> => {
    return fetch(`${BASE_URL}/notes/${id}`, {
        method: 'DELETE',
    }).then(res => {
        if (!res.ok) throw new Error('Failed to delete note');
        return res.json();
    });
};
