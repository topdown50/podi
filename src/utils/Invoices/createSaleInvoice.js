import { DataStore } from '@aws-amplify/datastore';
import { SaleOrder } from '../../models';
import { Customer } from '../../models';
import { SaleOrderItem } from '../../models';
import { Item } from '../../models';
import { createInvoiceLabel } from './createInvoiceLabel';
import { ShippingAddress } from '../../models';
import { BillingAddress } from '../../models';
import { User } from '../../models';

export async function createSaleInvoice(salesForms){
    salesForms.map( async (saleForm) => {

        const saleModel = await DataStore.query(SaleOrder,saleForm.id);
        const customerModel = await DataStore.query(Customer,saleModel.customerID);
        const shippingModel = await DataStore.query(ShippingAddress,saleModel.shippingaddressID)
        const billingModel = await DataStore.query(BillingAddress,saleModel.billingaddressID)
        const userModel = await DataStore.query(User,saleModel.userID);
        let invoiceHeader = '<div class="border" style="width: 816px; height: 1056px; padding: 35px;"> <div class="row"> <div class="col-sm-2 align-self-center"> <img style="width: 120px;" src="https://s3.amazonaws.com/vo-random/ShareX/2022/06/TSI-Logo%20%281%29.png" alt="TSI-Logo" border="0"/> </div> <div class="col-sm-3 align-self-center"> <b><p style="margin: 0em; font-size: 12px;">123 Eastside Dr Unit # 3</p></b> <b><p style="margin: 0em; font-size: 12px;">Etobicoke, Ontario M8Z 5S5</p></b> <b><p style="margin: 0em; font-size: 12px;">Canada</p></b> </div> <div class="col-sm-3"> </div> <div class="col-sm-4" style="padding-left: 2.5em;"> <h3 style="font-weight: 600">INVOICE</h3> <div class="d-inline-block" style="margin: 0em; font-size: 13px; width: 100px;">Invoice No.:</div> <div class="d-inline-block ms-3" style="font-size: 13px;">INVOICE_NUMBER</div> <br/> <div class="d-inline-block" style="margin: 0em; font-size: 13px; width: 100px;">Date:</div> <div class="d-inline-block ms-3" style="font-size: 13px;">INVOICE_DATE</div> <br/> <div class="d-inline-block" style="margin: 0em; font-size: 13px; width: 100px;">Ship Date:</div> <div class="d-inline-block ms-3" style="font-size: 13px;">SHIP_DATE</div> <br/> <div class="d-inline-block" style="margin: 0em; font-size: 13px; width: 100px;">Re: Order No.</div> <div class="d-inline-block ms-3" style="font-size: 13px;">ORDER_NUMBER</div><br/> <div class="d-inline-block" style="margin: 0em; font-size: 13px; width: 100px;">Confirmation No:</div> <div class="d-inline-block ms-3" style="font-size: 13px;">CONFIRMATION_NUMBER</div></div> </div> <div class="row mb-5"> <div class="col-sm-5" style="margin: 0em; font-size: 13px;"> <b>Sold to:</b> <p>CUSTOMER_NAME <br/> BILLTO_ADDRESS1 <br/> BILLTO_ADDRESS2</p> </div> <div class="col-sm-7" style="margin: 0em; font-size: 13px;"> <b>Ship to:</b> <p>CUSTOMER_NAME <br/> SHIPTO_ADDRESS1 <br/> SHIPTO_ADDRESS2 </p> </div> </div> <div class="row"> <div class="col-sm-12"> <div class="d-inline-block" style="margin: 0em; font-size: 13px; width: 100px; font-weight: bold;">Business No.:</div> <div class="d-inline-block ms-3" style="font-size: 13px;">81473 1097 RT0001</div> </div> </div> <div class="row"> <table class="table table table-borderless"> <thead> <tr style="background-color: #cacaca;"> <th class="border border-dark text-center" style="font-size: 13px;" scope="col">Item No.</th> <th class="border border-dark text-center" style="font-size: 13px;" scope="col">Unit</th> <th class="border border-dark text-center" style="font-size: 13px;" scope="col">Quantity</th> <th class="border border-dark text-center" style="font-size: 13px;" scope="col">Description</th> <th class="border border-dark text-center" style="font-size: 13px;" scope="col">Tax</th> <th class="border border-dark text-center" style="font-size: 13px;" scope="col">Base Price</th> <th class="border border-dark text-center" style="font-size: 13px;" scope="col">Disc %</th> <th class="border border-dark text-center" style="font-size: 13px;" scope="col">Unit Price</th> <th class="border border-dark text-center" style="font-size: 13px;" scope="col">Amount</th> </tr> </thead> <tbody>';

        invoiceHeader = invoiceHeader.replaceAll('CUSTOMER_NAME',customerModel.company_name)
        invoiceHeader = invoiceHeader.replaceAll('INVOICE_NUMBER',saleModel.invoice_number)
        invoiceHeader = invoiceHeader.replaceAll('ORDER_NUMBER',saleModel.purchase_number)
        invoiceHeader = invoiceHeader.replaceAll('INVOICE_DATE',saleModel.invoice_date)
        invoiceHeader = invoiceHeader.replaceAll('SHIP_DATE',saleModel.shipment_info.ship_date.split(',')[0])

        //Shipp and Bill Address
        invoiceHeader = invoiceHeader.replaceAll("SHIPTO_ADDRESS1",shippingModel.address_line1);
        invoiceHeader = invoiceHeader.replaceAll("SHIPTO_ADDRESS2",`${shippingModel.city_district} , ${shippingModel.state_province} , ${shippingModel.postal_code}`);
        invoiceHeader = invoiceHeader.replaceAll("BILLTO_ADDRESS1",billingModel.address_line1);
        invoiceHeader = invoiceHeader.replaceAll("BILLTO_ADDRESS2",`${billingModel.city_district} , ${billingModel.state_province} , ${billingModel.postal_code}`);

        invoiceHeader = invoiceHeader.replaceAll("CONFIRMATION_NUMBER",saleModel.confirmation_number);


        //Items
        let htmlItems = ''
        const saleItemModel = (await DataStore.query(SaleOrderItem)).filter((item) => item.saleorderID === saleModel.id)
        await Promise.all(saleItemModel.map(async (saleItem) => {
            const itemModel = await DataStore.query(Item,saleItem.itemID)

            let invoiceItems = '<tr> <td class="border-start border-end border-dark" style="font-size: 13px;">ITEM_SKU</td> <td class="border-end border-dark" style="font-size: 13px;">TYPE_MEASURE</td> <td class="border-end border-dark" style="font-size: 13px;">QUANTITY</td> <td class="border-end border-dark" style="font-size: 13px;">DESCRIPTION</td> <td class="border-end border-dark" style="font-size: 13px;"></td> <td class="border-end border-dark" style="font-size: 13px;">BASE_PRICE</td> <td class="border-end border-dark" style="font-size: 13px;"></td> <td class="border-end border-dark" style="font-size: 13px;">UNIT_PRICE</td> <td class="border-end border-dark" style="font-size: 13px;">AMOUNT</td> </tr>';

            invoiceItems = invoiceItems.replaceAll('ITEM_SKU',itemModel.sku)
            invoiceItems = invoiceItems.replaceAll('TYPE_MEASURE',saleItem.typeMeasure)
            invoiceItems = invoiceItems.replaceAll('QUANTITY',saleItem.sell_count)
            invoiceItems = invoiceItems.replaceAll("DESCRIPTION",itemModel.name)
            invoiceItems = invoiceItems.replaceAll("BASE_PRICE",saleItem.unit_price.toString())
            invoiceItems = invoiceItems.replaceAll("UNIT_PRICE",saleItem.unit_price.toString())
            invoiceItems = invoiceItems.replaceAll("AMOUNT",saleItem.total_price.toString())
            htmlItems = (htmlItems + invoiceItems);
        }))

        let invoiceFooter = '<tr> <td class="border-top border-start border-dark" style="font-size: 13px;" colspan="7"><b>Comment:</b><br/></td> <td class="border-top border-start border-end border-dark" style="font-size: 13px; background-color: #cacaca; text-align: center; vertical-align: middle;">Total Amount</td> <td class="border-top border-start border-end border-dark" style="font-size: 13px;">TOTAL_AMOUNT</td> </tr> <tr> <td class="border-start border-bottom border-dark" style="font-size: 12px;" colspan="7">Sold By: SOLD_BY</td> <td class="border-start border-end border-bottom border-dark" style="font-size: 11px; background-color: #cacaca; font-weight: bold; text-align: center; vertical-align: middle;">Amount Owing</td> <td class="border-start border-end border-bottom border-dark" style="font-size: 12px;">TOTAL_AMOUNT</td> </tr> </tbody> </table> </div> </div>';

        //Sold By
        invoiceFooter = invoiceFooter.replaceAll("SOLD_BY",userModel.name);

        invoiceFooter = invoiceFooter.replaceAll("TOTAL_AMOUNT",saleModel.items_total);
        let invoice_html = invoiceHeader + htmlItems + invoiceFooter;
        createInvoiceLabel(invoice_html,saleModel.invoice_number)
    })
    
}