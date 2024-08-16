import { LightningElement } from 'lwc';
import portfolioAssets from '@salesforce/resourceUrl/PortfolioAssets'
export default class PortfolioPersonalProjects extends LightningElement {
    bmiCalculatorImage = portfolioAssets+'/PortfolioAssets/Projects/BMICalculator.png'
    alarmClockImage =portfolioAssets+'/PortfolioAssets/Projects/AlarmClock.png'
    currencyConverterImage=portfolioAssets+'/PortfolioAssets/Projects/CurrencyCalculator.png'
    weatherAppImage =portfolioAssets+'/PortfolioAssets/Projects/WeatherApp.png'
    SurveyImage=portfolioAssets+'/PortfolioAssets/Projects/Survey.png'
    
    
}