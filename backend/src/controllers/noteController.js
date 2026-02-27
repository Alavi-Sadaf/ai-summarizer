const supabase = require('../config/supabase');
const { summarizeNote: getAiSummary } = require('../services/aiService');

// @desc    Get all notes
// @route   GET /api/notes
const getNotes = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('notes')
            .select('*')
            .eq('user_id', req.user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single note
// @route   GET /api/notes/:id
const getNoteById = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('notes')
            .select('*')
            .eq('id', req.params.id)
            .eq('user_id', req.user.id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') return res.status(404).json({ message: 'Note not found' });
            throw error;
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a note
// @route   POST /api/notes
const createNote = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    try {
        console.log('📝 Creating note:', { title });
        const summary = await getAiSummary(content);
        console.log('🤖 AI Summary status:', summary.startsWith('Failed') ? 'Failed (using fallback)' : 'Success');

        const { data, error } = await supabase
            .from('notes')
            .insert([{ title, content, summary, user_id: req.user.id }])
            .select()
            .single();

        if (error) {
            console.error('❌ Supabase Insert Error:', error);
            throw error;
        }
        
        console.log('✅ Note saved successfully');
        res.status(201).json(data);
    } catch (error) {
        console.error('💥 Controller Error:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Summarize an existing note
// @route   POST /api/notes/:id/summarize
const summarizeNote = async (req, res) => {
    try {
        // 1. Get the note
        const { data: note, error: fetchError } = await supabase
            .from('notes')
            .select('content')
            .eq('id', req.params.id)
            .eq('user_id', req.user.id)
            .single();

        if (fetchError) {
            if (fetchError.code === 'PGRST116') return res.status(404).json({ message: 'Note not found' });
            throw fetchError;
        }

        // 2. Summarize
        const summary = await getAiSummary(note.content);

        // 3. Update note
        const { data: updatedNote, error: updateError } = await supabase
            .from('notes')
            .update({ summary })
            .eq('id', req.params.id)
            .eq('user_id', req.user.id)
            .select()
            .single();

        if (updateError) throw updateError;

        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
const deleteNote = async (req, res) => {
    try {
        const { error } = await supabase
            .from('notes')
            .delete()
            .eq('id', req.params.id)
            .eq('user_id', req.user.id);

        if (error) throw error;
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getNotes,
    getNoteById,
    createNote,
    summarizeNote,
    deleteNote,
};
