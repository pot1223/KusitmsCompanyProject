/*let analyze_result_file = fs.readFileSync('/home/ubuntu/kusitms_companyPJ/routes/analyze_result.json');
let analyze_result_string = analyze_result_file.toString();
let analyze_result = JSON.parse(analyze_result_string);
*/
let analyze_result;
fetch('/analyze') 
.then(response => response.json()) 
.then(data => analyze_result=data);
document.getElementById("now_date").innerHTML="분석일자 :"+new Date().toLocaleString();
let start_date=analyze_result.data.date_data.start;
let end_date=analyze_result.data.date_data.end;
document.getElementById("duration").innerHTML="분석기간 :"+start_date+"~"+end_date;

let participant=Object.values(analyze_result.data.participant_list);
document.getElementById("participant").innerHTML="단톡방 인원: "+participant.length+"개";

let chat=Object.values(analyze_result.data.participant_chat.Chat_counts); /*각자 채팅 횟수*/
let total_chat=0;
chat.forEach(function(item){total_chat+=Number(item);})
document.getElementById("total_chat").innerHTML="전체 채팅횟수: "+total_chat+"개";


let contents_arr=analyze_result.data.word_cloud.word;
document.getElementById("chat_content").innerHTML="대화주제 :"
    +contents_arr[0]+", "+contents_arr[1]+","+contents_arr[2]+","+contents_arr[3];

/* 3번째: 채팅 빈도수 그래프 */
let labels1=analyze_result.data.participant; 
let datas1=Object.values(analyze_result.data.participant_chat.Chat_counts); /*각자 채팅 횟수*/
function getRandomColor() {
    let colors=new Array();
    for(let i=0;i<labels1.length;i++){
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        colors.push("rgba(" + r + "," + g + "," + b + ",0.5)");
    }
    return colors;
}
function getColor() {
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        let color=("rgba(" + r + "," + g + "," + b + ",0.5)");
    
    return color;
}

let colors1=getRandomColor();
let myChart1 = document.getElementById("myChart").getContext('2d');

