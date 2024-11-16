/*
Question: Write a function that fetches data from a given URL and logs the result. Use async/await.
Example URL: https://jsonplaceholder.typicode.com/todos/1
*/

// will need fetch api and need to initialize it 

async function fetchdata(URL){

    try{

    let response= await fetch(URL);
    let data=await response.json()
    console.log(data)
    }
    
    catch(error){
        console.log(error)

    }

}