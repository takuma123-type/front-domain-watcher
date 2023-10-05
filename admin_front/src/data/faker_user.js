import faker from "faker";

const generateUsers = (count) => {
  const users = [];

  for (let i = 1; i <= count; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const attribute = faker.random.arrayElement(["社会人", "学生"]);
    const email = faker.internet.email(firstName, lastName);
    const status = faker.random.arrayElement([
      "未登録",
      "学生認証",
      "承認",
      "拒否",
      "確認中",
    ]);

    users.push({
      id: i,
      firstName,
      lastName,
      attribute,
      email,
      status,
    });
  }

  return users;
};

export default generateUsers(30);
