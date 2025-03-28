function brick(H, W){
  
    for(let i=1; i<=H; i++){
      let str = "";
      for(let j=1; j<=W*4; j++){
        if(i%2 !=0){
          if(j%4==0){
            str += "]";
          }
          else if((j+1)%4 ==0){
            str += "[";
          }
          else{
            str += " ";
          }
        }
        else{
          if(j%2!=0 && (j+1)%4 !=0){
            str += "[";
          }
          else if(j%2==0 && j%4 !=0){
            str += "]";
          }
          else{
            str += " ";
          }
        }
      }
      console.log(str);
    }
  }

  brick(4,4);