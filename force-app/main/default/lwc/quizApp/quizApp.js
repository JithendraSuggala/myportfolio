import { LightningElement } from 'lwc';

export default class QuizApp extends LightningElement {
    selectedResponse = {}
    result = 0
    submittedform = false

    //used for disabling the submit until all questions are answered
    get allnotselected() {
        return !(Object.keys(this.selectedResponse).length === this.myQuestions.length)
    }

    // sending the CSS classes to the result dynamically based on result 
    get isAllCorrect() {
        return `slds-text-heading_large ${this.myQuestions.length === this.result ?'slds-text-color_success':'slds-text-color_error'} `
    }

    //questions data stored in array format
    myQuestions = [
        {
            id: 'Question1',
            question: 'which one of the following is not a template loop?',
            options: {
                a: "for-each",
                b: "iterator",
                c: "map-loop"
            },
            correctanswer: 'c'
        },
        {
            id: 'Question2',
            question: 'What’s the annotation used to invoke an Apex method imperatively from LWC?',
            options: {
                a: "@AuraEnabled",
                b: "@isTest",
                c: "@future"
            },
            correctanswer: 'a'
        }, {
            id: 'Question3',
            question: 'What are the maximum no of components that we can include in an LWC?',
            options: {
                a: "100",
                b: "No Limit",
                c: "150"
            },
            correctanswer: 'b'
        }, {
            id: 'Question4',
            question: ' which of the following determines which fields and records are available for use when creating a report?',
            options: {
                a: "Reports",
                b: "Dashboard",
                c: "Report-Type"
            },
            correctanswer: 'c'
        }, {
            id: 'Question5',
            question: 'which file format is invalid in LWC?',
            options: {
                a: ".apex",
                b: ".js",
                c: ".svg"
            },
            correctanswer: 'a'
        }, {
            id: 'Question6',
            question: 'which one of the following is not a directive',
            options: {
                a: "for-each",
                b: "if:true",
                c: "@track"
            },
            correctanswer: 'c'
        }]

    //to capture responses selected by user
    changeHandler(event) {
        const { name, value } = event.target
        this.selectedResponse = { ...this.selectedResponse, [name]: value }
    }

    //Triggered when user click on submit
    submitHandler(event) {

        event.preventDefault();
        let checkResponse = this.myQuestions.filter(item => this.selectedResponse[item.id] === item.correctanswer)
        this.result = checkResponse.length
        console.log('Your Score is :' + this.result);
        this.submittedform = true

    }

    //triggered when form is reset
    resetHandler() {
        this.result = 0
        this.selectedResponse = {}
        this.submittedform = false
    }
}
