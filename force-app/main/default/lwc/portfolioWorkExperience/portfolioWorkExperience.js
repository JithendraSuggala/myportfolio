import { LightningElement,wire,api } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
export default class PortfolioWorkExperience extends LightningElement {

    @api recordId

    @wire(getRelatedListRecords,{
        parentRecordId:'$recordId',
        relatedListId:'WorkExperience__r',
        fields:[
            'WorkExperience__c.CompanyName__c',
            'WorkExperience__c.JobStartDate__c',
            'WorkExperience__c.JobEndDate__c',
            'WorkExperience__c.Role__c',
            'WorkExperience__c.StillWorkingHere__c',
            'WorkExperience__c.Description__c',
            'WorkExperience__c.WorkLocation__c'
        ]


    })workExperienceHandler({data,error}){
        if(data){
            console.log("Work Experience Data"+JSON.stringify(data));
        }
        if(error){
            console.error(error);
        }
    }

}