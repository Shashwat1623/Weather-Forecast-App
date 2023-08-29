const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app=express()


pubdPath=path.join(__dirname,"../public")
partialsPath=path.join(__dirname,"../templates/partials")
viewsPath=path.join(__dirname,"../templates/views")

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(pubdPath))

app.get('/',(req,res)=>{
    res.render('index',{
        title: 'Weather Forecast',
        createdBy: 'Shashwat'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About info',
        createdBy: 'Shashwat'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        needy: 'Shashwat',
        helper: 'Weather App',
        createdBy: 'Shashwat'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error: 'No address added,mate!'
        })
    }
    else{
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({error})
            }
            else{
                forecast(latitude,longitude,(error,weatherData)=>{
                    if(error){
                        return res.send({error})
                    }
                    else{
                        return res.send({
                            forecast: weatherData,
                            location: location,
                            address: req.query.address
                        })
                    

                    }
                    
                })

            }
            
        })
        

    }
    
})

app.get('/help/*',(req,res)=>{
    res.render('notfound',{
        title: '404: Not Found',
        createdBy: 'Shashwat',
        errormsg: 'Help article not found.'
    })
})

app.get('/*',(req,res)=>{
    res.render('notfound',{
        title: '404: Not Found',
        createdBy: 'Shashwat',
        errormsg: 'Page not found.'
    })
})

app.listen(3000,()=>{
    console.log('Server is up and running on port 3000!')
})