import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type PickedItemsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SaleOrderItemMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SaleOrderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ItemLocationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type StorageLocationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PurchaseOrderItemsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type WarehouseMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PurchaseOrderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ItemMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SupplierMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BillingAddressMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ShippingAddressMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CustomerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CompanyMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class PickedItems {
  readonly id: string;
  readonly lot_number?: number | null;
  readonly typeMeasure?: string | null;
  readonly pick_count?: number | null;
  readonly unity?: string | null;
  readonly take_pieces?: boolean | null;
  readonly companyID: string;
  readonly itemID: string;
  readonly storagelocationID: string;
  readonly saleorderID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<PickedItems, PickedItemsMetaData>);
  static copyOf(source: PickedItems, mutator: (draft: MutableModel<PickedItems, PickedItemsMetaData>) => MutableModel<PickedItems, PickedItemsMetaData> | void): PickedItems;
}

export declare class SaleOrderItem {
  readonly id: string;
  readonly ooa?: boolean | null;
  readonly typeMeasure?: string | null;
  readonly sell_count?: number | null;
  readonly unit_price?: number | null;
  readonly total_price?: number | null;
  readonly product_info?: string | null;
  readonly unity?: string | null;
  readonly itemID: string;
  readonly companyID: string;
  readonly saleorderID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<SaleOrderItem, SaleOrderItemMetaData>);
  static copyOf(source: SaleOrderItem, mutator: (draft: MutableModel<SaleOrderItem, SaleOrderItemMetaData>) => MutableModel<SaleOrderItem, SaleOrderItemMetaData> | void): SaleOrderItem;
}

export declare class SaleOrder {
  readonly id: string;
  readonly invoice_date?: string | null;
  readonly invoice_number?: string | null;
  readonly purchase_number?: string | null;
  readonly confirmation_number?: string | null;
  readonly status?: string | null;
  readonly sale_comments?: string | null;
  readonly items_total?: number | null;
  readonly delivery_type?: string | null;
  readonly charge?: number | null;
  readonly total?: number | null;
  readonly flag_complete?: boolean | null;
  readonly radio_picking_to?: string | null;
  readonly radio_ready_to?: string | null;
  readonly companyID: string;
  readonly customerID: string;
  readonly shippingaddressID?: string | null;
  readonly billingaddressID?: string | null;
  readonly SO_SOitem?: (SaleOrderItem | null)[] | null;
  readonly shipment_info?: string | null;
  readonly Sale_PickedItems?: (PickedItems | null)[] | null;
  readonly userID?: string | null;
  readonly bill_id_zb?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<SaleOrder, SaleOrderMetaData>);
  static copyOf(source: SaleOrder, mutator: (draft: MutableModel<SaleOrder, SaleOrderMetaData>) => MutableModel<SaleOrder, SaleOrderMetaData> | void): SaleOrder;
}

export declare class ItemLocation {
  readonly id: string;
  readonly lot_number?: number | null;
  readonly cases?: number | null;
  readonly cases_2?: number | null;
  readonly units?: number | null;
  readonly pieces_weight?: number | null;
  readonly companyID: string;
  readonly itemID: string;
  readonly storagelocationID: string;
  readonly default?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ItemLocation, ItemLocationMetaData>);
  static copyOf(source: ItemLocation, mutator: (draft: MutableModel<ItemLocation, ItemLocationMetaData>) => MutableModel<ItemLocation, ItemLocationMetaData> | void): ItemLocation;
}

export declare class StorageLocation {
  readonly id: string;
  readonly storage_type?: string | null;
  readonly storage_name?: string | null;
  readonly rack?: number | null;
  readonly row?: number | null;
  readonly position?: number | null;
  readonly warehouseID: string;
  readonly storage_itemLocation?: (ItemLocation | null)[] | null;
  readonly companyID: string;
  readonly Storage_POItems?: (PurchaseOrderItems | null)[] | null;
  readonly Storage_PickedItems?: (PickedItems | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<StorageLocation, StorageLocationMetaData>);
  static copyOf(source: StorageLocation, mutator: (draft: MutableModel<StorageLocation, StorageLocationMetaData>) => MutableModel<StorageLocation, StorageLocationMetaData> | void): StorageLocation;
}

