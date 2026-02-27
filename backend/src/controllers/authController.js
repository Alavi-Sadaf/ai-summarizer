const supabase = require('../config/supabase');

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
    const { email, password } = req.body;
    // Log incoming registration payload for debugging
    console.log('Register request payload:', { email, password });

    if (!email || !password) {
        console.warn('Missing email or password in registration request');
        return res.status(400).json({ message: 'Please add all fields' });
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            console.error('Supabase signUp error:', error);
            return res.status(400).json({ message: error.message });
        }

        // If signUp does not return a session (e.g., email confirmation required), sign in immediately
        let session = data.session;
        if (!session) {
            const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (signInError) {
                return res.status(400).json({ message: signInError.message });
            }
            session = signInData.session;
        }

        // Successful registration – respond with user and session
        res.status(201).json({
            user: data.user,
            session,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return res.status(401).json({ message: error.message });
        }

        res.status(200).json({
            user: data.user,
            session: data.session,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/me
const getMe = async (req, res) => {
    res.status(200).json(req.user);
};

// @desc    Logout user
// @route   POST /api/auth/logout
const logoutUser = async (req, res) => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser,
};
