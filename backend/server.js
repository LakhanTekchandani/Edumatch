const express = require('express')

const app = express()
app.use(express.json());



const port = 5000;

app.get("/",(req, res)=>{
    res.json({
        message:"Edumatch APi is working "
    })
})

app.listen(port, () => {
    console.log(`Edumatch backend is live ${port}`);
});