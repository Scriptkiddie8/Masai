let cnt =0;
let display = setInterval((()=>{

    console.log("Loading...");
    cnt++;
    if(cnt==5){
        clearInterval(display)
        console.log("Loaded Successfully")
    }
}
),1000);

