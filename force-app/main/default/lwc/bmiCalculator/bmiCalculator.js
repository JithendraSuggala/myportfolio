import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {
    height = ''
    weight = ''
    bmiValue = ''
    result = ''
    handleInput(event) {
        const { name, value } = event.target;

        if (name === 'height') {
            this.height = value;
        }
        if (name === 'weight') {
            this.weight = value;
        }
    }
    handleSubmit(event) {
        event.preventDefault();
        //console.log("Height:" + this.height);
        //console.log("weight:" + this.weight);
        this.calculateBMI();
    }
    calculateBMI() {

        //BMI = weight(kg)/[height(M)*height(M)];

        let height = Number(this.height) / 100;
        let weight = Number(this.weight);
        let BMI = weight / (height * height);
        //console.log("BMI is" + BMI);
        this.bmiValue = Number(BMI.toFixed(2));

        if (this.bmiValue < 18.5) {
            this.result = 'Underweight'
        }
        else if (this.bmiValue >= 18.5 && this.bmiValue < 25) {
            this.result = 'Healthy'
        }
        else if (this.bmiValue >= 25 && this.bmiValue < 30) {
            this.result = 'Overweight'
        }
        else {
            this.result = 'Obese'
        }
        //console.log("BMI is:" + this.bmiValue);
        //console.log("Result is:" + this.result);
    }
    reCalculate() {
        this.height = ''
        this.weight = ''
        this.bmiValue = ''
        this.result = ''
    }
}