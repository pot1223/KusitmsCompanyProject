let labels1 = ['A person','B person','C person','D person','E person'];
let data1 = [35,25,5,20,15];
let colors1 = ['#A0BBBC','#FFDAD9','#AAB0DD','#ceaad9','#550bd9'];

let myChart1 = document.getElementById("myChart").getContext('2d');

let chart1 = new Chart(myChart1,{
    type: 'doughnut',
    data: {
        labels: labels1,
        datasets:[{
            data:data1,
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

let labels2 = ['협업능력','성실성','소통능력','주도성','유연성'];
let myChart2 = document.getElementById("myChart2").getContext('2d');
let chart2 = new Chart(myChart2,{
    type: 'radar',
    data: {
        labels: labels2,
        datasets:[{
            label: "A Person",
            fill:true,
            backgroundColor: "rgba(255, 52, 105,0.1)",
            boarderColor:"rgba(179,181,198,1)",
            pointBorderColor:"#fff",
            pointBackgroundColor:"rgba(179,181,198,1.2)",
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

let pos_result = document.getElementById("coordinatePlane").getContext('2d');

pos_result.beginPath();
pos_result.strokeStyle="black";
pos_result.lineWidth="0.3";
pos_result.moveTo(275,0);
pos_result.lineTo(275,290);
pos_result.stroke();

pos_result.moveTo(5,145);
pos_result.lineTo(545,145);
pos_result.stroke();

pos_result.fillStyle="black";
pos_result.font="13px arial";
pos_result.fillText("리더",515,135);
pos_result.fillText("서포터",10,135);
pos_result.fillText("추진력",280,20);
pos_result.fillText("신중함",280,285);

var gra=pos_result.createLinearGradient(0, 0, 30, 100);
gra.addColorStop(0.4,"#ff3469");
gra.addColorStop(1,"#ffaa71");

// 좌표 : X: 5~545, Y: 0~290
pos_result.fillStyle=gra;
// 파라미터 앞에 두자리가 사각형 좌표(position)
pos_result.fillRect(50,50,30,30);
