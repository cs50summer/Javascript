// Write a function to find the first non-repeating character in a string.

// iterate through the string 
// if string in index 0 is present in rest of the string , move to next string 
// else return that string 

/*
function firstNoneRepeating(list, map = new Map()) {
  for (let item of list) {
    if (map.has(item)) {
      map.set(item, map.get(item) + 1);
    } else {
      map.set(item, 1);
    }
  }
  for (let [key, value] of map.entries()) {
    if (value === 1) {
      return key;
    }
  }
}

function nonRepeated(str) {
   for(let i = 0; i < str.length; i++) {
      let j = str.charAt(i)
      if (str.indexOf(j) == str.lastIndexOf(j)) {
        return j;
      }
   }
   return null;
}

nonRepeated("aabcbd"); //c
Simply, indexOf() gets first occurrence of a character & lastIndexOf() gets the last occurrence. So when the first occurrence is also == the last occurence, it means there's just one the character.


*/

function firstNonRepeat(str){

    console.log(str)
    

    for (i=0; i<=str.length;i++){
        let mystr=str
        console.log(`{$i}`, mystr)
        if (!(str.includes(str[i]))){
             return str[i]

        }
    }

    return 1
}

console.log(firstNonRepeat("I see this e"))