export async function getConversionRates(){
    let exchange_date_EUR = new Date()
    let exchange_date_CAD = new Date()
    let exchange_value_EUR = 0;
    let exchange_value_CAD = 0;
    //EUR Exchange Rate
    fetch('https://www.bankofcanada.ca/valet/observations/FXEURCAD/json?recent=365').then(result => result.json()).then(output => {
        //Formating
        let exchange = (output.observations[0].d).split('-')
        exchange_date_EUR = new Date(exchange[0],exchange[1] - 1, exchange[2])
        exchange_value_EUR = parseFloat(output.observations[0].FXEURCAD.v)
    }).catch(error => console.log(error))
    //USD Exchange Rate
    fetch('https://www.bankofcanada.ca/valet/observations/FXUSDCAD/json?recent=365').then(result => result.json()).then(output => {
        //Formating
        let exchange = (output.observations[0].d).split('-')
        exchange_date_CAD = new Date(exchange[0],exchange[1] - 1, exchange[2])
        exchange_value_CAD = parseFloat(output.observations[0].FXUSDCAD.v)
    }).catch(error => console.log(error))

    return[exchange_date_EUR,exchange_date_CAD,exchange_value_EUR,exchange_value_CAD]
}