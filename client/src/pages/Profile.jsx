import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [showEventsError, setShowEventsError] = useState(false);
  const [userEvents, setUserEvents] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      () => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));

        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleShowEvents = async () => {
    try {
      setShowEventsError(false);
      const res = await fetch(`/api/user/events/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowEventsError(true);
        return;
      }

      setUserEvents(data);
    } catch (error) {
      setShowEventsError(true);
    }
  };
  const handleEventDelete = async (eventId) => {
    try {
      const res = await fetch(`/api/event/delete/${eventId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserEvents((prev) => prev.filter((ev) => ev._id !== eventId));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="block mt-4 gap-3 justify-center sm:flex">
      <div className="p-3 sm:max-w-lg sm:w-1/3 w-full">
        <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
          <input
            type="text"
            placeholder="Full Name"
            defaultValue={currentUser.fullName}
            id="fullName"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="username"
            defaultValue={currentUser.username}
            id="username"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="UGR..."
            defaultValue={currentUser.ugr}
            id="ugr"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Department..."
            defaultValue={currentUser.department}
            id="department"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="email"
            id="email"
            defaultValue={currentUser.email}
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            onChange={handleChange}
            id="password"
            className="border p-3 rounded-lg"
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Update"}
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span
            onClick={handleDeleteUser}
            className="text-red-700 cursor-pointer"
          >
            Delete account
          </span>
          <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
            Logout
          </span>
        </div>
        <p className="text-red-700 mt-5">{error ? error : ""}</p>
        <p className="text-green-700 mt-5">
          {updateSuccess ? "User is updated successfully!" : ""}
        </p>
      </div>

      <div className="sm:w-1/3 w-full">
        <button onClick={handleShowEvents} className="text-green-700 w-full">
          Show Events
        </button>
        <p className="text-red-700 mt-5">
          {showEventsError ? "Error showing listings" : ""}
        </p>
        {userEvents && userEvents.length > 0 && (
          <div className="flex flex-col gap-4 ">
            <h1 className="text-center mt-7 text-2xl font-semibold">
              Your Events
            </h1>
            {userEvents.map((ev) => (
              <div
                key={ev._id}
                className="border rounded-lg p-3 flex justify-between items-center gap-4"
              >
                <Link to={`/events/${ev._id}`}>
                  <img
                    src={ev.imageUrls[0]}
                    alt="listing cover"
                    className="h-16 w-16 object-contain"
                  />
                </Link>
                <Link
                  className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                  to={`/events/${ev._id}`}
                >
                  <p>{ev.title}</p>
                </Link>
                <div className="flex flex-col item-center">
                  <button
                    onClick={() => handleEventDelete(ev._id)}
                    className="text-red-700 uppercase"
                  >
                    Delete
                  </button>
                  <Link to={`/update-event/${ev._id}`}>
                    <button className="text-green-700 uppercase">Edit</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        <Link
          className=" fixed block w-full  bottom-12 mb-10 sm:w-1/3 right-1/5  bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          to={"/create-event"}
        >
          Create Event
        </Link>
      </div>
    </div>
  );
}
