interface User {
  id: number;
  firstName: string;
  lastName: string;
  attribute: string;
  email: string;
  status: string;
}

const users: User[] = [
  {
    id: 1,
    firstName: "山田",
    lastName: "太郎",
    attribute: "OG",
    email: "taro.yamada@example.com",
    status: "未登録",
  },
  {
    id: 2,
    firstName: "佐藤",
    lastName: "花子",
    attribute: "求職者",
    email: "hanako.sato@example.com",
    status: "",
  },
  {
    id: 3,
    firstName: "鈴木",
    lastName: "一郎",
    attribute: "OG",
    email: "ichiro.suzuki@example.com",
    status: "承認",
  },
  {
    id: 4,
    firstName: "高橋",
    lastName: "次郎",
    attribute: "OG",
    email: "jiro.takahashi@example.com",
    status: "拒否",
  },
  {
    id: 5,
    firstName: "田中",
    lastName: "三郎",
    attribute: "OG",
    email: "saburo.tanaka@example.com",
    status: "",
  },
  {
    id: 6,
    firstName: "伊藤",
    lastName: "四郎",
    attribute: "OG",
    email: "shiro.ito@example.com",
    status: "確認中",
  },
  {
    id: 7,
    firstName: "渡辺",
    lastName: "五郎",
    attribute: "求職者",
    email: "goro.watanabe@example.com",
    status: "未登録",
  },
  {
    id: 8,
    firstName: "中村",
    lastName: "六郎",
    attribute: "OG",
    email: "rokuro.nakamura@example.com",
    status: "承認",
  },
  {
    id: 9,
    firstName: "小林",
    lastName: "七郎",
    attribute: "OG",
    email: "shichiro.kobayashi@example.com",
    status: "",
  },
  {
    id: 10,
    firstName: "佐々木",
    lastName: "八郎",
    attribute: "求職者",
    email: "hachiro.sasaki@example.com",
    status: "拒否",
  },
  {
    id: 11,
    firstName: "山本",
    lastName: "九郎",
    attribute: "OG",
    email: "kuro.yamamoto@example.com",
    status: "",
  },
  {
    id: 12,
    firstName: "松本",
    lastName: "十郎",
    attribute: "OG",
    email: "juro.matsumoto@example.com",
    status: "確認中",
  },
];

export default users;
