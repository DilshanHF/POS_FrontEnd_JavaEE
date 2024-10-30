import {ItemModel  } from "../model/itemModel.js";



initialize()

function initialize(){
    $.ajax({
        url: "http://localhost:8080/api/v1/items/nextId",
        type: "GET",
        success: (res) => {
            $('#itemCode').val(res);
        },
        error: (res) => {
            console.error(res);
        }
    });

    setTimeout(() => {
        loadItemTable();
    },1000)
}

export function loadItemTable() {
    $('#item_table').empty();

    let itemArray = [];

    $.ajax({
        url: "http://localhost:8080/api/v1/items",
        type: "GET",
        success: (res) => {
            itemArray = res;

            setItemIds(itemArray);

            itemArray.map((item, index) => {

                var record = `<tr>
                    <td class="itm-id-val">${item.id}</td>
                    <td class="itm-desc-val">${item.description}</td>
                    <td class="itm-unitPrice-val">${item.unitPrice}</td>
                    <td class="itm-qty-val">${item.qty}</td>
                </tr>`;

                $('#item_table').append(record);
            });

            $("#item_count").text(itemArray.length);
        },
        error: (res) => {
            console.error(res);
        }
    });

}


//item save
$("#itemSave").on("click", function(){

    var id = $('#itemCode').val();
    var description = $('#description').val();
    var unitPrice = $('#unitPrice').val();
    var qty = $('#qty').val();

    console.log(id, description, unitPrice, qty);

    if (validate(id, 'Item Id') && validate(description, 'Description') &&
        validate(unitPrice, 'Unit Price') && validate(qty, 'Qty')) {

        let item = new ItemModel(id, description, unitPrice, qty);

        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {

                $.ajax({
                    url: "http://localhost:8083/item",
                    type: "POST",
                    data: JSON.stringify(item),
                    headers: { "Content-Type": "application/json" },
                    success : (response) => {
                        console.log(JSON.stringify(response));
                        Swal.fire({
                            title: JSON.stringify(response),
                            icon: "success"
                        });
                    },
                    error : (err)=> {
                        console.log(err);
                        Swal.fire({
                            title: JSON.stringify(err),
                            icon: "error"
                        });
                    }
                });


            } else if (result.isDenied) {
                Swal.fire('Changes are not Saved', '', 'info');
            }
        });

    }
});

$('#item_table').on('click','tr', function () {
    let id = $(this).find('.itm-id-val').text();
    let desc = $(this).find('.itm-desc-val').text();
    let unit_price = $(this).find('.itm-unitPrice-val').text();
    let qty = $(this).find('.itm-qty-val').text();

    $('#itemCode').val(id);
    $('#description').val(desc);
    $('#unitPrice').val(unit_price);
    $('#qty').val(qty);
});



function validate(value, field_name, pattern = null) {
    if (!value) {
        Swal.fire({
            icon: 'warning',
            title: `Please enter the ${field_name}!`
        });
        return false;
    }

    if (pattern && !pattern.test(value)) {
        Swal.fire({
            icon: 'warning',
            title: `Please enter a valid ${field_name}!`
        });
        return false;
    }

    return true;
}