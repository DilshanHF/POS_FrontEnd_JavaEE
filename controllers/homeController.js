// import {customer_db,item_db,order_db} from "../db/db.js";

$('#home').css({display:'block'});
$('#customer_section').css({display:'none'});
$('#item_section').css({display:'none'});
$('#order_section').css({display:'none'});
$('#order_details_section').css({display:'none'});

//home view
$("#home_nav").on('click',()=>{
    $('#home').css({display:'block'});
    $('#customer_section').css({display:'none'});
    $('#item_section').css({display:'none'});
    $('#order_section').css({display:'none'});
    $('#order_details_section').css({display:'none'});

    $('#home_nav').addClass('active-page');
    $('#customer_nav').removeClass('active-page');
    $('#item_nav').removeClass('active-page');
    $('#orders_nav').removeClass('active-page');
    $('#order_details_nav').removeClass('active-page');
});

$("#customer_nav ,#customer_link").on('click',()=>{
    $('#home').css({display:'none'});
    $('#customer_section').css({display:'block'});
    $('#item_section').css({display:'none'});
    $('#order_section').css({display:'none'});
    $('#order_details_section').css({display:'none'});

    $('#home_nav').removeClass('active-page');
    $('#customer_nav').addClass('active-page');
    $('#item_nav').removeClass('active-page');
    $('#orders_nav').removeClass('active-page');
    $('#order_details_nav').removeClass('active-page');
});

$("#item_nav,#item_link").on('click',()=>{
    $('#home').css({display:'none'});
    $('#customer_section').css({display:'none'});
    $('#item_section').css({display:'block'});
    $('#order_section').css({display:'none'});
    $('#order_details_section').css({display:'none'});

    $('#home_nav').removeClass('active-page');
    $('#customer_nav').removeClass('active-page');
    $('#item_nav').addClass('active-page');
    $('#orders_nav').removeClass('active-page');
    $('#order_details_nav').removeClass('active-page');
});

$("#orders_nav , #order_link").on('click',()=>{
    $('#home').css({display:'none'});
    $('#customer_section').css({display:'none'});
    $('#item_section').css({display:'none'});
    $('#order_section').css({display:'block'});
    $('#order_details_section').css({display:'none'});

    $('#home_nav').removeClass('active-page');
    $('#customer_nav').removeClass('active-page');
    $('#item_nav').removeClass('active-page');
    $('#orders_nav').addClass('active-page');
    $('#order_details_nav').removeClass('active-page');
});

$("#order_details_nav").on('click',()=>{
    $('#home').css({display:'none'});
    $('#customer_section').css({display:'none'});
    $('#item_section').css({display:'none'});
    $('#order_section').css({display:'none'});
    $('#order_details_section').css({display:'block'});

    $('#home_nav').removeClass('active-page');
    $('#customer_nav').removeClass('active-page');
    $('#item_nav').removeClass('active-page');
    $('#orders_nav').removeClass('active-page');
    $('#order_details_nav').addClass('active-page');
});


const count = $('.count');
export function setCounts(){
    count.eq(0).text(customer_db.length);
    count.eq(1).text(item_db.length);
    count.eq(2).text(order_db.length);
}

setCounts();