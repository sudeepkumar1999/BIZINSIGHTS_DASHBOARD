import  PosDailyCollectionDTO from './PosDaillyCollectionDTO'
import PosWeeklyCollectionDTO from './PosDaillyCollectionDTO'
export  default class TodayCollectionReportDTO{
  

   
    SiteId:number;
    SiteName:string;
    PresentCollection:number;
    PastCollection:number;
    PresentConsumption:number;
    PastConsumption:number;
    PosCollection:any;
    



    constructor(data: any) {
       this.SiteId=data.SiteId,
       this.SiteName=data.SiteName
       this.PresentCollection=data.CollectionToday;
       this.PastCollection=data.CollectionPreviousDay;
       this.PresentConsumption=data.GamePlayToday;
       this.PastConsumption=data.GamePlayPreviousDay;
       this.PosCollection=data.posCollection.length>0? data.posCollection.map((ele)=>new  PosDailyCollectionDTO(ele)):[];
       

    }
}