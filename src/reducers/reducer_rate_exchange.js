import {GET_RATE_EXCHANGE} from "../action/index"

const initialState = {
    rateExchangeList : []
}

export default function(oldRateExhangeReducer = initialState, action){
    switch(action.type){
        case GET_RATE_EXCHANGE :
            return {
                ...oldRateExhangeReducer,
                rateExchangeList : [action.payload, ...oldRateExhangeReducer.rateExchangeList]
            };
            default :
              return oldRateExhangeReducer;
    }
}