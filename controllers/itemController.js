import {ItemModel  } from "../model/itemModel.js";






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