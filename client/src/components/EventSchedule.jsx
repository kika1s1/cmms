import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";

import PropTypes from "prop-types";

export default function EventSchedule({ event }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/events/${event._id}`}>
        <img
          src={event.imageUrls[0]}
          alt="event cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {event.title}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {event.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {event.description}
          </p>

          <div className="text-slate-700 flex gap-4">
            <div>
              <span className="flex gap-2 justify-center text-green-500">
                <FaCalendar />
              </span>
              <span className="text-blue-400 block font-bold m-2">
                Attend Event
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

EventSchedule.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
