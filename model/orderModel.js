export class OrderModel{
    constructor(orderId,date, discount, subTotal, customerId){
        this.orderId = orderId;
        this.date = date;
        this.discount = discount;
        this.subTotal = subTotal;
        this.customerId = customerId;
    }
}