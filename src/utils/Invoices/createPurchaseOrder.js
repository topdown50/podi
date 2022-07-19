import { DataStore } from '@aws-amplify/datastore';
import { PurchaseOrder } from '../../models';
import { Supplier } from '../../models';
// import { ShippingAddress } from '../../models';
import { BillingAddress } from '../../models';
import { PurchaseOrderItems } from '../../models';
import { Item } from '../../models';
import { User } from '../../models';
import { createInvoiceLabel } from './createInvoiceLabel';

export async function printPurchaseOrder(purchaseForms){
    purchaseForms.map( async (purchaseForm) => {

        const purchaseModel = await DataStore.query(PurchaseOrder,purchaseForm.id);

        let supplierID = ''

        console.log(purchaseModel)

        if(purchaseModel.bill_info){
            if(purchaseModel.bill_info.supplierID !== '' && purchaseModel.bill_info.supplierID !== undefined){
                supplierID = purchaseModel.bill_info.supplierID
            }
        }else{
            supplierID = purchaseModel.supplierID
        }

        const supplierModel = await DataStore.query(Supplier,supplierID);
        // const shippingModel = (await DataStore.query(ShippingAddress)).filter((shippAdd) => shippAdd.supplierID === supplierModel.id)
        const billingModel = (await DataStore.query(BillingAddress)).filter((billAdd) => billAdd.supplierID === supplierModel.id)
        const userModel = await DataStore.query(User,purchaseModel.userID);

        let invoiceHeader = '<div class="border" style="width: 816px; height: 1056px; padding: 35px;"> <div class="row"> <div class="col-sm-3 align-self-center text-center"> <h4 style="font-weight: 700">COMPANY_NAME</h4> </div> <div class="col-sm-3 align-self-center"> <b><p style="margin: 0em; font-size: 12px;">COMPANY_ADDRESS1</p></b> <b><p style="margin: 0em; font-size: 12px;">COMPANY_ADDRESS2</p></b> <b><p style="margin: 0em; font-size: 12px;">COMPANY_COUNTRY</p></b> </div> <div class="col-sm-2"> </div> <div class="col-sm-4" style="padding-left: 1.5em;"> <h5 style="font-weight: 600">PURCHASE ORDER</h5> <div class="d-inline-block" style="margin: 0em; font-size: 13px; width: 100px;">Purchase Order No.:</div> <div class="d-inline-block ms-3" style="font-size: 13px;">PURCHASE_NUMBER</div> <br> <div class="d-inline-block" style="margin: 0em; font-size: 13px; width: 100px;">Date:</div> <div class="d-inline-block ms-3" style="font-size: 13px;">INVOICE_DATE</div> <br> <div class="d-inline-block" style="margin: 0em; font-size: 13px; width: 100px;">Ship Date:</div> <div class="d-inline-block ms-3" style="font-size: 13px;">SHIP_DATE</div> </div> </div> <div class="row mb-5"> <div class="col-sm-5" style="margin: 0em; font-size: 13px;"> <b>Sold to:</b> <p>CUSTOMER_NAME <br> BILLTO_ADDRESS1 <br> BILLTO_ADDRESS2</p> </div> <div class="col-sm-7" style="margin: 0em; font-size: 13px;"> <b>Ship to:</b> <p>CUSTOMER_NAME <br> SHIPTO_ADDRESS1 <br> SHIPTO_ADDRESS2 </p> </div> </div> <div class="row"> <div class="col-sm-12"> <div class="d-inline-block" style="margin: 0em; font-size: 13px; width: 100px; font-weight: bold;">Business No.:</div> <div class="d-inline-block ms-3" style="font-size: 13px;">81473 1097 RT0001</div> </div> </div> <div class="row"> <table class="table table table-borderless"> <thead> <tr style="background-color: #cacaca;"> <th class="border border-dark text-center" style="font-size: 13px;" scope="col">Item No.</th> <th class="border border-dark text-center" style="font-size: 13px;" scope="col">Unit</th> <th class="border border-dark text-center" style="font-size: 13px;" scope="col">Quantity</th> <th class="border border-dark text-center" style="font-size: 13px;" scope="col">Description</th> <th class="border border-dark text-center" style="font-size: 13px;" scope="col">Tax</th> <th class="border border-dark text-center" style="font-size: 13px;" scope="col">Base Price</th> <th class="border border-dark text-center" style="font-size: 13px;" scope="col">Disc %</th> <th class="border border-dark text-center" style="font-size: 13px;" scope="col">Unit Price</th> <th class="border border-dark text-center" style="font-size: 13px;" scope="col">Amount</th> </tr> </thead> <tbody>';

        invoiceHeader = invoiceHeader.replaceAll("CUSTOMER_NAME","TSI Tropicals");
        invoiceHeader = invoiceHeader.replaceAll("COMPANY_NAME",supplierModel.name);

        let addresLine1 = ''
        let city = ''
        let state = ''
        let postal_code = ''
        let country = ''

        if(billingModel[0]){
            addresLine1 = billingModel[0].address_line1
            city = billingModel[0].city_district
            state = billingModel[0].state_province
            postal_code = billingModel[0].postal_code
            country = billingModel[0].country
        }

        invoiceHeader = invoiceHeader.replaceAll("COMPANY_ADDRESS1",addresLine1);
        invoiceHeader = invoiceHeader.replaceAll("COMPANY_ADDRESS2",`${city} , ${state} , ${postal_code}`);
        invoiceHeader = invoiceHeader.replaceAll("COMPANY_COUNTRY",country);

        invoiceHeader = invoiceHeader.replaceAll("PURCHASE_NUMBER",purchaseModel.po_number);
        invoiceHeader = invoiceHeader.replaceAll("INVOICE_DATE",purchaseModel.po_date);
        invoiceHeader = invoiceHeader.replaceAll("SHIP_DATE",purchaseModel.po_date);


        invoiceHeader = invoiceHeader.replaceAll("SHIPTO_ADDRESS1","123 Eastside Dr Unit # 3");
        invoiceHeader = invoiceHeader.replaceAll("SHIPTO_ADDRESS2","Etobicoke, Ontario M8Z 5S5");
        invoiceHeader = invoiceHeader.replaceAll("BILLTO_ADDRESS1","123 Eastside Dr Unit # 3");
        invoiceHeader = invoiceHeader.replaceAll("BILLTO_ADDRESS2","Etobicoke, Ontario M8Z 5S5");

        //Items
        let htmlItems = '';
        const purchaseItemModel = (await DataStore.query(PurchaseOrderItems)).filter((item) => item.purchaseorderID === purchaseModel.id)
        await Promise.all(purchaseItemModel.map(async (purchaseItem) => {
            const itemModel = await DataStore.query(Item,purchaseItem.itemID)

            let invoiceItems = '<tr> <td class="border-start border-end border-dark" style="font-size: 13px;">ITEM_SKU</td> <td class="border-end border-dark" style="font-size: 13px;">TYPE_MEASURE</td> <td class="border-end border-dark" style="font-size: 13px;">QUANTITY</td> <td class="border-end border-dark" style="font-size: 13px;">DESCRIPTION</td> <td class="border-end border-dark" style="font-size: 13px;"></td> <td class="border-end border-dark" style="font-size: 13px;">BASE_PRICE</td> <td class="border-end border-dark" style="font-size: 13px;"></td> <td class="border-end border-dark" style="font-size: 13px;">UNIT_PRICE</td> <td class="border-end border-dark" style="font-size: 13px;">AMOUNT</td> </tr>';

            invoiceItems = invoiceItems.replaceAll("ITEM_SKU",itemModel.sku);
            invoiceItems = invoiceItems.replaceAll("TYPE_MEASURE",purchaseItem.typeMeasure);
            invoiceItems = invoiceItems.replaceAll("QUANTITY",purchaseItem.quantityorder.toString());
            invoiceItems = invoiceItems.replaceAll("DESCRIPTION",itemModel.name);
            invoiceItems = invoiceItems.replaceAll("BASE_PRICE",purchaseItem.unit_price.toString());
            invoiceItems = invoiceItems.replaceAll("UNIT_PRICE",purchaseItem.unit_price.toString());
            invoiceItems = invoiceItems.replaceAll("AMOUNT",purchaseItem.pricetotal.toString());

            htmlItems = (htmlItems + invoiceItems);
        }))

        let invoiceFooter = '<tr> <td class="border-top border-start border-dark" style="font-size: 13px;" colspan="7"><b>Comment:</b><br></td> <td class="border-top border-start border-end border-dark" style="font-size: 13px; background-color: #cacaca; text-align: center; vertical-align: middle;">Total Amount</td> <td class="border-top border-start border-end border-dark" style="font-size: 13px;">TOTAL_AMOUNT</td> </tr> <tr> <td class="border-start border-bottom border-dark" style="font-size: 12px;" colspan="7">Sold By: SOLD_BY</td> <td class="border-start border-end border-bottom border-dark" style="font-size: 11px; background-color: #cacaca; font-weight: bold; text-align: center; vertical-align: middle;">Amount Owing</td> <td class="border-start border-end border-bottom border-dark" style="font-size: 12px;">TOTAL_AMOUNT</td> </tr> </tbody> </table> </div> </div>';

        invoiceFooter = invoiceFooter.replaceAll("SOLD_BY",userModel.name);
        invoiceFooter = invoiceFooter.replaceAll("TOTAL_AMOUNT",purchaseModel.totals.productstotal);

        let invoice_html = ((invoiceHeader + htmlItems) + invoiceFooter);

        createInvoiceLabel(invoice_html,purchaseModel.po_number)
    })
    

}