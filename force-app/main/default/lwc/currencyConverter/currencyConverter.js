import { LightningElement } from 'lwc';
import {countryCodeList} from 'c/countryCodeList';
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets'
export default class CurrencyConverter extends LightningElement {
currencyImage = currencyConverterAssets+'/currencyConverterAssets/currency.svg'
countryList = countryCodeList;
countryFrom ="INR"
countryTo="USD"
amount=''
result
error
handleChange(event){
    const {name,value} = event.target
    console.log("Name"+name)
    console.log("Value"+value)
    this[name] = value
    this.result=''
    this.error=''
}
submitHandler(event){
    event.preventDefault()
    this.convert()
}
async convert(){
    const API_KEY = 'af3dd25477a1c15aa979a101'
    const API_URL=`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${this.countryFrom}/${this.countryTo}` 
    try{
        const data = await fetch(API_URL)
        const jsondata = await data.json()
        debugger;
        //console.log(jsondata)
        this.result = (Number(this.amount) * jsondata.conversion_rate).toFixed(2)  
        //console.log("Output:- "+this.result)
    }
    catch(error){
        //console.log(error)
      this.error="An error occurred. Please try again..."
    }
}

}