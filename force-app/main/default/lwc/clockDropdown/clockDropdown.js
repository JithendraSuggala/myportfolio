import { LightningElement, api } from 'lwc';

export default class ClockDropdown extends LightningElement {
    @api label = ''
    @api options = []
    @api uniqueId = ''
    handleChange(event) {
        this.callParentHandler(event.target.value)
    }
    callParentHandler(value) {
       this.dispatchEvent(CustomEvent('optionhandler', {
            detail: {
                label: this.label,
                value: value
            }
        }))
    }
    @api
    reset(value){
        this.template.querySelector('select').value=value
        this.callParentHandler(value)
    }
}