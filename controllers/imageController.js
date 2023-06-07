const Image = require("../models/Image");

const saveImage = async (req, res) => {
  const image = req.body.image;
  try {
    const foundImage = await Image.find({ userId: req.userId });
    if (foundImage) {
      await Image.findOneAndDelete({ userId: req.userId });
    }

    const createdImage = await Image.create({
      image: image,
      userId: req.userId
    });

    res.status(201).json({ url: createdImage.image });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

const getImage = async (req, res) => {
  try {
    const foundImage = await Image.find({ userId: req.userId });

    if (foundImage.length === 0) {
      const defaultImage = await Image.find({ _id: "6480c5db63c613be4a72be18"});
      return res.json(defaultImage);
    }

    res.json(foundImage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  saveImage,
  getImage
};