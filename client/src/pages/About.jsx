import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const About = () => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-8 w-[500px]">
        <h1 className="text-4xl font-bold text-center mb-4">About CSEC-ASTU</h1>
        <p className="text-lg text-center text-gray-700 ">
          Welcome to the about page of CSEC-ASTU! We are a community of computer
          science enthusiasts at ASTU, dedicated to promoting learning,
          collaboration, and innovation.
        </p>
        <p className="text-lg text-center text-gray-700 mt-4">
          Our mission is to provide a platform for students to enhance their
          technical skills, network with industry professionals, and stay
          updated with the latest trends in the field of computer science.
        </p>
        <p className="text-lg text-center text-gray-700 mt-4">
          Join us on this exciting journey and be a part of the CSEC-ASTU
          community!
        </p>
      </div>
      <div className="bg-white p-4 shadow-md flex flex-col justify-center items-center">
        <div>
          <h2 className="font-bold text-gray-800 text-xl p-2">November 2023</h2>
        </div>
        <div className="flex flex-col p-3">
          <FontAwesomeIcon icon={faClock} className="text-slate-500 text-5xl" />
          <p className="text-lg">❤️24/7 coding.❤️ </p>
        </div>
      </div>
    </div>
  );
};

export default About;
