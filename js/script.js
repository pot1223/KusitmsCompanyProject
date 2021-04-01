
/* 채팅횟수 그래프 data*/
/*
let fin_data;
fetch("http://www.afyproject2.ml/analyze")
    .then((response)=> response.json())
    .then((data)=>fin_data=data.data);


let labels1 = fin_data.participant_list;
let datas1=fin_data.participant_chat.map(function (item) {
    for (let i = 0; i < item.length; i++) {
       return item[1];
    }
});

/*카카오 분석일

let start_date=fin_data.date_data.start;
let end_date=fin_data.date_data.end;

let now_date=document.getElementById("now_date");
let duration=document.getElementById("duration");
let total_chat=document.getElementById("total_chat");
let average_chat=document.getElementById("average_chat");

now_date.value=Date.now();
duration.innerHTML="분석기간 : "+start_date+" ~ "+end_date;
*/
/* 서버에서 사용할 때는 2줄 지워주시면 됩니다.*/
document.getElementById("now_date").innerHTML="분석일자 :"+new Date().toLocaleString();
let start_date="2021.02.03";
document.getElementById("duration").innerHTML="분석기간 :"+start_date;
let total_chat="1000";
document.getElementById("total_chat").innerHTML="전체 채팅횟수: "+total_chat+"개";
let average_chat='50';
document.getElementById("average_chat").innerHTML="하루평균 채팅횟수: "+average_chat+"개";

let labels1=['1','2','3','4','5','6'];
let datas1=[10,20,30,40,50,60];

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
/*오각형 그래프 */
let labels2 = ['근로성','협조성','연관성','적극성','성실성'];
let myChart2 = document.getElementById("myChart2").getContext('2d');
let chart2 = new Chart(myChart2,{
    type: 'radar',
    data: {
        labels: labels2,
        /*
        for(let i=0;i<labels2.length;i++){
            let key = keyArr[i]
            let datas[key]=personArr[i]
            */
        datasets:[{
            label: "A Person",
            fill:true,
            /* backgroundColor 랜덤, borderColor 랜덤, pintBackgroudn*/
            backgroundColor: "rgba(255, 52, 105,0.1)",
            boarderColor:"rgba(179,181,198,1)",
            pointBorderColor:"#fff",
            pointBackgroundColor:"#aaaccc",
            data:[90,60,42,37,81] 
        },
       {
            label: "B Person",
            fill:true,
            backgroundColor: "rgba(255, 170, 113,0.2)",
            boarderColor:"rgba(70,190,198,1)",
            pointBorderColor:"#fff",
            pointBackgroundColor:"rgba(70,190,198,1.2)",
            data:[17,82,50,14,27] 
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

/*채팅 길이 그래프(1)*/
let labels3 = ['1','2','3','4','5','6'];
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


