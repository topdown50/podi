import Swal from 'sweetalert2'
import { addDays } from '../CustomFunctions/customFunctions';

export function getConversionRates(
    conversionRates,
    baseCurrency,
    convertToCurrency,
    setRates,
    exchangeRate,
    buffer,
    setChangeCurrency,
    base_currency,
    convert_to_currency
){
    if(baseCurrency === 'eur' || convertToCurrency === 'eur'){
        //Calculations
        if(baseCurrency === 'cad' && convertToCurrency === 'eur'){
            //Exchange rate Calculations
            const exchange_rate = 1 / conversionRates.exchange_value_EUR
            const percentage = buffer ? buffer / 100 : 0;
            const exchange_percentage = exchange_rate * percentage
            setRates(prevState => ({...prevState,[exchangeRate]: parseFloat((exchange_rate + exchange_percentage).toFixed(2)) ,exchange_rate_date: conversionRates.exchange_date_EUR ? conversionRates.exchange_date_EUR.toISOString().slice(0, 10): new Date().toISOString().slice(0, 10)}))
        }
        else if(baseCurrency === 'eur' && convertToCurrency === 'cad'){
            //Exchange rate Calculations
            const exchange_rate = conversionRates.exchange_value_EUR
            const percentage = buffer ? buffer / 100 : 0;
            const exchange_percentage = exchange_rate * percentage
            setRates(prevState => ({...prevState,[exchangeRate]: parseFloat((exchange_rate + exchange_percentage).toFixed(2)) ,exchange_rate_date: conversionRates.exchange_date_EUR ? conversionRates.exchange_date_EUR.toISOString().slice(0, 10): new Date().toISOString().slice(0, 10)}))
        }
        else {
            Swal.fire(
                'Exchange Rate',
                `This Conversion is not allowed`,
                'warning'
            )
            setChangeCurrency(prevState => ({...prevState,[base_currency]:'cad',[convert_to_currency]:'cad'}))
        }
        
    }else{
        //Calculations
        if(baseCurrency === 'cad' && convertToCurrency === 'cad'){
            setRates(prevState => ({...prevState,[exchangeRate]: 1,exchange_rate_date: new Date().toISOString().slice(0, 10)}))
        }
        else if(baseCurrency === 'eur' && convertToCurrency === 'eur'){
            setRates(prevState => ({...prevState,[exchangeRate]: 1,exchange_rate_date: new Date().toISOString().slice(0, 10)}))
        }
        else if(baseCurrency === 'usd' && convertToCurrency === 'usd'){
            setRates(prevState => ({...prevState,[exchangeRate]: 1,exchange_rate_date: new Date().toISOString().slice(0, 10)}))
        }
        else if(baseCurrency === 'cad' && convertToCurrency === 'usd'){
            const exchange_rate = 1 / conversionRates.exchange_value_USD
            const percentage = buffer ? buffer / 100 : 0;
            const exchange_percentage = exchange_rate * percentage
            setRates(prevState => ({...prevState,[exchangeRate]: parseFloat((exchange_rate + exchange_percentage).toFixed(2)) ,exchange_rate_date: conversionRates.exchange_date_USD ? conversionRates.exchange_date_USD.toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)}))
        }
        else if(baseCurrency === 'usd' && convertToCurrency === 'cad'){
            const exchange_rate = conversionRates.exchange_value_USD
            const percentage = buffer ? buffer / 100 : 0;
            const exchange_percentage = exchange_rate * percentage
            setRates(prevState => ({...prevState,[exchangeRate]: parseFloat((exchange_rate + exchange_percentage).toFixed(2)) ,exchange_rate_date: conversionRates.exchange_date_USD ? conversionRates.exchange_date_USD.toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)}))
        }
        else {
            Swal.fire(
                'Exchange Rate',
                `This Conversion is not allowed`,
                'warning'
            )
            setChangeCurrency(prevState => ({...prevState,[base_currency]:'cad',[convert_to_currency]:'cad'}))
        }
    }
    
}