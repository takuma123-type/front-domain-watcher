interface Industry {
  id: number;
  name: string;
  registeredUsers: number;
}

const industries: Industry[] = [
  { id: 1, name: "保険", registeredUsers: 1 },
  { id: 2, name: "金融", registeredUsers: 3 },
  { id: 3, name: "製造", registeredUsers: 5 },
  { id: 4, name: "IT", registeredUsers: 4 },
];

export default industries;
