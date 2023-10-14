interface Occupation {
  id: number;
  name: string;
  registrants: number;
}

const OccupationsData: Occupation[] = [
  {
    id: 1,
    name: "エンジニア",
    registrants: 1,
  },
  {
    id: 2,
    name: "デザイナー",
    registrants: 2,
  },
  {
    id: 3,
    name: "マネージャー",
    registrants: 3,
  },
];

export default OccupationsData;
