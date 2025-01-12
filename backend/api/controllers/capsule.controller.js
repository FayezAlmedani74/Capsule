const capsuleService = require("../services/capsule.service");
const { validateCapsule } = require("../validators/capsule.validator");
const { asyncHandler } = require("../middlewares/async.middleware");

exports.createCapsule = asyncHandler(async (req, res) => {
  const { error } = validateCapsule(req.body);
  if (error) {
    console.error("Validation error:", error.details);
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }

  const capsule = await capsuleService.create(req.user.id, req.body);

  res.status(201).json({
    status: "success",
    data: { capsule },
  });
});

exports.getMyCapsules = asyncHandler(async (req, res) => {
  const capsules = await capsuleService.findByUserId(req.user.id);

  res.json({
    status: "success",
    data: { capsules },
  });
});

exports.updateCapsule = asyncHandler(async (req, res) => {
  const { error } = validateCapsule(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: error.details[0].message,
    });
  }

  const capsule = await capsuleService.update(
    req.user.id,
    req.params.id,
    req.body
  );
  if (!capsule) {
    return res.status(404).json({
      status: "error",
      message: "Capsule Not Found",
    });
  }

  res.json({
    status: "success",
    data: { capsule },
  });
});

exports.deleteCapsule = asyncHandler(async (req, res) => {
  const capsule = await capsuleService.delete(req.params.id, req.user.id);
  if (!capsule) {
    return res.status(404).json({
      status: "error",
      message: "Capsule Not Found",
    });
  }

  res.json({
    status: "success",
    message: "Capsule Deleted Successfully",
  });
});

exports.getCapsuleByLink = asyncHandler(async (req, res) => {
  console.log("Received link:", req.params.link);
  const capsule = await capsuleService.findByLink(req.params.link);
  if (!capsule) {
    return res.status(404).json({
      status: "error",
      message: "Capsule Not Found",
    });
  }

  res.json({
    status: "success",
    data: { capsule },
  });
});

exports.getCapsuleById = asyncHandler(async (req, res) => {
  const capsule = await capsuleService.findById(req.params.id);
  if (!capsule) {
    return res.status(404).json({
      status: "error",
      message: "Capsule Not Found",
    });
  }

  res.json({
    status: "success",
    data: { capsule },
  });
});
