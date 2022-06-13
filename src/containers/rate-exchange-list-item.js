import React, {Component} from "react";
import ReactChartKick, {AreaChart} from "react-chartkick"
import Chart from "chart.js"

ReactChartKick.addAdapter(Chart)
class RateExchangeListIteam extends Component {
    render(){
        console.log(this.props.rateExchange)
        const {flag, name, rates,dates,currencyCode} = this.props.rateExchange
        return (
            <tr>
                <td>{name}<br/><img src = {flag} height="60" width="100"/></td>
                <td className="col-md-12">
                    <AreaChart 
                    data={formatData(rates, dates)} 
                    xtitle="Date" 
                    ytitle={currencyCode}/></td>
            </tr>
        )
    }
}

function formatData(rates, dates)
{
    return [[dates[0], rates[0]], [dates[1], rates[1]],[dates[2], rates[2]],[dates[3], rates[3]],[dates[4], rates[4]]]
}

export default (RateExchangeListIteam)