interface ICutItem {
    measurement: number;
    amount: number;
 }

 interface ICutItemWithProduct {
    id?: number
    measurement: number;
    amount: number;
    product: Product
 }