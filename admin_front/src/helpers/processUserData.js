const processUserData = (users) => {
  const data = {
    社会人: 0,
    学生: 0,
  };

  users.forEach((user) => {
    data[user.attribute] += 1;
  });

  return Object.entries(data).map(([label, value]) => ({ label, value }));
};

export default processUserData;
