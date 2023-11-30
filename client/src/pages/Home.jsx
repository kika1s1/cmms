import { useEffect, useState } from "react";
import EventSchedule from "../components/EventSchedule";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const fetchEvents = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/event/get?${searchQuery}`);
      const data = await res.json();
      setEvents(data);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex-1 ">
      <h1 className="text-3xl font-semibold text-center border-b p-3 text-slate-700 mt-5">
        Top Events:
      </h1>
      <div className="p-12 flex flex-wrap gap-10  justify-center">
        {!loading && events.length === 0 && (
          <p className="text-xl text-slate-700">No listing found!</p>
        )}
        {loading && (
          <p className="text-xl text-slate-700 text-center w-full">
            Loading...
          </p>
        )}

        {!loading &&
          events &&
          events.map((event) => (
            <EventSchedule key={event._id} event={event} />
          ))}
      </div>
    </div>
  );
};

export default Home;
