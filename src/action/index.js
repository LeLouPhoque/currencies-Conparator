import axios from "axios"

export const GET_COUNTRIES = "GET_COUNTRIES"
export const GET_RATE_EXCHANGE = "GET_RATE_EXCHANGE"

export function fetchCountries(){
    return function(dispatch){
        axios.get("https://restcountries.com/v2/all").then(axiosResponse => {
            dispatch({type: GET_COUNTRIES, payload : axiosResponse.data});
        });
    };
}


export function fetchRateExchange(country){
    return function(dispatch){
        getDaysForApiRequest(country).then(axiosResponse => {
            dispatch({type : GET_RATE_EXCHANGE, 
                payload : {rates : axiosResponse.data.rates,dates : axiosResponse.data.Date, ...country}
            });
        });
    }
}

function getDaysForApiRequest(country){
    const today = new Date();
    let hebdomadoryDateList = []; // stock la date du jour, (plus bas nous stockerons les 4 autres dates)
    let requestsList = []; // Le tableau des 5 requetes qu'on effectuera
    for (let i = 0; i < 5; i++) {
        const previousWeek = new Date().setDate(today.getDate() - (14 * (i + 1)))
        const formatedPreviousWeekYears = new Date(previousWeek).toLocaleDateString("ko-KR",).slice(0, 4);
        const formatedPreviousWeekMonth = new Date(previousWeek).toLocaleDateString("ko-KR",).slice(5, 7).replace(" ",0).replace(".", "");
        var formatedPreviousWeekDay = new Date(previousWeek).toLocaleDateString("ko-KR",).slice(9, 11).replace(".", "") ;
        if (formatedPreviousWeekDay.length === 1)
            formatedPreviousWeekDay = "0"+formatedPreviousWeekDay;
        let formatedPreviousWeek = formatedPreviousWeekYears +"-"+ formatedPreviousWeekMonth +"-"+ formatedPreviousWeekDay
        hebdomadoryDateList.push(formatedPreviousWeek)
        requestsList.push(axios.get(`http://api.exchangeratesapi.io/v1/${formatedPreviousWeek}?symbols=${country.currencyCode}&access_key=46054ec1e5c85862708fb5cd26c34f79`))
    }
    return (asyncCall(requestsList,hebdomadoryDateList,country));
}

async function asyncCall(requestsList,_hebdomadoryDateList,country) {
    let lastMonthHistoricalRatesResponseList = await Promise.all(requestsList);
    const initialState = {
        "data" : 
            {"base" : lastMonthHistoricalRatesResponseList[0].data.base ,
            "rates" :
                {
                    0 :  lastMonthHistoricalRatesResponseList[0].data.rates[country.currencyCode],
                    1 :  lastMonthHistoricalRatesResponseList[1].data.rates[country.currencyCode],
                    2 :  lastMonthHistoricalRatesResponseList[2].data.rates[country.currencyCode],
                    3 :  lastMonthHistoricalRatesResponseList[3].data.rates[country.currencyCode],
                    4 :  lastMonthHistoricalRatesResponseList[4].data.rates[country.currencyCode],

                },
            "Date" :
            {
                0 :  lastMonthHistoricalRatesResponseList[0].data.date,
                1 :  lastMonthHistoricalRatesResponseList[1].data.date,
                2 :  lastMonthHistoricalRatesResponseList[2].data.date,
                3 :  lastMonthHistoricalRatesResponseList[3].data.date,
                4 :  lastMonthHistoricalRatesResponseList[4].data.date,
            }
            }
        }
        console.log(initialState)
    return (initialState)
}