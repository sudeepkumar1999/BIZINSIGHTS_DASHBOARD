export class WeeklyCollectionReportDTO {
  

   
    SiteId:number;
    SiteName:string;
    CollectionToday:number;
    CollectionPreviousDay:number;
    CollectionWeek:number;
    GamePlayToday:number;
    GamePlayPreviousDay:number;
    GamePlayWeek:number;
    GamePlayPreviousWeek:number;
    posCollection:any;



    constructor(data: any) {
       this.SiteId=data.SiteId,
       this.SiteName=data.SiteName
       this.CollectionToday=data.CollectionToday;
       this.CollectionPreviousDay=data.CollectionPreviousD;
       this.CollectionWeek=data.CollectionWeek;
       this.GamePlayToday=data.GamePlayToday;
       this.GamePlayPreviousDay=data.GamePlayPreviousDay;
       this.GamePlayWeek=data.GamePlayWeek;
       this.GamePlayPreviousWeek=data.GamePlayPreviousWeek;
       this.posCollection=data.posCollection;

    }
}