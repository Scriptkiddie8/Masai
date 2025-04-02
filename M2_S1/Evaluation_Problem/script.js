
// Find whether there is a dominating element or not

function check(arr, n){
    let cnt1 =0, cnt2=1, max=0;
    for(let i=0; i<n; i++){
        if(arr[i]==arr[i+1]){
            cnt2++;
        }
        else if(cnt2>=cnt1){
                max = cnt1;
                cnt1 = cnt2;
                cnt2 =1;
                //1 2 2 2 2 3 3  : cnt1 =1 , cnt2 =1 , max =1
        }
    }
    if(max == cnt1){
        console.log("No")
    }
    else{
        console.log("Yes");
    }
}

check([1,2,2,2,2], 5);
check([1,2,2,3,3], 5);
check([], 6);
check([1],1)
check([2,2,2,2,2,2], 6)


// function check(arr, n){
//     let cnt1 =0, cnt2=0;
//     for(let i=0; i<n-1; i++){
//         if(arr[i]==arr[i+1]){
//             cnt2++;
//         }
//         else {
//             cnt2++;
//             if(cnt2>cnt1){
//                 cnt1 = cnt2;
//             }
//         }
        
//     }
//     if(cnt1 == cnt2){
//         console.log("NO");
//     }
//     else{
//         console.log("YES");
//     }
// }