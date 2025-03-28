function pinetree(n){


    for(let i=1; i<=n; i++){
        let str = "";
        for(let j=1; j<=(n+i-2); j++){
            
            if(j<=(n-i-1)){
                str += " ";
            }

            else if(i==n){
                if(j==n-1){
                    str += "|";
                }
                else if(j<n-1){
                    str += " "
                }
            }

            else{
                str += "*";
            }

        }
        console.log(str);
    }
}


pinetree(5);
pinetree(10);
pinetree(13);


