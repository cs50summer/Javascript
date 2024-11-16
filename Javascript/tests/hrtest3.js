function CodelandUsernameValidation(str) { 

    // code goes here  
    let len1 =str.length
    let start= str[0]
    let end=str[len1-1]
  
     if ((/^[A-Za-z]/.test(start)) & ((len1>=4)&& len1<=25) & (/^[A-Za-z0-9_]/.test(end)) & (end!='_')){
       console.log("valid")
     }
    else{
      console.log("invalid")
    }
    return str; 
  
  }
     
  // keep this function call here 
  console.log(CodelandUsernameValidation("Abcd"));