let chart1 = new Chart(myChart1,{
    type: 'doughnut',
    data: {
        labels: labels1,
        datasets:[{
            data:datas1,
            backgroundColor:colors1
        }] 
    },
    options:{
        responsive:false,
       
        tooltips: {
            mode: 'nearest'
        },
        legend: {
            position:'top',
            align:'center'
        }
    }

});
/*4번째: 오각형 그래프 */
function getDataset(){
    let datasets=new Array();
    for(let i=0;i<data2.length;i++){
       let data= {
            label: data2[0],
            fill:true,
            backgroundColor: getColor(),
            boarderColor:"rgba(100,90,198,1)",
            pointBorderColor:"#fff",
            pointBackgroundColor:"rgba(70,190,198,1.2)",
            data:[
            analyze_result.data.workability.User[participant[0]],
            analyze_result.data.cooperation.User[participant[0]],
            analyze_result.data.relation.User[participant[0]],
            analyze_result.data.participation.User[participant[0]],
            analyze_result.data.participant_activity.Activity[participant[0]]
        ] 
          };
          datasets.push(data);
    }
    return datasets;
}
let labels2 = ['근로성','협조성','연관성','적극성','성실성'];
let data2=analyze_result.participant; 
let myChart2 = document.getElementById("myChart2").getContext('2d');
let chart2 = new Chart(myChart2,{
    type: 'radar',
    data:{
        labels:labels2,
        datasets:getDataset()}});/*[
           
            {
            label: data2[0],
            fill:true,
            backgroundColor: getColor(),
            boarderColor:"rgba(100,90,198,1)",
            pointBorderColor:"#fff",
            pointBackgroundColor:"rgba(70,190,198,1.2)",
            data:[
            analyze_result.data.workability.User[participant[0]],
            analyze_result.data.cooperation.User[participant[0]],
            analyze_result.data.relation.User[participant[0]],
            analyze_result.data.participation.User[participant[0]],
            analyze_result.data.participant_activity.Activity[participant[0]]
        ] 
          },
          {
            label: data2[1],
            fill:true,
            backgroundColor: getColor(),
            boarderColor:"rgba(80,90,198,1)",
            pointBorderColor:"#fff",
            pointBackgroundColor:"rgba(70,190,198,1.2)",
            data:[
                analyze_result.data.workability.User[participant[1]],
                analyze_result.data.cooperation.User[participant[1]],
                analyze_result.data.relation.User[participant[1]],
                analyze_result.data.participation.User[participant[1]],
                analyze_result.data.participant_activity.Activity[participant[1]]
        ] 
          },
          {
            label: data2[2],
            fill:true,
            backgroundColor: getColor(),
            boarderColor:"rgba(100,90,198,1)",
            pointBorderColor:"#fff",
            pointBackgroundColor:"rgba(70,190,198,1.2)",
            data:[
            analyze_result.data.workability.User[participant[2]],
            analyze_result.data.cooperation.User[participant[2]],
            analyze_result.data.relation.User[participant[2]],
            analyze_result.data.participation.User[participant[2]],
            analyze_result.data.participant_activity.Activity[participant[2]]
            ]
          },
          {
            label: data2[3],
            fill:true,
            backgroundColor: getColor(),
            boarderColor:"rgba(90,100,198,1)",
            pointBorderColor:"#fff",
            pointBackgroundColor:"rgba(70,190,198,1.2)",
            data:[
            analyze_result.data.workability.User[participant[3]],
            analyze_result.data.cooperation.User[participant[3]],
            analyze_result.data.realtion.User[participant[3]],
            analyze_result.data.participation.User[participant[3]],
            analyze_result.data.participant_activity.Activity[participant[3]]
        ] 
          },
          {
            label: data2[4],
            fill:true,
            backgroundColor: getColor(),
            boarderColor:"rgba(100,90,98,1)",
            pointBorderColor:"#fff",
            pointBackgroundColor:"rgba(70,190,198,1.2)",
            data:[
            analyze_result.data.workability.User[participant[4]],
            analyze_result.data.cooperation.User[participant[4]],
            analyze_result.data.relation.User[participant[4]],
            analyze_result.data.participation.User[participant[4]],
            analyze_result.data.participant_activity.Activity[participant[4]]
        ] 
          },
          {
            label: data2[5],
            fill:true,
            backgroundColor: getColor(),
            boarderColor:"rgba(100,90,18,1)",
            pointBorderColor:"#fff",
            pointBackgroundColor:"rgba(70,190,198,1.2)",
            data:[
            analyze_result.data.workability.User[participant[5]],
            analyze_result.data.cooperation.User[participant[5]],
            analyze_result.data.relation.User[participant[5]],
            analyze_result.data.participation.User[participant[5]],
            analyze_result.data.participant_activity.Activity[participant[5]]
        ] 
          },
          {
            label: data2[6],
            fill:true,
            backgroundColor: getColor(),
            boarderColor:"rgba(100,90,198,1)",
            pointBorderColor:"#fff",
            pointBackgroundColor:"rgba(70,190,198,1.2)",
            data:[
                analyze_result.data.workability.User[participant[6]],
                analyze_result.data.cooperation.User[participant[6]],
                analyze_result.data.relation.User[participant[6]],
                analyze_result.data.participation.User[participant[6]],
                analyze_result.data.participant_activity.Activity[participant[6]]
        ] 
          },
          {
            label: data2[7],
            fill:true,
            backgroundColor: getColor(),
            boarderColor:"rgba(105,95,198,1)",
            pointBorderColor:"#fff",
            pointBackgroundColor:"rgba(70,190,198,1.2)",
            data:[
                analyze_result.data.workability.User[participant[7]],
                analyze_result.data.cooperation.User[participant[7]],
                analyze_result.data.relation.User[participant[7]],
                analyze_result.data.participation.User[participant[7]],
                analyze_result.data.participant_activity.Activity[participant[7]]
        ] 
          },
          {
            label:data2[8],
            fill:true,
            backgroundColor: getColor(),
            boarderColor:"rgba(200,9,19,1)",
            pointBorderColor:"#fff",
            pointBackgroundColor:"rgba(70,190,198,1.2)",
            data:[
                analyze_result.data.workability.User[participant[8]],
                analyze_result.data.cooperation.User[participant[8]],
                analyze_result.data.relation.User[participant[8]],
                analyze_result.data.participation.User[participant[8]],
                analyze_result.data.participant_activity.Activity[participant[8]]
        ] 
          },
          {
            label: data2[9],
            fill:true,
            backgroundColor: getColor(),
            boarderColor:"rgba(30,90,198,1)",
            pointBorderColor:"#fff",
            pointBackgroundColor:"rgba(70,190,198,1.2)",
            data:[
                analyze_result.data.workability.User[participant[9]],
                analyze_result.data.cooperation.User[participant[9]],
                analyze_result.data.relation.User[participant[9]],
                analyze_result.data.participation.User[participant[9]],
                analyze_result.data.participant_activity.Activity[participant[9]]
        ] 
          }
    ]
},
    options:{
        responsive:false,
        tooltips: {
            mode: 'nearest'
        },
        legend: {
            position:'top',
            align:'center'
        }
    }

});

*/