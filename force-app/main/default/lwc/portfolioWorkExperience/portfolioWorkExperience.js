import { LightningElement,wire,api } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
export default class PortfolioWorkExperience extends LightningElement {
    @api recordId
    workExperienceList = []
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
            /*console.log("Work Experience Data"+JSON.stringify(data))*/
            this.formatContent(data);
        }
        if(error){
            console.error(error);
        }
    }
    formatContent(data){
      this.workExperienceList =  data.records.map(item=>{
            let id=item.id
            const {Role__c,WorkLocation__c,JobStartDate__c,
                JobEndDate__c,CompanyName__c,StillWorkingHere__c,Description__c} =item.fields
                let JobStartDate=this.getValue(JobStartDate__c)
                let JobEndDate=this.getValue(JobEndDate__c)
                let CompanyName=this.getValue(CompanyName__c)
                let WorkLocation=this.getValue(WorkLocation__c)
                let Role=this.getValue(Role__c)
                let StillWorkingHere =this.getValue(StillWorkingHere__c)
                let Description=this.getValue(Description__c)

                return {id,Role,WorkLocation,JobStartDate,JobEndDate,CompanyName,StillWorkingHere,Description}
        })
        /*console.log("workExperienceList"+JSON.stringify(this.workExperienceList))*/
    }
    getValue(data){
            return data && (data.displayValue || data.value);
        }

}