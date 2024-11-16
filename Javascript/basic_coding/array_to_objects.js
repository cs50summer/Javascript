/*
Convert Object to Array of Key-Value Pairs

Write a function that converts an object into an array of key-value pairs.
javascript
Copy code
function objectToPairs(obj) {
    // Your code here
}
console.log(objectToPairs({ a: 1, b: 2 })); // Output: [['a', 1], ['b', 2]]
*/
function objectToPairs(obj) {
    // Your code here

    tempArr=[]
    objArr=[]

    for(key in obj){
        tempArr[0]=key
        tempArr[1]=obj[key]
        objArr.push(tempArr)
        tempArr=[]
    }
    return objArr
}
console.log(objectToPairs({ a: 1, b: 2 })); // Output: [['a', 1], ['b', 2]]

// Now do the string cookie where string literal contains certian vlaues and you need to convert it into an object 
//cookie="username=JohnSmith ; expires=mm-dd-yyy-long tag of strings; /=path""

function toObj(cookie){

    let arr=[]
    let obj={}
    let tempArr=[]

    arr=cookie.split(';')
    console.log(arr)
    //tempArr=arr.split('=')
    for( let i=0 ; i<arr.length; i++){
        tempArr=arr[i].split('=')
        console.log(tempArr[0])
        console.log(tempArr[1])
        obj[tempArr[0]]=tempArr[1]
    }
    console.log(obj)

}

toObj("username=JohnSmith ; expires=mm-dd-yyy-long tag of strings; /=path")