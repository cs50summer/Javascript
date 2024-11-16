/*
Question: Write a function that returns a function to increment a number by a given value.
Example Input: incrementBy(2)
Example Output: function that, when called, increments a number by 2.
function increment(n){
    //let x=0
    return function(x){
        
        return x+n
    }
    //return x
}

*/


function increment(n) {
    return function(number) {
        return number + n;
    };
}

let add=increment(3)

console.log(add(2))