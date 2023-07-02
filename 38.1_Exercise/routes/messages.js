const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");

/**
 * GET /messages/:id - get detail of a message.
 * Returns the message details if the currently logged-in user is either the sender or the recipient.
 */
router.get("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    const message = await Message.get(req.params.id);
    if (
      req.user.username === message.from_user.username ||
      req.user.username === message.to_user.username
    ) {
      return res.json({ message });
    } else {
      throw new Error("Unauthorized");
    }
  } catch (err) {
    return next(err);
  }
});

/**
 * POST /messages - post a new message.
 * Creates a new message with the provided data and returns the message details.
 */
router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const { to_username, body } = req.body;
    const message = await Message.create({
      from_username: req.user.username,
      to_username,
      body,
    });
    return res.status(201).json({ message });
  } catch (err) {
    return next(err);
  }
});

/**
 * POST /messages/:id/read - mark a message as read.
 * Marks the message as read if the currently logged-in user is the recipient.
 */
router.post(
  "/:id/read",
  ensureLoggedIn,
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const message = await Message.markRead(req.params.id);
      return res.json({ message });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
