var filename = "http://www.afyproject2.ml/test";

var analyze_result_file = await fetch(filename).then(function (response) {
  return response.json();
});

const analyze_result = analyze_result_file.data;

console.log(analyze_result.participant_list);
document.getElementById("now_date").innerHTML =
  "분석일자 :" + new Date().toLocaleString();
let start_date = analyze_result.date_data.start;
let end_date = analyze_result.date_data.end;
document.getElementById("duration").innerHTML =
  "분석기간 :" + start_date + "~" + end_date;

let participant = Object.values(analyze_result.participant_list);
document.getElementById("participant").innerHTML =
  "단톡방 인원: " + participant.length + "개";
let chat = Object.values(
  analyze_result.participant_chat.Chat_counts
); /*각자 채팅 횟수*/
let total_chat = 0;
chat.forEach(function (item) {
  total_chat += Number(item);
});
document.getElementById("total_chat").innerHTML =
  "전체 채팅횟수: " + total_chat + "개";

let contents_arr = analyze_result.word_cloud.word;
document.getElementById("chat_content").innerHTML =
  "대화주제 :" +
  contents_arr[0] +
  ", " +
  contents_arr[1] +
  "," +
  contents_arr[2] +
  "," +
  contents_arr[3];

/* 3번째: 채팅 빈도수 그래프 */
let labels1 = participant;
let datas1 = Object.values(
  analyze_result.participant_chat.Chat_counts
); /*각자 채팅 횟수*/
function getRandomColor() {
  let colors = new Array();
  for (let i = 0; i < labels1.length; i++) {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    colors.push("rgba(" + r + "," + g + "," + b + ",0.5)");
  }
  return colors;
}
let colors1 = getRandomColor();
let myChart1 = document.getElementById("myChart").getContext("2d");

let chart1 = new Chart(myChart1, {
  type: "doughnut",
  data: {
    labels: labels1,
    datasets: [
      {
        data: datas1,
        backgroundColor: colors1,
      },
    ],
  },
  options: {
    responsive: false,

    tooltips: {
      mode: "nearest",
    },
    legend: {
      position: "top",
      align: "center",
    },
  },
});
/*4번째: 오각형 그래프 */

/*function getData(index){
     datasets: [{
         label: participant[0],
         fill:true,
         backgroundColor:getRandomColor(),
         poinBoderColor:getRandomColor(),
         pointBorder:getRandomColor(),
         pointBorderColor:"#fff",
         pointBackgroundColor:"#ddd",
         data:
             analyze_result.relation.User[participant_list[0]],
             analyze_result.workabillity.User[participant_list[0]],
             analyze_result.participant.User[participant_list[0]],
             analyze_result.participant_activity.Activity[participant_list[0]]
 }]
     return datasets;
 };*/
