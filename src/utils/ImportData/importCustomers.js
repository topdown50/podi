const import_customers = () => {
    Promise.all(results.data.map( async row => {

        let company = row.Company.trim()

        if(company === 'TSI Tropicals'){
            let companyID = 'd43a4002-0766-4b44-98fc-b2478031f30c';
            let email = row['A/P Email'];
            let companyName = row['Company Name'];
            let contact_id_zb = row['Contact ID ZB'];
            let name = row.Name;
            let phone = row.Phone

            if(email === ''){
                await DataStore.save(
                    new Customer({
                        "company_name": companyName.trim(),
                        "name": name.trim(),
                        "phone": phone.trim(),
                        "companyID": companyID,
                        "zb_contact_id": contact_id_zb.trim()
                    })
                );
            }else{
                await DataStore.save(
                    new Customer({
                        "company_name": companyName.trim(),
                        "name": name.trim(),
                        "phone": phone.trim(),
                        "email": email.trim(),
                        "companyID": companyID,
                        "zb_contact_id": contact_id_zb.trim()
                    })
                );
            }
            
        }
    }))
}

const import_suppliers = (results) => {
    Promise.all(results.data.map( async row => {
        let company = row.Company.trim()

        if(company === 'TSI Tropicals'){
            let companyID = 'd43a4002-0766-4b44-98fc-b2478031f30c';
            let contact_id_zb = row['Contact ID ZB'];
            let phone = row.Phone
            let email = row['Purchasing Email'];
            let name = row['Supplier Name'];
            let supplierShortName = row['Supplier Short Name'];         


            if(email === ''){
                await DataStore.save(
                    new Supplier({
                        "name": name.trim(),
                        "short_name": supplierShortName.trim(),
                        "phone": phone.trim(),
                        "zb_contact_id": contact_id_zb.trim(),
                        "companyID": companyID,
                    })
                );
            }else{
                await DataStore.save(
                    new Supplier({
                        "name": name.trim(),
                        "short_name": supplierShortName.trim(),
                        "phone": phone.trim(),
                        "purchasing_email": email.trim(),
                        "zb_contact_id": contact_id_zb.trim(),
                        "companyID": companyID,
                    })
                );
            }
            
        }
    }))
}

const import_items = async (results) => {
    Promise.all(results.data.map( async row => {
        let company = row.Company.trim()

        if(company === 'TSI Tropicals'){

            let companyID = 'd43a4002-0766-4b44-98fc-b2478031f30c';

            let item_sku = row['Item/Product SKU'].trim()
            let product_name = row['Item/Product Name'].trim()
            let type = row.Type.trim()
            let supplier = row['Supplier Information'].trim()
            let supplier_code = row['Supplier Item Code'].trim()
            let cases_per_pallet = row['Cases per pallet'].trim()
            let item_cost = row['Item Cost'].trim()
            let item_id_zb = row['item ID ZB'].trim()

            let item_type = ''

            if(type === 'Products for Resale'){
                item_type = 'productResale'
            }else if(type === 'Raw Materials'){
                item_type = 'rawMaterial'
            }else if(type === 'Finished Goods'){
                item_type = 'finishedGoods'
            }

            const supplierModels = (await DataStore.query(Supplier)).filter(supp => supp.name === supplier);

            if(supplierModels.length !== 0){
                if(item_cost !== ''){
                    await DataStore.save(
                        new Item({
                            "name": product_name,
                            "sku": item_sku,
                            "supplier_code": supplier_code,
                            "cost": parseInt(item_cost),
                            "type": item_type,
                            "zb_item_id": item_id_zb,
                            "cases_per_pallet": parseInt(cases_per_pallet),
                            "companyID": companyID,
                            "supplierID": supplierModels[0].id,
                        })
                    );
                }else{
                    await DataStore.save(
                        new Item({
                            "name": product_name,
                            "sku": item_sku,
                            "supplier_code": supplier_code,
                            "type": item_type,
                            "zb_item_id": item_id_zb,
                            "cases_per_pallet": parseInt(cases_per_pallet),
                            "companyID": companyID,
                            "supplierID": supplierModels[0].id,
                        })
                    );
                }
            }
        }
    }))
}

