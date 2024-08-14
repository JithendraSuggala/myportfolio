import { LightningElement,api } from 'lwc';

export default class PortfolioUserDetailsandStats extends LightningElement {
    @ api objectApiName //='Portfolio__c'
    @api recordId //='a00dM00000Ij45JQAR'
    @api resumeUrl

    @api badges
    @api points
    @api trails
    @api rank
}