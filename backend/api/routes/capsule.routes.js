const express = require("express");
const { auth } = require("../middlewares/auth.middleware");
const { rateLimiter } = require("../middlewares/rateLimiter.middleware");
const capsuleController = require("../controllers/capsule.controller");

const router = express.Router();

router.use(auth);
router.use(rateLimiter);

router
  .route("/")
  .post(capsuleController.createCapsule)
  .get(capsuleController.getMyCapsules);

router.get("/shared/:link", capsuleController.getCapsuleByLink);
router
  .route("/:id")
  .get(capsuleController.getCapsuleById)
  .put(capsuleController.updateCapsule)
  .delete(capsuleController.deleteCapsule);

module.exports = router;
