var express = require("express");
var router = express.Router();
const upload = require("../config/multer");
const defaultRes = require("../module/utils/utils");
const statusCode = require("../module/utils/statusCode");
// const spawn = require("child_process").spawn;
const { PythonShell } = require("python-shell");
router.get("/", async (req, res) => {
  //PythonShell 사용방법
  let options = {
    scriptPath: "/home/ubuntu/kusitms_companyPJ/routes",
    //scriptPath: "C:/Users/s_0hyeon/Desktop/kusitms/kusitms_companyPJ/routes",
    args: [
      "https://yeonghyeon.s3.ap-northeast-2.amazonaws.com/1617286925301.txt",
    ],
  };
  PythonShell.run("kakao.py", options, (err, data) => {
    if (err) throw err;
    result = {};
    result = JSON.parse(data);
    const analyze_result = {
      time_all_chat: result.time_all_chat,
      chat_per_day: result.chat_per_day_result,
      time_member_chat: result.time_member_chat,
      cooperation: result.cooperation,
      participation: result.participation,
      member_chat_interval: result.member_chat_interval,
      all_member_chat_interval: result.all_member_chat_interval,
      word_cloud: result.word_cloud,
      relation: result.relation,
      workability: result.workability,
      date_data: result.date_data,
      participant_num: result.participant_num,
      participant_list: result.participant_list,
      participant_chat: result.participant_chat,
      participant_activity: result.participant_activity,
      chat_counts_percentage: result.chat_counts_percentage,
    };
    return res
      .status(200)
      .send(defaultRes.successTrue(statusCode.OK, "통신성공", analyze_result));
  });

  //spawn 사용방법 - 둘다 가능(txt파일 어떻게 읽어들일지)
  // const result = spawn("python", [
  //   "C:/Users/s_0hyeon/Desktop/kusitms/test/routes/main.py",
  //   2,
  // ]);
  // result.stdout.on("data", (data) => {
  //   console.log(data.toString());
  // });

  // result.stderr.on("data", (data) => {
  //   console.log(data.toString());
  // });
});

module.exports = router;
