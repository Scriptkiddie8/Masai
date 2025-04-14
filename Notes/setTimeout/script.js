//what will be the output in this case?

function check1(){
    setTimeout(()=>console.log("kartik"),8000)//9s
}
function check2(){
    setTimeout(()=>console.log("garg"),5000)//7s
}
setTimeout(()=>check1(),1000)
setTimeout(()=>check2(),2000)
