export default class PosWeeklyCollectionDTO {
    PosMachine:              string;
    CollectionWeek:         number;
    CollectionPreviousWeek:  number;
    GamePlayWeek:            number;
    GamePlayPreviousWeek:    number;
    constructor(data:any)
    {
        this.PosMachine=data.PosMachine;
        this.CollectionWeek=data.CollectionWeek;
        this.CollectionPreviousWeek=data.CollectionPreviousWeek;
        this.GamePlayWeek=data.GamePlayWeek;
        this.GamePlayPreviousWeek=data.GamePlayPreviousWeek;
    }
}