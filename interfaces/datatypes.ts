interface IStoreInventory {
    id: number;
    storeId: number;
    productId: number;
    length: number;
  }

  interface IStore {
    id?: number;
    name: string;
    latitud: number;
    longitud: number;
  }

  interface IStoreLengths {
    id?: number;
    name: string;
    latitud: number;
    longitud: number;
    length:number;
  }

  interface IBuyList {
    productId: number
    measurement: number;
    amount: number;
 }
 
 interface ICutItem {
    id?:number
    measurement: number;
    amount: number;
 }

 interface ICutItemWithProduct {
    id?: number
    measurement: number;
    amount: number;
    product: IProduct
 }

 interface IProduct {
    id: number;
    type: string;
    thickness: number;
    width: number;
  }