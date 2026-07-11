const { Editorial } = require('../models/Editorial');
const { Leader } = require('../models/Leader');

const getEditorsPicks = async (req, res, next) => {
  try {
    const editorsPicks = await Editorial.find({ isEditorsPick: true })
      .sort({ createdAt: -1 })
      .limit(3);

    res.status(200).json({ success: true, count: editorsPicks.length, data: editorsPicks });
  } catch (error) {
    next(error);
  }
};

const getLeadershipTeam = async (req, res, next) => {
  try {
    const leadership = await Leader.find().sort({ order: 1 });

    res.status(200).json({ success: true, count: leadership.length, data: leadership });
  } catch (error) {
    next(error);
  }
};

const getLatestNews = async (req, res, next) => {
  try {
    const latestNews = await Editorial.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({ success: true, count: latestNews.length, data: latestNews });
  } catch (error) {
    next(error);
  }
};

module.exports = { getEditorsPicks, getLeadershipTeam, getLatestNews };
