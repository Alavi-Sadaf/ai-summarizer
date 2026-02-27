const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Note {
    id: string;
    title: string;
    content: string;
    summary?: string;
    created_at: string;
    user_id: string;
}

const getHeaders = (token?: string) => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

export const getNotes = async (token?: string): Promise<Note[]> => {
    return fetch(`${BASE_URL}/notes`, {
        headers: getHeaders(token),
    }).then(res => {
        if (!res.ok) throw new Error('Failed to fetch notes');
        return res.json();
    });
};

export const createNote = async (data: { title: string; content: string }, token?: string): Promise<Note> => {
    return fetch(`${BASE_URL}/notes`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(data)
    }).then(res => {
        if (!res.ok) throw new Error('Failed to create note');
        return res.json();
    });
};

export const getNote = async (id: string, token?: string): Promise<Note> => {
    return fetch(`${BASE_URL}/notes/${id}`, {
        headers: getHeaders(token),
    }).then(res => {
        if (!res.ok) throw new Error('Failed to fetch note');
        return res.json();
    });
};

export const summarizeNote = async (id: string, token?: string): Promise<Note> => {
    return fetch(`${BASE_URL}/notes/${id}/summarize`, {
        method: "POST",
        headers: getHeaders(token),
    }).then(res => {
        if (!res.ok) throw new Error('Failed to summarize note');
        return res.json();
    });
};

export const deleteNote = async (id: string, token?: string): Promise<{ id: string }> => {
    return fetch(`${BASE_URL}/notes/${id}`, {
        method: 'DELETE',
        headers: getHeaders(token),
    }).then(res => {
        if (!res.ok) throw new Error('Failed to delete note');
        return res.json();
    });
};
