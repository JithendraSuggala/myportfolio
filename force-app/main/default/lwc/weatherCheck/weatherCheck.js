import { LightningElement } from 'lwc';
import API_KEY from '@salesforce/label/WeatherCheckAPIKEY'
import Weather_ICONS from '@salesforce/resourceUrl/weatherAppIcons'
import getWeatherDetails from '@salesforce/apex/WeatherCheckController.getWeatherDetails'
export default class WeatherCheck extends LightningElement {

    clearIcon = Weather_ICONS+'/weatherAppIcons/clear.svg'
    cloudIcon = Weather_ICONS+'/weatherAppIcons/cloud.svg'
    dropletIcon = Weather_ICONS+'/weatherAppIcons/droplet.svg'
    hazeIcon = Weather_ICONS+'/weatherAppIcons/haze.svg'
    mapIcon = Weather_ICONS+'/weatherAppIcons/map.svg'
    rainIcon = Weather_ICONS+'/weatherAppIcons/rain.svg'
    snowIcon = Weather_ICONS+'/weatherAppIcons/snow.svg'
    stormIcon = Weather_ICONS+'/weatherAppIcons/storm.svg'
    thermometerIcon = Weather_ICONS+'/weatherAppIcons/thermometer.svg'
    arrowBackIcon = Weather_ICONS+'/weatherAppIcons/arrow-back.svg'

    
   
    cityName
    jsondata
    loadingText=''
    isError = false
    response
    weatherImage
    get loadingClass(){
        return this.isError ? 'error-msg':'success-msg'
    }
    handleChange(event){
        this.cityName = event.target.value
    }
    handleSubmit(event){
        this.isError= false
        this.loadingText='Fetching weather details...'
        event.preventDefault()
        this.fetchData()
    }
    /*
    async fetchData(){
        
        const API_URL=`https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metric&appid=${API_KEY}`
        
        try{
            const data = await fetch(API_URL)
            this.jsondata =await data.json()
            
            console.log(this.jsondata)
        }
        catch(error){
            console.log(error)
        }
        console.log('City Name is :'+this.cityName)
    }
        */
        fetchData(){
            console.log('City Name :- '+this.cityName)
            getWeatherDetails({input:this.cityName}).then(result=>{
                this.weatherDetails(JSON.parse(result))
            }).catch((error)=>{
                console.log(error)
                this.response=null
                this.isError=true
                this.loadingText='Something Went Wrong'
            })
        /*const API_URL=`https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&units=metric&appid=${API_KEY}`
            fetch(API_URL).then(res=>res.json()).then(result=>{
                console.log(result)
                //console.log(JSON.stringify(result))
                this.weatherDetails(result)
            }).catch((error)=>{
                console.log(error)
                this.isError=true
                this.loadingText='Something Went Wrong'
            })*/

        }
        weatherDetails(info){
            if(info.cod === '404'){
                this.isError=true
                this.loadingText=`${this.cityName} isn't a valid city`
            }
            else{
                this.loadingText=''
                const city = info.name
                const country = info.sys.country
                const temper = info.main.temp
                const feel =info.main.feels_like
                const humid = info.main.humidity
                const {description,id} = info.weather[0]
                this.isError=false

                if(id === 800){
                    this.weatherImage=this.clearIcon
                }
                else if(id >= 801 && id<=804){
                    this.weatherImage= this.cloudIcon
                }
                else if((id>=200 && id <=232) || (id >=600 && id<=622)){
                    this.weatherImage=this.snowIcon
                }
                else if(id >= 701 && id <=781){
                    this.weatherImage= this.hazeIcon
                }else if((id>=500 && id <=531) || (id >=300 && id<=321)){
                    this.weatherImage=this.rainIcon
                }


                this.response={
                    city:city,
                    temperature:temper,
                    Location:`${city}, ${country}`,
                    feels_like: feel,
                    Humidity: humid,
                    description: description

                }
            }
        }
        handleBack(){
            this.response=''
            this.isError=false
            this.loadingText=''
            this.cityName=''
            this.weatherImage=''

        }
}