let labels2 = ["근로성", "협조성", "연관성", "적극성", "성실성"];
let myChart2 = document.getElementById("myChart2").getContext("2d");
let chart2 = new Chart(myChart2, {
  type: "radar",
  data: {
    labels: labels2,
    //5명밖에 없는 경우에 6, 7, 8은 undefined가 떠서 for문으로 하거나 해야할것같아요!
    datasets: [
      {
        label: participant[0],
        fill: true,
        backgroundColor: "rgba(255, 170, 113,0.2)",
        boarderColor: "rgba(100,90,198,1)",
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(70,190,198,1.2)",
        data: [
          analyze_result.workability.User[participant[0]],
          analyze_result.cooperation.User[participant[0]],
          analyze_result.relation.User[participant[0]],
          analyze_result.participation.User[participant[0]],
          analyze_result.participant_activity.Activity[participant[0]],
        ],
      },
      {
        label: participant[1],
        fill: true,
        backgroundColor: "rgba(170, 255, 113,0.2)",
        boarderColor: "rgba(80,90,198,1)",
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(70,190,198,1.2)",
        data: [
          analyze_result.workability.User[participant[1]],
          analyze_result.cooperation.User[participant[1]],
          analyze_result.relation.User[participant[1]],
          analyze_result.participation.User[participant[1]],
          analyze_result.participant_activity.Activity[participant[1]],
        ],
      },
      {
        label: participant[2],
        fill: true,
        backgroundColor: "rgba(255, 170, 113,0.2)",
        boarderColor: "rgba(100,90,198,1)",
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(70,190,198,1.2)",
        data: [
          analyze_result.workability.User[participant[2]],
          analyze_result.cooperation.User[participant[2]],
          analyze_result.relation.User[participant[2]],
          analyze_result.participation.User[participant[2]],
          analyze_result.participant_activity.Activity[participant[2]],
        ],
      },
      {
        label: participant[3],
        fill: true,
        backgroundColor: "rgba(255, 170, 113,0.2)",
        boarderColor: "rgba(90,100,198,1)",
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(70,190,198,1.2)",
        data: [
          analyze_result.workability.User[participant[3]],
          analyze_result.cooperation.User[participant[3]],
          analyze_result.relation.User[participant[3]],
          analyze_result.participation.User[participant[3]],
          analyze_result.participant_activity.Activity[participant[3]],
        ],
      },
      {
        label: participant[4],
        fill: true,
        backgroundColor: "rgba(205, 170, 10,0.2)",
        boarderColor: "rgba(100,90,98,1)",
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(70,190,198,1.2)",
        data: [
          analyze_result.workability.User[participant[4]],
          analyze_result.cooperation.User[participant[4]],
          analyze_result.relation.User[participant[4]],
          analyze_result.participation.User[participant[4]],
          analyze_result.participant_activity.Activity[participant[4]],
        ],
      },
      {
        label: participant[5],
        fill: true,
        backgroundColor: "rgba(25, 17, 113,0.2)",
        boarderColor: "rgba(100,90,18,1)",
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(70,190,198,1.2)",
        data: [
          analyze_result.workability.User[participant[5]],
          analyze_result.cooperation.User[participant[5]],
          analyze_result.relation.User[participant[5]],
          analyze_result.participation.User[participant[5]],
          analyze_result.participant_activity.Activity[participant[5]],
        ],
      },
      {
        label: participant[6],
        fill: true,
        backgroundColor: "rgba(215, 170, 133,0.2)",
        boarderColor: "rgba(100,90,198,1)",
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(70,190,198,1.2)",
        data: [
          analyze_result.workability.User[participant[6]],
          analyze_result.cooperation.User[participant[6]],
          analyze_result.relation.User[participant[6]],
          analyze_result.participation.User[participant[6]],
          analyze_result.participant_activity.Activity[participant[6]],
        ],
      },
      {
        label: participant[7],
        fill: true,
        backgroundColor: "rgba(255, 172, 113,0.2)",
        boarderColor: "rgba(105,95,198,1)",
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(70,190,198,1.2)",
        data: [
          analyze_result.workability.User[participant[7]],
          analyze_result.cooperation.User[participant[7]],
          analyze_result.relation.User[participant[7]],
          analyze_result.participation.User[participant[7]],
          analyze_result.participant_activity.Activity[participant[7]],
        ],
      },
      {
        label: participant[8],
        fill: true,
        backgroundColor: "rgba(255, 170, 113,0.2)",
        boarderColor: "rgba(200,9,19,1)",
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(70,190,198,1.2)",
        data: [
          analyze_result.workability.User[participant[8]],
          analyze_result.cooperation.User[participant[8]],
          analyze_result.relation.User[participant[8]],
          analyze_result.participation.User[participant[8]],
          analyze_result.participant_activity.Activity[participant[8]],
        ],
      },
      {
        label: participant[9],
        fill: true,
        backgroundColor: "rgba(202, 130, 113,0.2)",
        boarderColor: "rgba(30,90,198,1)",
        pointBorderColor: "#fff",
        pointBackgroundColor: "rgba(70,190,198,1.2)",
        data: [
          analyze_result.workability.User[participant[9]],
          analyze_result.cooperation.User[participant[9]],
          analyze_result.relation.User[participant[9]],
          analyze_result.participation.User[participant[9]],
          analyze_result.participant_activity.Activity[participant[9]],
        ],
      },
    ],
  },
  options: {
    responsive: false,
    tooltips: {
      mode: "nearest",
    },
    legend: {
      position: "top",
      align: "center",
    },
  },
});
/*채팅 길이 그래프(1)*/
let labels3 = analyze_result.participation;
let datas3 = [190, 130, 120, 140, 170, 80];
let colors3 = getRandomColor();
let myChart3 = document.getElementById("myChart3").getContext("2d");
let chart3 = new Chart(myChart3, {
  type: "bar",
  data: {
    labels: labels3,
    datasets: [
      {
        data: datas3,
        backgroundColor: colors3,
      },
    ],
  },
  options: {
    responsive: false,

    tooltips: {
      mode: "nearest",
    },
    legend: {
      poosition: "bottom",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 40,
            stepSize: 20,
          },
        },
      ],
    },
  },
});
