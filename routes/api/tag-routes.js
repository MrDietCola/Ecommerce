const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// router.get('/', (req, res) => {
//   // find all tags
//   // be sure to include its associated Product data
// });

// router.get('/:id', (req, res) => {
//   // find a single tag by its `id`
//   // be sure to include its associated Product data
// });

// router.post('/', (req, res) => {
//   // create a new tag
// });

// router.put('/:id', (req, res) => {
//   // update a tag's name by its `id` value
// });

// router.delete('/:id', (req, res) => {
//   // delete on tag by its `id` value
// });

// GET all travellers
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        { model: Product, through: ProductTag, as: 'tag_by_productTag' },
      ]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one Tag
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        { model: Product, through: ProductTag, as: 'tag_by_productTag' },
      ]    
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new Tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a Tag
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a Tag
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
