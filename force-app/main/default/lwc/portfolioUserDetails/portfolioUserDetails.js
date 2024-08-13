import { LightningElement,api } from 'lwc';

export default class PortfolioUserDetails extends LightningElement {

    @api recordId
    @api objectApiName
    downloadResume(){
        window.open('https://github.com/JithendraSuggala/Resume/raw/main/JithendraResume.pdf','_blank');
    }
}