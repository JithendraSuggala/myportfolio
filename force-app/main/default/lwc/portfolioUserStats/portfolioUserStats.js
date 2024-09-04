import { LightningElement,api } from 'lwc';
import portfolioAssets from '@salesforce/resourceUrl/PortfolioAssets'
export default class PortfolioUserStats extends LightningElement {
    @api points 
    @api badges
    @api trails
    @api rank
    PointCount=0
    badgeCount=0
    trailCount=0
    trailheadRankBadge 
    renderedCallback(){
        if(this.rank){
            let url =  portfolioAssets+'/PortfolioAssets/Ranks/'+this.rank+'.png'
            this.trailheadRankBadge=url
        }
    }
    connectedCallback(){
         this.pointsIncrement()
         this.badgesIncrement()
         this.trailsIncrement()
    }
    pointsIncrement() {
        this.PointCount = 0; // Reset to 0
        this.intervalId = setInterval(() => {
            if (this.PointCount < this.points) {
                this.PointCount = this.PointCount+50;
            } else {
                clearInterval(this.intervalId);
            }
        }, 1); // 50 PointCountbers will increase every milli sec
    }
    badgesIncrement() {
        this.badgeCount = 0; // Reset to 0
        this.intervalId = setInterval(() => {
            if (this.badgeCount < this.badges) {
                this.badgeCount++;
            } else {
                clearInterval(this.intervalId);
            }
        }, 60); // 1 number will increase every 60milli sec
    }
    trailsIncrement() {
        this.trailCount = 0; // Reset to 0
        this.intervalId = setInterval(() => {
            if (this.trailCount < this.trails) {
                this.trailCount++;
            } else {
                clearInterval(this.intervalId);
            }
        }, 150); // 1 number will increase every 100milli sec
    }

}