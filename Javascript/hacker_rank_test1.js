function maxSum(arr){
    let n1=0
    let n2=0

    for (let i=0 ; i<arr.length; i++){
        if (arr[i]>n1){
            n2=n1
            n1=arr[i]
        }
        else{
            n2=arr[i];
            
        }
     }
     return(n1+n2)
}

console.log(maxSum([ 5, 9, 7, 11 ]));