const cron = require('node-cron');
const Todo = require('../models/Todo');

// Run every hour to check for expired tasks
cron.schedule('0 * * * *', async () => {
    try {
        const now = new Date();
        const updatedTasks = await Todo.updateMany(
            { dueDate: { $lt: now }, status: { $ne: 'EXPIRED' } },
            { $set: { status: 'EXPIRED' } }
        );

        console.log(`Task Expiry Check: ${updatedTasks.modifiedCount} tasks marked as EXPIRED`);
    } catch (error) {
        console.error('Error updating expired tasks:', error);
    }
});

module.exports = {};
