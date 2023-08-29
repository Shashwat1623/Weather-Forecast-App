const request = require('postman-request')

const forecast=(lat,lng,callback)=>{
    url="http://api.weatherstack.com/current?access_key=7a36a984de6b6d1a9c38f91c0ea29215&query="+lat+","+lng

request({url, json:true},(error,{body})=>{
    if(error){
        callback("unable to connect!",undefined)
    }
    else if(body.error){
        callback("weather not found! try again!",undefined)
    }
    else{
        callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`)

    }
    
})
}

module.exports=forecast