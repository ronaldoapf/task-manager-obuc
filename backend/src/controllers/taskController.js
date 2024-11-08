const { Tasks, Tags } = require('../models');

const createTask = async (req, res) => {
	try {
		const { title, tag, description, status, assignedTo } = req.body;
		
		const task = await Tasks.create({ 
			title, 
			status, 
			assignedTo, 
			tagId: tag, 
			description, 
		});

		return res.status(201).json(task);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const getAllTasks = async (req, res) => {
	try {
		const tasks = await Tasks.findAll({
			include: [
				{
					model: Tags,
					as: 'tags',
					attributes: ['id', 'label'],
				},
			],
		});
		
		return res.status(200).json(tasks);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const getTaskById = async (req, res) => {
	try {
		const task = await Task.findByPk(req.params.id);
		
		if (task) {
			return res.status(200).json(task);
		} else {
			return res.status(404).json({ error: 'Task not found' });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const updateTask = async (req, res) => {
	try {
		const { description, status, assignedTo } = req.body;
		
		const task = await Tasks.findByPk(req.params.id);
		
		if (task) {
			await task.update({ description, status, assignedTo });
			
			await task.reload();
			
			return res.status(200).json(task);
		} else {
			return res.status(404).json({ error: 'Task not found' });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const deleteTask = async (req, res) => {
	try {
		const task = await Tasks.findByPk(req.params.id);
		
		if (task) {
			await task.destroy();
			
			return res.status(204).send();
		} else {
			return res.status(404).json({ error: 'Task not found' });
		}
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = {
	createTask,
	getAllTasks,
	getTaskById,
	updateTask,
	deleteTask
}