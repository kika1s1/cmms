import bcrypt from "bcryptjs";

const users = [
  {
    fullName: "Tamirat Kebede Worati",
    username: "admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    department: "computer science",
    ugr: "ugr/25349/14",
  },
  {
    fullName: "Beke Tola Feyisa",
    username: "bekele",
    email: "beka@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    department: "computer science",
    ugr: "ugr/25343/14",
  },
  {
    fullName: "Segni Hunde Barecha",
    username: "segni",
    email: "segni@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    department: "Software Engineering",
    ugr: "ugr/25149/14",
  },
];

export default users;
