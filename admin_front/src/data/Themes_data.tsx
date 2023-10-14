interface Theme {
  id: number;
  name: string;
  registrants: number;
}

const ThemesData: Theme[] = [
  {
    id: 1,
    name: "就活対策",
    registrants: 1,
  },
  {
    id: 2,
    name: "転職対策",
    registrants: 2,
  },
  {
    id: 3,
    name: "面接対策",
    registrants: 3,
  },
];

export default ThemesData;
