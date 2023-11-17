interface User {
  id: number;
  name: string;
  role: string;
  email: string;
}

const users: User[] = [
  {
    id: 1,
    name: "山田",
    role: "管理者",
    email: "taro.yamada@example.com",
  },
  {
    id: 2,
    name: "佐藤",
    role: "管理者",
    email: "hanako.sato@example.com",
  },
];

export default users;
