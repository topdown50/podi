import React from 'react'

export default function useConvertionRates(initialValue) {

    const[conversionRates,setConversionRates] = React.useState(initialValue)

    const getConversionRates = () => {
        //EUR Exchange Rate
        fetch('https://www.bankofcanada.ca/valet/observations/FXEURCAD/json?recent=365').then(result => result.json()).then(output => {
            //Formating
            let exchange = (output.observations[0].d).split('-')
            let exchange_date_EUR = new Date(exchange[0],exchange[1] - 1, exchange[2])
            let exchange_value_EUR = parseFloat(output.observations[0].FXEURCAD.v)
            //Setting
            setConversionRates({exchange_date_EUR: exchange_date_EUR,exchange_value_EUR: exchange_value_EUR})
        }).then( () => {
            //USD Exchange Rate
            fetch('https://www.bankofcanada.ca/valet/observations/FXUSDCAD/json?recent=365').then(result => result.json()).then(output => {
                //Formating
                let exchange = (output.observations[0].d).split('-')
                let exchange_date_CAD = new Date(exchange[0],exchange[1] - 1, exchange[2])
                let exchange_value_CAD = parseFloat(output.observations[0].FXUSDCAD.v)
                //Setting
                setConversionRates(prevState => ({...prevState,exchange_date_USD:exchange_date_CAD,exchange_value_USD:exchange_value_CAD}))
            })
        }).catch(error => console.log(error))
    }

    React.useEffect(async () => {
        let abortController = new AbortController()
            getConversionRates()
        return () => {  
            abortController.abort()
        }  
    },[])

    
    return [conversionRates]
}
