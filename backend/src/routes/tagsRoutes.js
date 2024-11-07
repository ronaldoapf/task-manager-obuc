const { Router } = require('express');
const tagsController = require('../controllers/tagsController');

const router = Router();

router.route('/tags')
  .get(tagsController.getAllTags)
  .post(tagsController.createTag)

router.route('/tags/:id')
  .delete(tagsController.deleteTag)

module.exports = router;