const import_po = async (results) => {
    Promise.all(results.data.map( async row => {
        let company = row.Company.trim()

        if(company === 'TSI Tropicals'){

            let companyID = 'd43a4002-0766-4b44-98fc-b2478031f30c';
            let po_date = new Date(row['P.O. Date'].trim()).toISOString().slice(0, 10);
            let po_number = row['P.O. #'].trim()
            let transport_type = row['Transport Type'].trim().toLowerCase()
            
            let bol_invoice_number = row['BOL / Invoice #'].trim()
            let status = row.Status.trim()
            let exchange_rate = parseFloat(row['Exchange Rate'].trim())
            let exchange_rate_date = new Date(row['Exchange Rate Date'].trim()).toISOString().slice(0, 10);
            let order_type = 'Purchase Order'

            let flag_complete = row['Make this order as completed'].trim() === 'true'
            let supplier_name = row.Supplier.trim()

            //Purchase Order Rates
            let exchangeRateFreight = row['Exchange Rate Charges'].trim()
            if(exchangeRateFreight === ''){
                exchangeRateFreight = 0;
            }else{
                exchangeRateFreight = parseFloat(row['Exchange Rate Charges'].trim())
            }
            
            let charges_exchange_rate_date = new Date(row['Exchange Rate Date Charges'].trim()).toISOString().slice(0, 10);
            
            let exchangeRateBanking = parseFloat(row['Exchange Rate Banking'].trim())
            if(exchangeRateBanking === ''){
                exchangeRateBanking = 0;
            }else{
                exchangeRateBanking = parseFloat(row['Exchange Rate Banking'].trim())
            }

            let exchange_rate_charges = row['Exchange Rate Charges'].trim()
            if(exchange_rate_charges === ''){
                exchange_rate_charges = 0;
            }else{
                exchange_rate_charges = parseFloat(row['Exchange Rate Charges'].trim())
            }

            let exchangeRateUSA = row['Exchange Rate USA'].trim()
            if(exchangeRateUSA === ''){
                exchangeRateUSA = 0;
            }else{
                exchangeRateUSA = parseFloat(row['Exchange Rate USA'].trim())
            }

            let exchange_rate_customs = row['Exchange Rate Customs'].trim()
            if(exchange_rate_customs === ''){
                exchange_rate_customs = 0;
            }else{
                exchange_rate_customs = parseFloat(row['Exchange Rate Customs'].trim())
            }

            let exchangeRateCommission = row['Exchange Rate Commission'].trim()
            if(exchangeRateCommission === ''){
                exchangeRateCommission = 0;
            }else{
                exchangeRateCommission = parseFloat(row['Exchange Rate Commission'].trim())
            }

            let exchangeRateTrucking = row['Exchange Rate Tracking'].trim()
            if(exchangeRateTrucking === ''){
                exchangeRateTrucking = 0;
            }else{
                exchangeRateTrucking = parseFloat(row['Exchange Rate Tracking'].trim())
            }

            //Purchase Order Charges
            let transportcharges = row.Transport.trim()
            if(transportcharges === ''){
                transportcharges = 0;
            }else{
                transportcharges = parseFloat(row.Transport.trim())
            }

            let bankingFees = row['Banking Fees'].trim()
            if(bankingFees === ''){
                bankingFees = 0;
            }else{
                bankingFees = parseFloat(row['Banking Fees'].trim())
            }

            let customscharges = row.Customs.trim()
            if(customscharges === ''){
                customscharges = 0;
            }else{
                customscharges = parseFloat(row.Customs.trim())
            }

            let commission = row.Commission.trim()
            if(commission === ''){
                commission = 0;
            }else{
                commission = parseFloat(row.Commission.trim())
            }

            let freightRate = row['Kg Air Feight Rate'].trim()
            if(freightRate === ''){
                freightRate = 0;
            }else{
                freightRate = parseFloat(row['Kg Air Feight Rate'].trim())
            }
            let shipmentWeight = row['Shipment Weight'].trim()
            if(shipmentWeight === ''){
                shipmentWeight = 0;
            }else{
                shipmentWeight = parseFloat(row['Shipment Weight'].trim())
            }

            let customsUSA = row['Customs USA'].trim()
            if(customsUSA === ''){
                customsUSA = 0;
            }else{
                customsUSA = parseFloat(row['Customs USA'].trim())
            }

            let truckingCost = row['Trucking Cost'].trim()
            if(truckingCost === ''){
                truckingCost = 0;
            }else{
                truckingCost = parseFloat(row['Trucking Cost'].trim())
            }

            //Change Currency
            let base_currency = row['Base Currency'].trim().toLowerCase()
            let baseCurrencyCharges = row['Base Currency Charges'].trim().toLowerCase()
            let convert_to_currency = row['Convert to Currency'].trim().toLowerCase()
            let baseCurrencyCommission = row['Base Currency Commission'].trim().toLowerCase()
            let baseCurrencyFreight = row['Base Currency Charges'].trim().toLowerCase()
            let baseCurrencyTrucking = row['Base Currency Trucking'].trim().toLowerCase()
            let baseCurrencyCustoms = row['Base Currency Customs'].trim().toLowerCase()
            let baseCurrencyUSA = row['Base Currency USA'].trim().toLowerCase()
            let baseCurrencyBanking = row['Base Currency Banking'].trim().toLowerCase()
            let convert_to_charges = row['Convert to Currency Charges'].trim().toLowerCase()

            //totals
            let totalcharges = parseFloat(row['Total Charges'])
            let productstotal = parseFloat(row['Items/Products'])

            let total_freightRate = row['Total Air Freight Rate']
            if(total_freightRate === ''){
                total_freightRate = 0;
            }else{
                total_freightRate = parseFloat(row['Total Air Freight Rate'])
            }

            let caseCount = parseFloat(row['Total Case Count'])
            let totalBankingFees = parseFloat(row['Total Banking Fees'])
            let productsChargesBaseC = parseFloat(row['Items/Products Base Currency'])

            //Bill ID ZB
            let bill_id_zb = row['Bill ID ZB'].trim()
            let bill_info_supp = row['Create the bill in the name of'].trim()
            let invoice_number = row['Invoice Number'].trim()
            
            const supplierModels = (await DataStore.query(Supplier)).filter(supp => supp.name === supplier_name)
            const supplierModelsBill = (await DataStore.query(Supplier)).filter(supp => supp.name === bill_info_supp)

            if(supplierModels.length !== 0){
                if(supplierModelsBill.length !== 0){
                    console.log('guardado ' + po_number)
                    await DataStore.save(
                        new PurchaseOrder({
                            "po_date": po_date,
                            "po_number": po_number,
                            "transport_type": transport_type,
                            "bol_invoice_number": bol_invoice_number,
                            "status": status,
                            "exchange_rate": exchange_rate,
                            "exchange_rate_date": exchange_rate_date,
                            "order_type": order_type,
                            "flag_complete": flag_complete,
                            "companyID": companyID,
                            "supplierID": supplierModels[0].id,
                            "bill_id_zb": bill_id_zb,
                            "PurchaseOrderRates": {
                                exchangeRateFreight: exchangeRateFreight,
                                exchange_rate_date: charges_exchange_rate_date,
                                exchangeRateBanking: exchangeRateBanking,
                                exchange_rate_charges: exchange_rate_charges,
                                exchangeRateUSA: exchangeRateUSA,
                                exchange_rate_customs: exchange_rate_customs,
                                exchangeRateCommission: exchangeRateCommission,
                                exchangeRateTrucking: exchangeRateTrucking,
                            },
                            "PurchaseOrderCharges":  {
                                transportcharges: transportcharges,
                                bankingFees: bankingFees,
                                customscharges: customscharges,
                                commission: commission,
                                freightRate: freightRate,
                                shipmentWeight: shipmentWeight,
                                customsUSA: customsUSA,
                                truckingCost: truckingCost
                            },
                            "ChangeCurrency":  {
                                base_currency: base_currency,
                                baseCurrencyCharges: baseCurrencyCharges,
                                convert_to_currency: convert_to_currency,
                                baseCurrencyCommission: baseCurrencyCommission,
                                baseCurrencyFreight: baseCurrencyFreight,
                                baseCurrencyTrucking: baseCurrencyTrucking,
                                baseCurrencyCustoms: baseCurrencyCustoms,
                                baseCurrencyUSA: baseCurrencyUSA,
                                baseCurrencyBanking: baseCurrencyBanking,
                                convert_to_charges: convert_to_charges,
                            },
                            "totals":  {
                                totalcharges: totalcharges,
                                productstotal: productstotal,
                                total_freightRate: total_freightRate,
                                caseCount: caseCount,
                                totalBankingFees: totalBankingFees,
                                productsChargesBaseC: productsChargesBaseC
                            },
                            "bill_id_zb": bill_id_zb,
                            "bill_info": {
                                supplierID: supplierModelsBill[0].id,
                                invoice_number: invoice_number
                            }
                        })
                    );
                }else{
                    console.log('guardado ' + po_number)
                    await DataStore.save(
                        new PurchaseOrder({
                            "po_date": po_date,
                            "po_number": po_number,
                            "transport_type": transport_type,
                            "bol_invoice_number": bol_invoice_number,
                            "status": status,
                            "exchange_rate": exchange_rate,
                            "exchange_rate_date": exchange_rate_date,
                            "order_type": order_type,
                            "flag_complete": flag_complete,
                            "companyID": companyID,
                            "supplierID": supplierModels[0].id,
                            "bill_id_zb": bill_id_zb,
                            "PurchaseOrderRates": {
                                exchangeRateFreight: exchangeRateFreight,
                                exchange_rate_date: charges_exchange_rate_date,
                                exchangeRateBanking: exchangeRateBanking,
                                exchange_rate_charges: exchange_rate_charges,
                                exchangeRateUSA: exchangeRateUSA,
                                exchange_rate_customs: exchange_rate_customs,
                                exchangeRateCommission: exchangeRateCommission,
                                exchangeRateTrucking: exchangeRateTrucking,
                            },
                            "PurchaseOrderCharges":  {
                                transportcharges: transportcharges,
                                bankingFees: bankingFees,
                                customscharges: customscharges,
                                commission: commission,
                                freightRate: freightRate,
                                shipmentWeight: shipmentWeight,
                                customsUSA: customsUSA,
                                truckingCost: truckingCost
                            },
                            "ChangeCurrency":  {
                                base_currency: base_currency,
                                baseCurrencyCharges: baseCurrencyCharges,
                                convert_to_currency: convert_to_currency,
                                baseCurrencyCommission: baseCurrencyCommission,
                                baseCurrencyFreight: baseCurrencyFreight,
                                baseCurrencyTrucking: baseCurrencyTrucking,
                                baseCurrencyCustoms: baseCurrencyCustoms,
                                baseCurrencyUSA: baseCurrencyUSA,
                                baseCurrencyBanking: baseCurrencyBanking,
                                convert_to_charges: convert_to_charges,
                            },
                            "totals":  {
                                totalcharges: totalcharges,
                                productstotal: productstotal,
                                total_freightRate: total_freightRate,
                                caseCount: caseCount,
                                totalBankingFees: totalBankingFees,
                                productsChargesBaseC: productsChargesBaseC
                            },
                            "bill_id_zb": bill_id_zb,
                            "bill_info": {
                                invoice_number: invoice_number
                            }
                        })
                    );
                }
                
            }
            if(supplierModelsBill.length !== 0){
                
            }
            
        }
    }))
}

