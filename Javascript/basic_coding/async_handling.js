/*
Write a function in JavaScript that fetches data from two different APIs asynchronously and returns a combined result.
 Make sure to handle errors if one of the API requests fails.
Follow-up: How would you test this function to ensure it handles both successful and failed API calls correctly?
*/

async function fetch_two_apis(){
    try{
        const api1=await fetch('api1')
        const response1= api1.json()
        
        if(!response1.status==200){
            throw error 
        }

    }
    
    catch(error){
        console.log('abcd')

    }

    try{
        const api2=await fetch('api2')
        const data2=api2.json()

        if(!response1.status==200){
            throw error 
        }

    }
    catch(error){
        console.log('abcd')
    }
    

}