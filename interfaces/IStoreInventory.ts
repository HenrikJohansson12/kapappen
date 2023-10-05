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