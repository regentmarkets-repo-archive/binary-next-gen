/*globals __StoreData */

// This file describe where stores read data from and where stores write data to.

import ItemsStore from "items-store/ItemsStore";

// load embedded initial store data from prerendering if available
var initialData = typeof __StoreData === "object" ? __StoreData : {};

// take the store descriptions as base
import desc from "./mainStoresDescriptions";


// the stores
module.exports = {
	Router: new ItemsStore(desc.Router),

};
