import { LightningElement,wire,api} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import portfolioAssets from '@salesforce/resourceUrl/PortfolioAssets';
import salesforceCerts from '@salesforce/schema/portfolio__c.SalesforceCertifications__c';
import otherCerts from '@salesforce/schema/portfolio__c.Other_Certifications__c';
export default class PortfolioCertifications extends LightningElement {
    @api recordId
    salesforceCertificationList=[]
    otherCertificationList=[]
    CertLogo = portfolioAssets+'/PortfolioAssets/cert_logo.png'
    credentialsLink='https://trailhead.salesforce.com/en/credentials/certification-detail-print/?searchString=wqe7Ny5d01RD5yz0oqlT9eeEozh2B/ytjRYNfr7h0qgZfbQPiEfqRlRM2snIttcc'
    @wire(getRecord,{
        recordId:'$recordId',
        fields:[salesforceCerts,otherCerts]
    })certificationHandler({data,error}){
        if(data){
            console.log("Data Contains :"+JSON.stringify(data))
            this.formatCerts(data)
        }
        else{
            console.error("Error Message :"+error);
        }
    }
    formatCerts(data){
        const {SalesforceCertifications__c,Other_Certifications__c} = data.fields
        this.salesforceCertificationList =SalesforceCertifications__c? SalesforceCertifications__c.value.split(',').map(item=>{
            return 'Salesforce Certified '+item;
        }) : []
        this.otherCertificationList =Other_Certifications__c? Other_Certifications__c.value.split(';') : []

    }

}