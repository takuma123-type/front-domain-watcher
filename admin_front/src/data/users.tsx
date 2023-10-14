interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
}

const users: User[] = [
  {
    id: 1,
    firstName: "山田",
    lastName: "太郎",
    role: "管理者",
    email: "taro.yamada@example.com",
  },
  {
    id: 2,
    firstName: "佐藤",
    lastName: "花子",
    role: "管理者",
    email: "hanako.sato@example.com",
  },
];

export default users;
