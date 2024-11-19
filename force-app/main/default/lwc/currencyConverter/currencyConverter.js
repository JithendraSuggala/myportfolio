import { LightningElement,wire } from 'lwc';
import {countryCodeList} from 'c/countryCodeList';
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets';
import apiKey from '@salesforce/apex/CurrencyConverterController.getAPIKey';
export default class CurrencyConverter extends LightningElement {
currencyImage = currencyConverterAssets+'/currencyConverterAssets/currency.svg'
countryList = countryCodeList;
countryFrom ="INR"
countryTo="USD"
amount=''
result
error
API_KEY

@wire(apiKey)getkey({data,error}){
    if(data){
         this.API_KEY = data;
        // console.log('API Key is '+data); 
    }
    else{
         console.log(error)
    }
}

handleChange(event){
    const {name,value} = event.target
    //console.log("Name"+name)
    //console.log("Value"+value)
    this[name] = value
    this.result=''
    this.error=''
}
submitHandler(event){
    event.preventDefault()
    this.convert()
}
async convert(){
    
    const API_URL=`https://v6.exchangerate-api.com/v6/${this.API_KEY}/pair/${this.countryFrom}/${this.countryTo}` 
    try{
        const data = await fetch(API_URL)
        const jsondata = await data.json()
        //console.log(jsondata)
        this.result = (Number(this.amount) * jsondata.conversion_rate).toFixed(2)  
        console.log("Generated Output is :- "+this.result)
    }
    catch(error){
        //console.log(error)
      this.error="An error occurred. Please try again..."
    }
}
}