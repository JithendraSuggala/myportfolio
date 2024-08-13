import { LightningElement } from 'lwc';
import AlarmClockAssets from '@salesforce/resourceUrl/AlarmClockAssets';
export default class AlarmClock extends LightningElement {
    ClockImage = AlarmClockAssets + '/AlarmClockAssets/clock.png'
    ringtone =new Audio( AlarmClockAssets + '/AlarmClockAssets/Clocksound.mp3')
    currentTime = ''
    hoursOptions = []
    minutesOptions = []
    meridians = ['AM', 'PM']
    selectedHours
    selectedminutes
    selectedmeridian
    alarmTime
    isAlarmSet = false
    isAlarmTriggered = false

    get isfieldnotselected() {
        return !(this.selectedHours && this.selectedminutes && this.selectedmeridian)
    }
    get shakeImage(){
        return this.isAlarmTriggered ? 'shake':''
    }
    connectedCallback() {
        this.createHoursOptions()
        this.createMinutesOptions()
        this.CurrentTimeHandler()
    }

    CurrentTimeHandler() {

        setInterval(() => {
            let dateTime = new Date()
            let hour = dateTime.getHours()
            let minute = dateTime.getMinutes()
            let second = dateTime.getSeconds()
            let ampm = 'AM'
            if (hour == 0) {
                hour = 12
            }
            else if (hour == 12) {
                ampm = 'PM'
            }
            else if (hour > 12) {
                hour = hour - 12
                ampm = 'PM'
            }

            hour = hour < 10 ? '0' + hour : hour
            minute = minute < 10 ? '0' + minute : minute
            second = second < 10 ? '0' + second : second
            this.currentTime = `${hour}:${minute}:${second} ${ampm}`
            if ((this.alarmTime) === `${hour}:${minute} ${ampm}`) {
                console.log("Alarm Triggered!!!")
                this.isAlarmTriggered=true
                this.ringtone.play()
                this.ringtone.loop = true
            }
            else{
                this.isAlarmTriggered =false
                this.ringtone.pause()
            }
        }, 1000)
    }
    createHoursOptions() {
        for (let i = 1; i <= 12; i++) {
            let val = i < 10 ? '0' + i : i;
            this.hoursOptions.push(val)
        }
    }
    createMinutesOptions() {
        for (let i = 0; i <= 59; i++) {
            let val = i < 10 ? '0' + i : i;
            this.minutesOptions.push(val)
        }
    }
    storeValue(event) {
        const { label, value } = event.detail
        if (label === "Hour(s)") {
            this.selectedHours = value
        }
        else if (label === "Minute(s)") {
            this.selectedminutes = value
        }
        else if (label === "AM/PM") {
            this.selectedmeridian = value
        }
        console.log("this.selectedHours" + this.selectedHours)
        console.log("this.selectedminutes" + this.selectedminutes)
        console.log("this.selectedmeridian" + this.selectedmeridian)

    }
    setAlarmhandler() {
        this.alarmTime = `${this.selectedHours}:${this.selectedminutes} ${this.selectedmeridian}`
        this.isAlarmSet = true

    }
    clearAlarmhandler(){
        this.isAlarmSet = false
        this.alarmTime=''
        this.isAlarmTriggered = false
        this.ringtone.pause()
        const elements =this.template.querySelectorAll('c-clock-dropdown')
        Array.from(elements).forEach(element => {
            element.reset("")
        });
    }
}