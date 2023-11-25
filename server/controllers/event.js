import errorHandler from "../utils/error.js";
import Event from "../models/Event.js";

export const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    return res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(errorHandler(404, "event not found!"));
  }

  if (req.user.id !== event.userRef) {
    return next(errorHandler(401, "You can only delete your own event!"));
  }

  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json("event has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return next(errorHandler(404, "Event not found!"));
  }
  if (req.user.id !== event.userRef) {
    return next(errorHandler(401, "You can only update your own Events!"));
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
