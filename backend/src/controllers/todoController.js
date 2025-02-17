const Todo = require('../models/Todo');
exports.createTodo = async (req, res) => {
    try {
        const { title, description, deadline } = req.body;

        if (!title || !deadline) return res.status(400).json({ message: 'Title and deadline are required' });

        const newTodo = new Todo({ title, description, deadline, userId: req.userId });
        await newTodo.save();

        res.status(201).json({ message: 'TODO created successfully', todo: newTodo });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.getTodos = async (req, res) => {
    try {
        const { search, status, excludeCompleted, sortBy } = req.query;
        let query = {};

        // Search by title or description (case-insensitive)
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter by status
        if (status) {
            query.status = status;
        }

        // Exclude completed tasks if requested
        if (excludeCompleted === 'true') {
            query.status = { $ne: 'COMPLETE' };
        }

        // Sorting options
        let sortOption = { deadline: 1 }; // Default: earliest deadline first
        if (sortBy === 'status') {
            sortOption = { status: 1 }; // Sort alphabetically by status
        } else if (sortBy === 'latest') {
            sortOption = { createdAt: -1 }; // Newest first
        }

        const todos = await Todo.find(query).sort(sortOption);
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateTodoStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        // Ensure status is valid
        if (!['ACTIVE', 'IN_PROGRESS', 'COMPLETE', 'EXPIRED'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        // Find the TODO and update status
        const updatedTodo = await Todo.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({ message: 'TODO not found' });
        }

        res.json({ message: 'TODO status updated', todo: updatedTodo });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) return res.status(404).json({ message: 'TODO not found' });

        res.json({ message: 'TODO deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};