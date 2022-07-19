// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { PickedItems, SaleOrderItem, SaleOrder, ItemLocation, StorageLocation, PurchaseOrderItems, Warehouse, PurchaseOrder, Item, Supplier, BillingAddress, ShippingAddress, Customer, User, Company } = initSchema(schema);

export {
  PickedItems,
  SaleOrderItem,
  SaleOrder,
  ItemLocation,
  StorageLocation,
  PurchaseOrderItems,
  Warehouse,
  PurchaseOrder,
  Item,
  Supplier,
  BillingAddress,
  ShippingAddress,
  Customer,
  User,
  Company
};