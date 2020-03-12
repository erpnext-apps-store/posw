import Dexie from 'dexie';
import relationships from 'dexie-relationships';

export const tables = {
  'POS Profile': 'pos_profiles',
  Customer: 'customers',
  'Item Group': 'item_groups',
  Item: 'items',
  'Item Barcode': 'item_barcodes',
  'UOM Conversion Detail': 'uom_conversion_details',
  'Item Price': 'item_prices',
  Bin: 'bins',
};

const db = new Dexie('posw', { addons: [relationships] });
db.version(1).stores({
  system: 'id',
  pos_profiles: 'name',
  customers:
    'name, customer_name, customer_group, territory, mobile_no, primary_address, modified',
  item_groups: 'name, lft, rgt, modified',
  items: 'name, item_name, description, item_group, customer_code, modified',
  item_barcodes: 'name, barcode, parent -> items.name, modified',
  uom_conversion_details:
    'name, uom, conversion_factor, parent -> items.name, modified',
  item_prices:
    'name, item_code, uom, min_qty, price_list, customer, valid_from, valid_upto',
  bins: 'name, item_code, warehouse, actual_qty',
});

export default db;
