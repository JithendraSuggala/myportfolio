import { LightningElement, wire, api } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
const COLUMNS = [
    { label: 'Education', fieldName: 'Education',wrapText: true },
    { label: 'Institution', fieldName: 'Institution',wrapText: true },
    { label: 'Passing Year', fieldName: 'YearOfPassing' },
    { label: 'CGPA/Marks', fieldName: 'grade' }
];
export default class PortfolioEducation extends LightningElement {

    @api recordId
    educationList = []
    columns = COLUMNS
    @wire(getRelatedListRecords, {
        parentRecordId: "$recordId",
        relatedListId: "Educations__r",
        fields: ['Education__c.Institution__c', 'Education__c.PassingYear__c',
                'Education__c.Grade__c', 'Education__c.Title__c'],
        sortBy: ['Education__c.PassingYear__c']
    })EducationHandler({data,error}){;
        if(data){
           // console.log("data"+JSON.stringify(data))
            this.formatEducation(data)
        }
        if(error){
          //  console.error("Error Message :"+error)
        }
    }
    formatEducation(data){
        this.educationList = [...data.records].reverse().map(item =>{
            let Id = item.id
            const {Title__c,PassingYear__c,Institution__c,Grade__c} = item.fields
            let Education =Title__c.value
            let YearOfPassing =PassingYear__c.value
            let Institution = Institution__c.value
            let grade = Grade__c.value

            return {Id,Education,Institution,YearOfPassing,grade}
        })
       // console.log("Education List Contains :"+JSON.stringify(this.educationList))
    }
    
}