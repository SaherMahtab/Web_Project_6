const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(request,response){
     response.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
    const q=req.body.cityName;
    const unit="metric";
    const key="83016f5206e295dbabfcb5e7b2acf498";
    const url="https://api.openweathermap.org/data/2.5/weather?appid="+key+"&q="+q+"&units="+unit+"";
    https.get(url,function(response){
        console.log(response);
        response.on("data",function(data){
        const weatherData=JSON.parse(data);
        console.log(weatherData);
        const temp=weatherData.main.temp;
        console.log(temp);
        const desc=weatherData.weather[0].description;
        console.log(desc);
        res.write("<p>The Weather Description is "+desc+"</p>")
        res.write("<h1>The temperature in "+q+" is "+temp+" degree Celsius</h1>");
        res.send();
    })
    })
});

app.listen(3000,function(){
    console.log("Server is running on port 3000")
})