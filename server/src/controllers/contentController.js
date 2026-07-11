const { Editorial } = require('../models/Editorial');
const { Leader } = require('../models/Leader');

const getEditorsPicks = async (req, res, next) => {
  try {
    const editorsPicks = await Editorial.find({ isEditorsPick: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    res.status(200).json({ success: true, count: editorsPicks.length, data: editorsPicks });
  } catch (error) {
    next(error);
  }
};

const getLeadershipTeam = async (req, res, next) => {
  try {
    const leadership = await Leader.find().sort({ displayOrder: 1 }).lean();

    res.status(200).json({ success: true, count: leadership.length, data: leadership });
  } catch (error) {
    next(error);
  }
};

const getGeneralContent = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const articles = await Editorial.find(filter).sort({ createdAt: -1 }).lean();

    res.status(200).json({ success: true, count: articles.length, data: articles });
  } catch (error) {
    next(error);
  }
};

module.exports = { getEditorsPicks, getLeadershipTeam, getGeneralContent };
