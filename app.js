const express=require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const https=require("https");
app.get("/",function(req,res)
{
res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res)
{
  const city=req.body.cityName;
  const unit="metric";
  const appid="your api id";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appid+"&units="+unit;

    https.get(url,function(response)
  {
    console.log(response.statusCode);
    response.on("data",function(data)
  {
    const weatherData=JSON.parse(data);
    console.log(weatherData);
    const temp=weatherData.main.temp;
    console.log(temp);
    const description=weatherData.weather[0].description;
    console.log(description);
    const icon=weatherData.weather[0].icon;
    const imgURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.write("<p>Weather currently is "+description);
    res.write("<h1> The temperature in "+city+" is "+temp+" degree celsius</h1>");

    res.write("<img src="+imgURL+">");
    res.send();


  });
});
});
app.listen(7000,function()
{
  console.log("server started on port 7000");
});
