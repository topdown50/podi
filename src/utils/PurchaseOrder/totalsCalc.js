export function totalsCalc(purchaseOrder,charges,items,rates,setTotals){
    let newItemValues = [...items];
    //Items / Products
    let product_total = 0;

    newItemValues.forEach(item => {
        if(item.pricetotal){
            product_total += item.pricetotal
        }
    })

    setTotals((prevState) => ({...prevState,productstotal: parseFloat((product_total).toFixed(2))}))

    //Items / Products Base Currency
    let base_currency_total = 0;

    newItemValues.forEach(item => {
        if(item.quantityorder && item.unit_price){
            base_currency_total += parseFloat(item.quantityorder * item.unit_price)
        }
    })

    setTotals((prevState) => ({...prevState,productsChargesBaseC: base_currency_total}))
    //Land or Air
    if(purchaseOrder.transport_type === 'land'){
        let item_charges = 0
        let transport_converted = parseFloat((charges.transportcharges ? charges.transportcharges : 0) * rates.exchange_rate_charges)
        let customs_converted = parseFloat((charges.customscharges ? charges.customscharges : 0) * rates.exchange_rate_customs)
        let commission_converted = parseFloat((charges.commission ? charges.commission : 0) * rates.exchangeRateCommission)
        let banking_fees_converted = parseFloat((charges.bankingFees ? charges.bankingFees : 0) * rates.exchangeRateBanking)
        item_charges = transport_converted + customs_converted + commission_converted + product_total + banking_fees_converted
        //Setting Banking Fees
        setTotals((prevState) => ({...prevState,totalBankingFees: parseFloat((banking_fees_converted).toFixed(2))}))
        //Setting Total Charges
        setTotals((prevState) => ({...prevState,totalcharges: parseFloat((item_charges).toFixed(2))}))
    }else{
        let item_charges = 0
        let freightRate = (charges.freightRate ? charges.freightRate : 0) * (charges.shipmentWeight ? charges.shipmentWeight : 0)
        let freightRate_converted = freightRate * rates.exchangeRateFreight
        let customs_converted = parseFloat((charges.customscharges ? charges.customscharges : 0) * rates.exchange_rate_customs)
        let tracking_cost_converted = parseFloat((charges.truckingCost ? charges.truckingCost: 0) * rates.exchangeRateTrucking)
        item_charges = freightRate_converted + customs_converted + tracking_cost_converted
        //Banking fees
        let banking_fees_converted = parseFloat((charges.bankingFees ? charges.bankingFees : 0) * rates.exchangeRateBanking)
        //customs usa
        let customs_usa_converted = parseFloat((charges.customsUSA ? charges.customsUSA : 0) * rates.exchangeRateUSA)
        //commission converted
        let commission_converted = parseFloat((charges.commission ? charges.commission : 0) * rates.exchangeRateCommission)
        //Setting Freight Rate
        setTotals((prevState) => ({...prevState,total_freightRate: parseFloat((freightRate).toFixed(2))}))
        //Setting Banking fees
        setTotals((prevState) => ({...prevState,totalBankingFees: parseFloat((banking_fees_converted).toFixed(2))}))
        //Setting Total Charges
        let total_charges = item_charges + product_total + banking_fees_converted + customs_usa_converted + commission_converted
        setTotals((prevState) => ({...prevState,totalcharges: parseFloat((total_charges).toFixed(2))}))
    }

    //Total Case Count
    let total_cases = 0;

    newItemValues.forEach(item => {
        if(item.quantityorder){
            total_cases += parseFloat(item.quantityorder)
        }
    })

    setTotals((prevState) => ({...prevState,caseCount: parseFloat((total_cases).toFixed(2))}))
}