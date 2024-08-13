import { LightningElement,wire,api } from 'lwc';
import ImageZipFolder from '@salesforce/resourceUrl/PortfolioAssets'
import { getRecord,getFieldValue } from 'lightning/uiRecordApi';
import FULLNAME from '@salesforce/schema/Portfolio__c.FullName__c'
import Designation from '@salesforce/schema/Portfolio__c.Designation__c'
import COMPANY_NAME from '@salesforce/schema/Portfolio__c.CompanyName__c'
import COMPANY_LOCATION from '@salesforce/schema/Portfolio__c.CompanyLocation__c'
export default class PortfolioBanner extends LightningElement {

    @api recordId //='a00dM00000Ij45JQAR'
    @api linkedinUrl //='https://www.linkedin.com/in/jithendrasuggala'
    @api trailheadUrl //='https://www.salesforce.com/trailblazer/jithendrasuggala'
    @api githubUrl //=''

    userPic = ImageZipFolder+'/PortfolioAssets/userPic.jpeg'
    linkedin = ImageZipFolder+'/PortfolioAssets/Social/linkedin.svg'
    trailhead = ImageZipFolder+'/PortfolioAssets/Social/trailhead1.svg'
    github = ImageZipFolder+'/PortfolioAssets/Social/github.svg'
    
    
    @wire(getRecord,{
        recordId: '$recordId',
        fields:[FULLNAME,COMPANY_NAME,COMPANY_LOCATION,Designation]
    })
    portfolioData
    /*PortfolioHandler({data,error}){
        if(data){
            console.log("Record Data "+ JSON.stringify(data));
        }
        else{
            console.log("error: "+error)
        }
    }*/

    get fullName(){
        return getFieldValue(this.portfolioData.data, FULLNAME)
    }
    get companyName(){
        return getFieldValue(this.portfolioData.data, COMPANY_NAME)
    }
    get companyLocation(){
        return getFieldValue(this.portfolioData.data, COMPANY_LOCATION)
    }
    get designation(){
        return getFieldValue(this.portfolioData.data, Designation)
    } 
    }