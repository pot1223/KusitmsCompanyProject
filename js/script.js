/*카카오 분석일
 {movies.map(movie => (
                            <Movie
                                key={movie.id}
                                id={movie.id}
                                year={movie.year}
                                title={movie.title}
                                summary={movie.summary}
                                poster={movie.medium_cover_image}
                                genres={movie.genres}
                                */



const fs=require('fs');
var filename ='https://www.afyproject2.ml//home/ubuntu/kusitms_companyPJ/routes/analyze_result.json';

var analyze_result_file = readFileSync(filename, 'utf8');
  analyze_result_string = analyze_result_file.toString();
  analyze_result = JSON.parse(analyze_result_string);


document.getElementById("now_date").innerHTML="분석일자 :"+new Date().toLocaleString();
let start_date=analyze_result.data.date_data.start;
let end_date=analyze_result.data.date_data.end;
document.getElementById("duration").innerHTML="분석기간 :"+start_date+"~"+end_date;

let participant=Object.values(analyze_result.data.participant_list);
document.getElementById("participant").innerHTML="단톡방 인원: "+participant.length+"개";

let chat=Object.values(fin_data.data.participant_chat.Chat_counts); /*각자 채팅 횟수*/
let total_chat=0;
chat.forEach(function(item){total_chat+=Number(item);})
document.getElementById("total_chat").innerHTML="전체 채팅횟수: "+total_chat+"개";


/* 3번째: 채팅 빈도수 그래프 */
let labels1=participant; 
let datas1=Object.values(fin_data.data.participant_chat.Chat_counts); /*각자 채팅 횟수*/
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
let labels2 = ['근로성','협조성','연관성','적극성','성실성'];
function getData(index){
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
            analyze_result.data.workabillity.User[participant_list[0]],
            analyze_result.data.participant.User[participant_list[0]],
            analyze_result.participant_activity.Activity[participant_list[0]]
    
}]
    return datasets;
};
let myChart2 = document.getElementById("myChart2").getContext('2d');
let chart2 = new Chart(myChart2,{
    type: 'radar',
    data:
        /*datasets:[
            {
            label: "A Person",
            fill:true,
            backgroundColor: "rgba(255, 170, 113,0.2)",
            boarderColor:"rgba(100,90,198,1)",
            pointBorderColor:"#fff",
            pointBackgroundColor:"rgba(70,190,198,1.2)",
            data:[17,82,50,14,27] 
        },
       {
            label: "B Person",
            fill:true,
            backgroundColor: "rgba(255, 99, 113,0.2)",
            boarderColor:"rgba(70,190,198,1)",
            pointBorderColor:"#fff",
            pointBackgroundColor:"rgba(70,190,198,1.2)",
            data:[17,82,50,14,27] 
        }
        ] */
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

/*채팅 길이 그래프(1)*/
let labels3 = participant;
let datas3 = [190,130,120,140,170,80];
let colors3=getRandomColor();
let myChart3 = document.getElementById("myChart3").getContext('2d');

let chart3 = new Chart(myChart3,{
    type: 'bar',
    data: {
        labels: labels3,
        datasets:[{
            data:datas3,
            backgroundColor:colors3
        }] 
    },
    options:{
        responsive:false,
       
        tooltips: {
            mode: 'nearest'
        },
        legend: {
            poosition:'bottom'
         },
         scales: {
            yAxes: [{
                
                ticks: {
                    min:40,
                     stepSize: 20 
                        }
                   }],
        }
    }

});


