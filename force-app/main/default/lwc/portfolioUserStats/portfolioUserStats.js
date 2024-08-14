import { LightningElement,api } from 'lwc';
import portfolioAssets from '@salesforce/resourceUrl/PortfolioAssets'
export default class PortfolioUserStats extends LightningElement {
    @api points 
    @api badges
    @api trails
    @api rank
    trailheadRankBadge 
    renderedCallback(){
        if(this.rank){
            let url =  portfolioAssets+'/PortfolioAssets/Ranks/'+this.rank+'.png'
            this.trailheadRankBadge=url
        }
    }

}