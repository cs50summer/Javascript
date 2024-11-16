/*
 Write a function that returns a promise that resolves after a given number of milliseconds.

 function retPromise(){

    timing= new Promise((resolve)=>{
        settimer(()=>{},1000)
    })
    return timing
}
*/
function delay(ms){
    return new Promise(resolve=>setTimeout(resolve,ms))
}

    