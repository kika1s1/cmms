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
