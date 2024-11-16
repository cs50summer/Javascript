async function doFirst(){
    return new Promise(resolve =>{
        setTimeout(() =>{
            console.log("First");
            resolve();
        },1000)

    })
}

async function doSecond(){
    return new Promise (resolve=>{
        setTimeout(()=>{
            console.log("Second");
            resolve();
        })
    })

}

async function goodFunctions(){
    await doFirst();
    await doSecond();

}