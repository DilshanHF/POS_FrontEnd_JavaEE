import {OrderModel}  from "../model/orderModel.js";

let cart=[];

const order_id = $('#order_Id');
const customer_id = $('#custId');
const date = $('#orderDate');
const item_Id = $('#item_Id');
const order_qty = $('#order_quantity');
const customer_name = $('#custName');
const qty_on_hand = $('#qtyOnHand');
const description = $('#desc');
const unit_price = $('#unit_price');
const net_total = $('.net_total span:nth-child(2)');
const sub_total = $('.sub_total span:nth-child(2)');
const discount = $('#discount');
const cash = $('#cash');
const balance = $('#balance');

const cart_btn = $('.cart_btn');
const order_btn = $('.order_btn');

initialize();


function initialize() {
    setOrderId();
}

function setOrderId() {
    $.ajax({
        url: "http://localhost:8080/api/v1/orders/nextId",
        type: "GET",
        success: (res) => {
            $('#order_Id').val(res);
        },
        error: (res) => {
            console.error(res);
        }
    });
}

//set date
const formattedDate = new Date().toISOString().substr(0, 10);
date.val(formattedDate);

