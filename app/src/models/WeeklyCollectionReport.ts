import  PosDailyCollectionDTO from './PosDaillyCollectionDTO'
import PosWeeklyCollectionDTO from './PosDaillyCollectionDTO'

export  default class WeeklyCollectionReportDTO {
  

   
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
       this.PresentCollection=data.CollectionWeek;
       this.PastCollection=data.CollectionPreviousWeek
       this.PresentConsumption=data.GamePlayWeek;
       this.PastConsumption=data.GamePlayPreviousWeek;
       this.PosCollection=data.posCollection.length>0? data.posCollection.map((ele)=>new  PosWeeklyCollectionDTO(ele)):[];
       

    }
}



