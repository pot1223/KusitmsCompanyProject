const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const defaultRes = require("../module/utils/utils");
const statusCode = require("../module/utils/statusCode");
const fs = require("fs");
const { PythonShell } = require("python-shell");

/*
대화내용 분석
METHOD       : POST
URL          : /analyze
BODY         : text = 대화내용
*/
router.post("/", upload.single("text"), async (req, res) => {
  if (req.file == undefined) {
    return res
      .status(200)
      .send(defaultRes.successFalse(statusCode.OK, "파일전송실패"));
  }
  //PythonShell 사용방법

  let options = {
    scriptPath: "/home/ubuntu/kusitms_companyPJ/routes",
    //scriptPath: "C:/Users/s_0hyeon/Desktop/kusitms/kusitms_companyPJ/routes",
    args: [req.file.location],
  };
  PythonShell.run("kakao.py", options, (err, data) => {
    if (err) {
      return res
        .status(200)
        .send(defaultRes.successFalse(statusCode.OK, "분석실패"));
    }

    fs.writeFileSync(
      "/home/ubuntu/kusitms_companyPJ/routes/analyze_result.json",
      data
    );

    return res
      .status(200)
      .send(defaultRes.successTrue(statusCode.OK, "분석성공"));
  });
});

router.get("/", async (req, res) => {
  analyze_result_file = fs.readFileSync(
    "C:/Users/s_0hyeon/Desktop/kusitms/kusitms_companyPJ/routes/analyze_result.json"
  );
  analyze_result_string = analyze_result_file.toString();
  analyze_result = JSON.parse(analyze_result_string);
  participant_list = [];
  participant_list = analyze_result.participant_list;
  console.log(participant_list[0]);
  console.log(analyze_result.relation.User[participant_list[0]]);
  console.log(analyze_result.workability.User[participant_list[0]]);
  console.log(analyze_result.participation.User[participant_list[0]]);
  console.log(analyze_result.cooperation.User[participant_list[0]]);
  console.log(
    analyze_result.participant_activity.Activity[participant_list[0]]
  );

  // datasets:[{
  //   label: participant_list[0],
  //   fill: true,
  //   backgroundColor: "",
  //   boarderColor: "",
  //   pointBorderColor: "",
  //   pointBackgroundColor: "",
  //   data: [
  //     analyze_result.relation.User[participant_list[0]],
  //     analyze_result.workability.User[participant_list[0]],
  //     analyze_result.participation.User[participant_list[0]],
  //     analyze_result.cooperation.User[participant_list[0]],
  //     analyze_result.participant_activity.Activity[participant_list[0]]
  //   ]
  // }]

  return res
    .status(200)
    .send(defaultRes.successTrue(statusCode.OK, "분석성공", analyze_result));
});

module.exports = router;
