let Mock = require("mockjs");
let Random = Mock.Random;

let list = [];
for (let index = 0; index < 6; index++) {
  list.push(Random.csentence(4));
}

module.exports = {
  getDataList: (req) => {
    return {
      status: {
        code: 0,
        message: "success",
        time: Random.now("day", "yyyy-MM-dd HH:mm:ss"),
      },
      data: {
        dataList: list,
      },
    };
  },
};
