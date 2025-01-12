const CapsuleModel = require("../models/capsule.model");
const { NotFoundError } = require("../../utils/errors");
const logger = require("../../utils/logger");

class CapsuleService {
  async create(userId, capsuleData) {
    try {
      const capsule = new CapsuleModel({
        userId,
        ...capsuleData,
        shareableLink: this.generateUniqueLink(),
      });

      await capsule.save();
      return capsule;
    } catch (error) {
      logger.error("Error creating capsule:", error);
      throw error;
    }
  }

  async findByUserId(userId) {
    try {
      return await CapsuleModel.find({ userId }).sort({ createdAt: -1 });
    } catch (error) {
      logger.error("Error finding capsules:", error);
      throw error;
    }
  }

  async update(userId, capsuleId, updates) {
    const capsule = await CapsuleModel.findOne({ _id: capsuleId, userId });

    if (!capsule) {
      throw new NotFoundError("Capsule not found");
    }

    Object.assign(capsule, updates);
    await capsule.save();
    return capsule;
  }

  async delete(capsuleId, userId) {
    try {
      const capsule = await CapsuleModel.findOneAndDelete({
        _id: capsuleId,
        userId,
      });

      if (!capsule) {
        logger.warn(`Capsule not found or unauthorized: ${capsuleId}`);
        return null;
      }

      logger.info(`Capsule deleted successfully: ${capsuleId}`);
      return capsule;
    } catch (error) {
      logger.error(`Error deleting capsule: ${error.message}`);
      throw error;
    }
  }

  async findByLink(shareableLink) {
    try {
      const capsule = await CapsuleModel.findOne({
        shareableLink,
        releaseDate: { $lte: new Date() },
        isReleased: true,
      });

      if (!capsule) {
        logger.warn(`Capsule not found with link: ${shareableLink}`);
        return null;
      }

      logger.info(`Capsule retrieved by link: ${shareableLink}`);
      return capsule;
    } catch (error) {
      logger.error(`Error finding capsule by link: ${error.message}`);
      throw error;
    }
  }

  generateUniqueLink() {
    return Math.random().toString(36).substring(2, 15);
  }

  async findById(capsuleId) {
    try {
      const capsule = await CapsuleModel.findById(capsuleId);
      if (!capsule) {
        throw new NotFoundError("Capsule not found");
      }
      return capsule;
    } catch (error) {
      logger.error("Error finding capsule by ID:", error);
      throw error;
    }
  }
}

module.exports = new CapsuleService();
