import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";

export default function EventSchedule({ event }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/events/${event._id}`}>
        <img
          src={
            event.imageUrls[0] ||
            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
          }
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
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              <div>
                <span className="flex gap-2 justify-center text-green-500">
                  <FaCalendar />
                </span>
                <span className="text-blue-400 block font-bold m-2">
                  Attend Event
                </span>
              </div>
            </a>
          </div>
        </div>
      </Link>
    </div>
  );
}
