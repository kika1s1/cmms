import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ event }) {
  const [eventManager, setEventManager] = useState(null);
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${event.userRef}`);
        const data = await res.json();
        setEventManager(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [event.userRef]);
  return (
    <>
      {eventManager && (
        <div className="flex flex-col gap-2">
          <p>
            Contact
            <span className="font-semibold">{event.username}</span>
            <span className="font-semibold">{event.title.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <Link
            to={`mailto:${eventManager.email}?subject=Regarding ${eventManager.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
