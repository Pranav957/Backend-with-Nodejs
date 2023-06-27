const express=require('express');
const app=express();
const port=8001;

app.listen(port, function(err){
    if(err)
    {
        console.log(`Error occured while running a server: ${err}`);
        return;
    }

    console.log(`Server is Succesfully running on port: ${port}`);
})