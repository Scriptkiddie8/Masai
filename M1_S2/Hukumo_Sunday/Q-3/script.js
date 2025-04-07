function check (str, element){

    let cnt=0;
    for(let i=0; i<str.length; i++){
        let result = "";
        for(let j=0; j<element.length; j++){
            if(str[i+j] == element[j]){
                result += element[j];
            }
            else{
                break;
            }
        }
        if(result==element){
            cnt++;
        }
    }
    return cnt;

}

let str1 = "My name is kartik name"
let str2 = "kartik check your name it is kartik or kartik";
console.log(check(str1, "name"));
console.log(check(str2, "kartik"));
