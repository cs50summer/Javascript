/*Create a Promise

Write a function that returns a promise which resolves after a given time.
javascript
Copy code
function delay(ms) {
    // Your code here
}
delay(1000).then(() => console.log("Resolved after 1 second"));
*/
function delay(ms) {
    // Your code here
    return new Promise((resolve)=>{
        //return setTimeout(()=> resolve,ms)
                setTimeout(()=>resolve(),ms)
    })
}
delay(1000).then(() => console.log("Resolved after 1 second"));