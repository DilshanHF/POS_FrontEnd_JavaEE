import {CustomerModel} from "../model/customerModel.js";







//load the customer table
// const loadCustomerTable = function (){
//     $.ajax({
//         type: "GET",
//         url: "http://localhost:8080/customer",
//         success: function(data){
//             $('tbody').eq(0).empty();
//             data.forEach(item => {
//                 $('tbody').equals(0).append(
//                     `<tr>
//                     <th scope="row">${item.customerId}</th>
//                     <td>${item.name}</td>
//                     <td>${item.address}</td>
//                     <td>${item.contact}</td>
//                     </tr>`
//
//
//                 );
//             })
//         },
//         error: function(data){
//             Swal.fire('Something went wrong', '', 'info')
//         }
//
//     })
// }
// loadCustomerTable();



// customer save
$('#customer_save').on('click', () => {
    var id = $('#customerId').val();
    var name = $('#fullname').val();
    var address = $('#address').val();
    var contact = $('#contact').val();

    console.log(id, name, address, contact);

    if (validate(id, 'customer Id') && validate(name, 'full name') &&
        validate(address, 'address', addressPattern) && validate(contact, 'contact', mobilePattern)) {

        let customer = new CustomerModel(id, name, address, contact);

        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {

                $.ajax({
                    url: "http://localhost:8083/customer",
                    type: "POST",
                    data: JSON.stringify(customer),
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



//customer update
$('#customer_update').on('click', () => {

    var id = $('#customerId').val();
    var name = $('#fullname').val();
    var address = $('#address').val();
    var contact = $('#contact').val();

    console.log(id, name, address, contact);

    if (validate(id, 'customer Id') && validate(name, 'full name') &&
        validate(address, 'address', addressPattern) && validate(contact, 'contact', mobilePattern)) {


        let customer = new CustomerModel(id, name, address, contact);

        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            confirmButtonText: 'Update',
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {

                $.ajax({
                    url: "http://localhost:8083/customer",
                    type: "PUT",
                    data: JSON.stringify(customer),
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



})


$('#customer_delete').on('click', () => {
  var id = $('#customerId').val();

  console.log(id);

  if (validate(id, 'customer Id') ){
      const customer = {id: id}

      Swal.fire({
          title: 'Are you sure you want to delete?',
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!'

      }).then((result) => {
          if(result.isConfirmed){
              $.ajax({
                  type: 'DELETE',
                  url: 'http://localhost:8083/customer',
                  contentType: 'application/json',
                  data: JSON.stringify(customer),
                  success: function (res) {
                      Swal.fire('Deleted!', 'Your Customer has been deleted.', 'success');

                  },
                  error: function (err) {
                      Swal.fire('Customer not Deleted!', '', 'info')
                  }
              });
          }
      })

  }
})










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

// Regex patterns
const addressPattern = /^[a-zA-Z0-9\s,'-]*$/;
const mobilePattern = /^(?:\+94|94|0)?7\d{8}$/;
