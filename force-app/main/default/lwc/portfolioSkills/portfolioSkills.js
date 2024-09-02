import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import Tech_skills from '@salesforce/schema/Portfolio__c.TechnicalSkills__c';
import soft_skills from '@salesforce/schema/portfolio__c.SoftSkills__c';
import Software_tools from '@salesforce/schema/portfolio__c.SoftwareTools__c';

export default class PortfolioSkills extends LightningElement {
    techSkills = []
    softSkills = []
    tools=[]
 @api recordId;
@wire(getRecord,{
    recordId:'$recordId',
    fields:[Tech_skills,soft_skills,Software_tools]
})skillHandler({data,error}){
    if(data){
        console.log("data: "+JSON.stringify(data))
        this.formatSkills(data)
    }
    else{
        console.error(error)
    }
}
formatSkills(data){
    const {TechnicalSkills__c,SoftSkills__c,SoftwareTools__c} = data.fields
    this.techSkills= TechnicalSkills__c ? TechnicalSkills__c.value.split(',') : []
    this.softSkills= SoftSkills__c ? SoftSkills__c.value.split(','):[]
    this.tools=SoftwareTools__c ? SoftwareTools__c.value.split(','):[]

    console.log('Tech Skills Array'+this.techSkills)
}

}