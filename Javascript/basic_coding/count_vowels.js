/*
Count the vowels in a string 
console.log(str.includes('world'))
*/

function countVowels(str) {
    // Your code 

    let vowels ="aeiou"
    let count=0
    //let arr= str.split('')

    for (i of str){
        if ((vowels).includes(i)){
            count++
        }
    }
    console.log(count)
}
console.log(countVowels("hello world")); // Output: 3