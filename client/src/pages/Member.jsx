import { useEffect, useState } from "react";

const Member = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user/all");
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-10">
      <table className="w-full">
        <thead>
          <tr>
            <th className="bg-gray-200 text-left">Full Name</th>
            <th className="bg-gray-200 text-left">UGR</th>
            <th className="bg-gray-200 text-left">Department</th>
            <th className="bg-gray-200 text-left">Username</th>
            <th className="bg-gray-200 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
              <td>{member.fullName}</td>
              <td>{member.ugr}</td>
              <td>{member.department}</td>
              <td>{member.username}</td>
              <td>{member.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Member;
