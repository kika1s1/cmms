import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaCalendar,
  FaShare,
  FaMapMarkerAlt,
  FaCalendarMinus,
  FaCalendarCheck,
} from "react-icons/fa";

export default function Event() {
  SwiperCore.use([Navigation]);
  const [events, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const params = useParams();
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/event/get/${params.eventId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [params.eventId]);
  console.log(loading);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const getEventStatus = (eventDatetime) => {
    const eventDateTime = new Date(eventDatetime);

    if (currentTime > eventDateTime) {
      return "closed";
    } else if (currentTime < eventDateTime) {
      return "future";
    } else {
      return "active";
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {events && !loading && !error && (
        <div>
          <Swiper navigation>
            {events.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              Event at {formatDate(new Date(events.date))}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <span>Location</span>
              <FaMapMarkerAlt className="text-green-700" />
              {events.address}
            </p>

            <p className="text-slate-800">
              <span className="font-semibold text-black">Description</span>
              {events.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap  sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <div className={`${formatDate(new Date(events.date))}`}>
                  <p className="text-lg font-bold">
                    {formatDate(new Date(events.date))}
                  </p>
                  <p className="text-gray-600">{events.title}</p>
                  <a
                    href={events.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {getEventStatus(events.date) === "active" ? (
                      <div>
                        <span className="flex gap-2 text-green-500">
                          Join Meeting <FaCalendarMinus className="text-lg" />
                        </span>
                        <span className="text-blue-400 block font-bold m-2">
                          Attend Event
                        </span>
                      </div>
                    ) : getEventStatus(events.date) === "closed" ? (
                      <span className="text-red-500 flex gap-2">
                        Event Closed <FaCalendarCheck className="text-lg" />
                        <span className="text-blue-400 block font-bold m-2">
                          Attend Event
                        </span>
                      </span>
                    ) : (
                      <div>
                        <span className="flex gap-2 justify-center text-green-500">
                          Starts at {formatDate(new Date(events.date))}{" "}
                          <FaCalendar />
                        </span>
                        <span className="text-blue-400 block font-bold m-2">
                          Attend Event
                        </span>
                      </div>
                    )}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </main>
  );
}