export declare class PurchaseOrderItems {
  readonly id: string;
  readonly lot_number?: number | null;
  readonly typeMeasure?: string | null;
  readonly quantityorder?: number | null;
  readonly quantityreceipt?: number | null;
  readonly unit_price?: number | null;
  readonly grossWeight?: number | null;
  readonly quantityPallets?: number | null;
  readonly pricetotal?: number | null;
  readonly landedCost?: number | null;
  readonly purchaseorderID: string;
  readonly itemID: string;
  readonly companyID: string;
  readonly storagelocationID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<PurchaseOrderItems, PurchaseOrderItemsMetaData>);
  static copyOf(source: PurchaseOrderItems, mutator: (draft: MutableModel<PurchaseOrderItems, PurchaseOrderItemsMetaData>) => MutableModel<PurchaseOrderItems, PurchaseOrderItemsMetaData> | void): PurchaseOrderItems;
}

export declare class Warehouse {
  readonly id: string;
  readonly warehouse_name?: string | null;
  readonly phone?: string | null;
  readonly address?: string | null;
  readonly companyID: string;
  readonly warehouse_storageLocation?: (StorageLocation | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Warehouse, WarehouseMetaData>);
  static copyOf(source: Warehouse, mutator: (draft: MutableModel<Warehouse, WarehouseMetaData>) => MutableModel<Warehouse, WarehouseMetaData> | void): Warehouse;
}

export declare class PurchaseOrder {
  readonly id: string;
  readonly po_date?: string | null;
  readonly po_number?: string | null;
  readonly transport_type?: string | null;
  readonly bol_invoice_number?: string | null;
  readonly status?: string | null;
  readonly exchange_rate?: number | null;
  readonly exchange_rate_date?: string | null;
  readonly order_type?: string | null;
  readonly flag_complete?: boolean | null;
  readonly PO_POitems?: (PurchaseOrderItems | null)[] | null;
  readonly companyID: string;
  readonly supplierID: string;
  readonly PurchaseOrderRates?: string | null;
  readonly PurchaseOrderCharges?: string | null;
  readonly ChangeCurrency?: string | null;
  readonly totals?: string | null;
  readonly Inspection?: string | null;
  readonly userID?: string | null;
  readonly bill_id_zb?: string | null;
  readonly bill_info?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<PurchaseOrder, PurchaseOrderMetaData>);
  static copyOf(source: PurchaseOrder, mutator: (draft: MutableModel<PurchaseOrder, PurchaseOrderMetaData>) => MutableModel<PurchaseOrder, PurchaseOrderMetaData> | void): PurchaseOrder;
}

export declare class Item {
  readonly id: string;
  readonly name?: string | null;
  readonly sku?: string | null;
  readonly supplier_code?: string | null;
  readonly description?: string | null;
  readonly cost?: number | null;
  readonly type?: string | null;
  readonly plu?: string | null;
  readonly zb_item_id?: string | null;
  readonly units_per_case?: number | null;
  readonly cases_per_pallet?: number | null;
  readonly item_weight?: number | null;
  readonly unity?: string | null;
  readonly companyID: string;
  readonly supplierID: string;
  readonly item_POitems?: (PurchaseOrderItems | null)[] | null;
  readonly item_itemLocation?: (ItemLocation | null)[] | null;
  readonly item_SOitem?: (SaleOrderItem | null)[] | null;
  readonly zb_convert_weight?: boolean | null;
  readonly Item_PickedItems?: (PickedItems | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Item, ItemMetaData>);
  static copyOf(source: Item, mutator: (draft: MutableModel<Item, ItemMetaData>) => MutableModel<Item, ItemMetaData> | void): Item;
}

export declare class Supplier {
  readonly id: string;
  readonly name?: string | null;
  readonly short_name?: string | null;
  readonly phone?: string | null;
  readonly purchasing_email?: string | null;
  readonly zb_contact_id?: string | null;
  readonly Supplier_BillingA?: (BillingAddress | null)[] | null;
  readonly Supplier_ShippingA?: (ShippingAddress | null)[] | null;
  readonly companyID: string;
  readonly supplier_PO?: (PurchaseOrder | null)[] | null;
  readonly supplier_item?: (Item | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Supplier, SupplierMetaData>);
  static copyOf(source: Supplier, mutator: (draft: MutableModel<Supplier, SupplierMetaData>) => MutableModel<Supplier, SupplierMetaData> | void): Supplier;
}

