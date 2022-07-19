export function landedCostCalc(purchaseOrder,charges,items,setItems,rates){
    let newItemValues = [...items];
    let total_pallets = 0;
    let quantity_order = 0;

    newItemValues.forEach(item => {
        total_pallets += item.quantityPallets ? item.quantityPallets : 0;
        quantity_order += item.quantityorder ? item.quantityorder : 0;
    })

    items.forEach((item,index) => {
        //Item cost
        let item_unit_price = item.unit_price ? item.unit_price : 0
        let item_quantity_order = item.quantityorder ? item.quantityorder : 0
        let item_quantity_pallets = item.quantityPallets ? item.quantityPallets : 0
        let new_total_pallets = total_pallets === 0 ? 1 : total_pallets
        //Landed Cost
        if(purchaseOrder.transport_type === 'land' && item.unit_price && item.quantityorder && item.quantityPallets){
            //Calculations
            let total_fruit_cost = parseFloat(item_unit_price * item_quantity_order) //48
            let trucking_cost = parseFloat((charges.transportcharges ? charges.transportcharges : 0) / new_total_pallets) //0
            let trucking_cost_2 = parseFloat(trucking_cost * item_quantity_pallets)
            let quantity_conversion = total_fruit_cost + trucking_cost_2
            let quantity_conversion_2 = quantity_conversion * purchaseOrder.exchange_rate
            let rutherford = parseFloat(charges.customscharges ? charges.customscharges : 0 / new_total_pallets)
            let rutherford_2 = parseFloat(rutherford * item_quantity_pallets)
            let wire_transfer = parseFloat(charges.bankingFees ? charges.bankingFees : 0 / new_total_pallets)
            let wire_transfer_2 = wire_transfer * item_quantity_pallets
            let commission_charge = parseFloat(charges.commission ? charges.commission : 0 / new_total_pallets)
            let commission_charge_2 = parseFloat(commission_charge * item_quantity_pallets)
            let total_per_pallet = quantity_conversion_2 + rutherford_2 + wire_transfer_2 + commission_charge_2
            //Set landedCost
            newItemValues[index]['landedCost'] = parseFloat((total_per_pallet / item_quantity_order).toFixed(2))
            setItems(newItemValues);
        }else if(purchaseOrder.transport_type === 'air' && item.unit_price && item.quantityorder && item.quantityPallets){
            let item_charges = 0;
            let chargesCost = 0;
            if(item.grossWeight){
                let gross_weight = item.grossWeight / item_quantity_order
                let feight_rate_converted = parseFloat((charges.freightRate ? charges.freightRate : 0) * rates.exchangeRateFreight)
                let weight_charges = gross_weight * feight_rate_converted
                let custom_charges_converted = parseFloat((charges.customscharges ? charges.customscharges : 0) * rates.exchange_rate_customs)
                let custom_charges = custom_charges_converted / quantity_order
                let banking_fees_converted = parseFloat((charges.bankingFees ? charges.bankingFees : 0) * rates.exchangeRateBanking)
                let banking_fees = banking_fees_converted / quantity_order
                let tracking_cost_converted = parseFloat((charges.truckingCost ? charges.truckingCost: 0) * rates.exchangeRateTrucking)
                let tracking_cost = tracking_cost_converted / quantity_order
                let customs_usa_converted = parseFloat((charges.customsUSA ? charges.customsUSA : 0) * rates.exchangeRateUSA)
                let customs_usa = customs_usa_converted / quantity_order
                let commission_converted = parseFloat((charges.commission ? charges.commission : 0) * rates.exchangeRateCommission)
                let commission_charge = commission_converted / quantity_order
                chargesCost = weight_charges + custom_charges + banking_fees + tracking_cost + customs_usa + commission_charge
            }
            else{
                let transport_converted = parseFloat((charges.transportcharges ? charges.transportcharges : 0) * rates.exchange_rate_charges)
                let customs_converted = parseFloat((charges.customscharges ? charges.customscharges : 0) * rates.exchange_rate_customs)
                let banking_fees_converted = parseFloat((charges.bankingFees ? charges.bankingFees : 0) * rates.exchangeRateBanking)
                let tracking_cost_converted = parseFloat((charges.truckingCost ? charges.truckingCost: 0) * rates.exchangeRateTrucking)
                let commission_converted = parseFloat((charges.commission ? charges.commission : 0) * rates.exchangeRateCommission)
                item_charges = transport_converted + customs_converted + banking_fees_converted + tracking_cost_converted + commission_converted;
                chargesCost = item_charges / quantity_order
            }
            let unitPrice = parseFloat(item.pricetotal / quantity_order)
            newItemValues[index]['landedCost'] = parseFloat((unitPrice + chargesCost).toFixed(2))
            setItems(newItemValues);
        }
    })
}