//what will be the output in this case?

function check1(){
    setTimeout(()=>(console.log("kartik"),8000))//9s
}
function check2(){
    setTimeout(()=>(console.log("garg"),9000))//7s
}
setTimeout(()=>check1(),5000)
setTimeout(()=>check2(),1000)
