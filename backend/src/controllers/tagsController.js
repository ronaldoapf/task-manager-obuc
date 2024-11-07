const { Tags } = require('../models')

const createTag = async (req, res) => {
  try {
    const { label } = req.body
    
    const tag = await Tags.create({ label })

    return res.status(201).json(tag)
  } catch (error) { 
    return res.status(500).json({ error: error.message });
  }
}

const getAllTags = async (req, res) => {
  try {
    const tags = await Tags.findAll()
    return res.status(200).json(tags);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const deleteTag = async (req, res) => {
  try {
      const tag = await Tags.findByPk(req.params.id);

      if (tag) {
        await tag.destroy();

        return res.status(204).send();
      } else {
        return res.status(404).json({ error: 'Tag not found' });
      }
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTag,
  getAllTags,
  deleteTag
}