const import_po_items = (results) => {
    Promise.all(results.data.map( async row => {
        let company = row.Company.trim()

        if(company === 'TSI Tropicals'){

            let companyID = 'd43a4002-0766-4b44-98fc-b2478031f30c';
            let lot_number = parseInt(row['Lot #'].trim())
            let typeMeasure = row['Type of measure'].trim().toLowerCase()
            let quantityorder = parseFloat(row['Order Count'].trim())
            let quantityreceipt = parseFloat(row['Receive Count'].trim())
            let unit_price = parseFloat(row['Unit Price'].trim())
            let grossWeight = parseFloat(row['Gross Weight'].trim())
            let quantityPallets = parseFloat(row.Pallets.trim())
            let pricetotal = parseFloat(row['Total Price'].trim())
            let landedCost = parseFloat(row['Landed Cost'].trim())

            let purchaseOrder = row['Purchase Order'].trim()
            let item = row['Item/Product - SKU#'].trim().split('SKU#')[1]
            let storageLocation = row['Storage Location'].trim()

            const purchaseOrderModels = (await DataStore.query(PurchaseOrder)).filter(po => po.po_number === purchaseOrder)
            const itemModels = (await DataStore.query(Item)).filter(myItem => myItem.sku === item)

            if(purchaseOrderModels.length !== 0){
                if(storageLocation !== ''){
                    console.log("Guardando " + lot_number)
                    await DataStore.save(
                        new PurchaseOrderItems({
                            "lot_number": lot_number,
                            "typeMeasure": typeMeasure,
                            "quantityorder": quantityorder,
                            "quantityreceipt": quantityreceipt,
                            "unit_price": unit_price,
                            "grossWeight": grossWeight,
                            "quantityPallets": quantityPallets,
                            "pricetotal": pricetotal,
                            "landedCost": landedCost,
                            "purchaseorderID": purchaseOrderModels[0].id,
                            "itemID": itemModels[0].id,
                            "companyID": companyID,
                            "storagelocationID": "35f36228-8a15-4328-a753-bf52cd66ca6b"
                        })
                    );
                }else{
                    await DataStore.save(
                        new PurchaseOrderItems({
                            "lot_number": lot_number,
                            "typeMeasure": typeMeasure,
                            "quantityorder": quantityorder,
                            "quantityreceipt": quantityreceipt,
                            "unit_price": unit_price,
                            "grossWeight": grossWeight,
                            "quantityPallets": quantityPallets,
                            "pricetotal": pricetotal,
                            "landedCost": landedCost,
                            "purchaseorderID": purchaseOrderModels[0].id,
                            "itemID": itemModels[0].id,
                            "companyID": companyID
                        })
                    );
                }
                
                
            }
            
        }
    }))
}