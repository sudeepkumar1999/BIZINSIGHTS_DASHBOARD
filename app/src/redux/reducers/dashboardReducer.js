import * as types from '../actions/types'
let initialState = {
    dashboardDTO: [],
    startTime:null,
    dbQuery:null,
    token:null,
    reportId:null,
    reportName:null,
    webURL:null,
    currentReportId:null,
    currentdbQuery:null,
    updateDashboard:false
}

export const dashboard = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_DASHBOARD_DETAILS_SUCCESS:
          
            return {
                ...state,
                dashboardDTO:action.payload
            }
            case types.FETCH_START_TIME_SUCCESS:
               
                return {
                    ...state,
                    startTime:action.payload
                }

             case types.SET_DB_QUERY:
                  
                   
                   
                    return {
                        ...state,
                        dbQuery:action.payload
                      
                    }
            case types.FETCH_TOKEN_SUCCESS:
                       
                         
                         
                          return {
                              ...state,
                              token:action.payload
                            
                          }
             case types.SET_REPORT_ID:
                       
                        return {
                                  ...state,
                                  reportId:action.payload
                                
                              }
             case types.SET_WEB_VIEW_URL:
                       
                         return {
                                  ...state,
                                  webURL:action.payload
                                        
                                }
            case types.STORE_REPORT_ID:
              
                    return {
                             ...state,
                             currentReportId:action.payload
                                                    
                            }
            case types.STORE_DB_QUERY:
                return {
                    ...state, currentdbQuery: action.payload
                }

            case types.SET_REPORT_NAME:
                return {
                    ...state,reportName:action.payload
                }
            case types.UPDATE_REQUIRED:
             
                return {
                    ...state, updateDashboard:action.payload
                }
                
                   
        
        default: return state;
    }
}
