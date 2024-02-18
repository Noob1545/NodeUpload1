const express = require("express")
const multer = require("multer")

const app = express()

let fileName;

const storage = multer.diskStorage({
    destination:function(request,file,callback){
        callback(null,"uploads/")
    },
    filename: function(request,file,callback){
        callback(null,file.originalname)
        fileName = file.originalname
        console.log(fileName);
    }
})

const upload = multer({storage: storage})

app.get("/",function(request,response){
    response.sendFile(__dirname+"/index.html")
})

app.use("/uploads",express.static("uploads"))

app.post("/uploadFile",upload.single("file"),function(request,response){
    response.send(`
        <script>
            window.location.href = 'https://nodeupload.onrender.com/uploads/${fileName}'
        </script>
    `)
})

app.listen(3000,function(){
    console.log("sunucu http://localhost:3000 de dinleniyor!");
})
