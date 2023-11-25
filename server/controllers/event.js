import Event from "../models/Event.js";

export const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    return res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};