export declare class BillingAddress {
  readonly id: string;
  readonly address_line1?: string | null;
  readonly address_line2?: string | null;
  readonly city_district?: string | null;
  readonly state_province?: string | null;
  readonly postal_code?: string | null;
  readonly country?: string | null;
  readonly customerID?: string | null;
  readonly supplierID?: string | null;
  readonly BillingA_SaleOrder?: (SaleOrder | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<BillingAddress, BillingAddressMetaData>);
  static copyOf(source: BillingAddress, mutator: (draft: MutableModel<BillingAddress, BillingAddressMetaData>) => MutableModel<BillingAddress, BillingAddressMetaData> | void): BillingAddress;
}

export declare class ShippingAddress {
  readonly id: string;
  readonly address_line1?: string | null;
  readonly address_line2?: string | null;
  readonly city_district?: string | null;
  readonly state_province?: string | null;
  readonly postal_code?: string | null;
  readonly country?: string | null;
  readonly customerID?: string | null;
  readonly supplierID?: string | null;
  readonly shippingA_saleorder?: (SaleOrder | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ShippingAddress, ShippingAddressMetaData>);
  static copyOf(source: ShippingAddress, mutator: (draft: MutableModel<ShippingAddress, ShippingAddressMetaData>) => MutableModel<ShippingAddress, ShippingAddressMetaData> | void): ShippingAddress;
}

export declare class Customer {
  readonly id: string;
  readonly company_name?: string | null;
  readonly name?: string | null;
  readonly phone?: string | null;
  readonly email?: string | null;
  readonly Customer_BillingA?: (BillingAddress | null)[] | null;
  readonly Customer_ShippingA?: (ShippingAddress | null)[] | null;
  readonly companyID: string;
  readonly customer_saleOrder?: (SaleOrder | null)[] | null;
  readonly zb_contact_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Customer, CustomerMetaData>);
  static copyOf(source: Customer, mutator: (draft: MutableModel<Customer, CustomerMetaData>) => MutableModel<Customer, CustomerMetaData> | void): Customer;
}

export declare class User {
  readonly id: string;
  readonly name?: string | null;
  readonly last_name?: string | null;
  readonly phone?: string | null;
  readonly status?: string | null;
  readonly companyID: string;
  readonly email?: string | null;
  readonly User_SaleOrder?: (SaleOrder | null)[] | null;
  readonly User_PurchaseOrder?: (PurchaseOrder | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Company {
  readonly id: string;
  readonly company_name?: string | null;
  readonly company_code?: string | null;
  readonly company_address?: string | null;
  readonly company_email?: string | null;
  readonly company_phone?: string | null;
  readonly purchasing_count?: number | null;
  readonly invoice_count?: number | null;
  readonly scrap_count?: number | null;
  readonly serial_reference?: number | null;
  readonly extension_digit?: number | null;
  readonly zb_organization_id?: string | null;
  readonly zb_refresh_token?: string | null;
  readonly zb_client_id?: string | null;
  readonly zb_client_secret?: string | null;
  readonly Company_User?: (User | null)[] | null;
  readonly Company_Customer?: (Customer | null)[] | null;
  readonly company_supplier?: (Supplier | null)[] | null;
  readonly company_item?: (Item | null)[] | null;
  readonly company_PO?: (PurchaseOrder | null)[] | null;
  readonly company_warehouse?: (Warehouse | null)[] | null;
  readonly company_itemLocation?: (ItemLocation | null)[] | null;
  readonly company_saleOrder?: (SaleOrder | null)[] | null;
  readonly company_SOitem?: (SaleOrderItem | null)[] | null;
  readonly Company_StorageLoc?: (StorageLocation | null)[] | null;
  readonly Company_POItems?: (PurchaseOrderItems | null)[] | null;
  readonly Company_PickedItems?: (PickedItems | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Company, CompanyMetaData>);
  static copyOf(source: Company, mutator: (draft: MutableModel<Company, CompanyMetaData>) => MutableModel<Company, CompanyMetaData> | void): Company;
}