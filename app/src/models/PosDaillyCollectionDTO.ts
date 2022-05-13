export default class PosDailyCollectionDTO {
    PosMachine:              string;
    CollectionToday:         number;
    CollectionPreviousDay:   number;
    GamePlayToday:           number;
    GamePlayPreviousDay:     number;
   
    constructor(data:any)
    {
        this.PosMachine=data.PosMachine;
        this.CollectionToday=data.CollectionToday;
        this.CollectionPreviousDay=data.CollectionPreviousDay;
        this.GamePlayToday=data.GamePlayToday;
        this.GamePlayPreviousDay=data.GamePlayPreviousDay;

    }
}