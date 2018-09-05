let $orderTable = $('#order-table');
document.addEventListener('DOMContentLoaded', function () {
    // When btn pressed call function to display an old order by id
    $('.btnPressed').on('click', function () {
        // get the buttons id which matches the order id
        let btnPressed = this.id

        // call an ajax get.api to grab details of the order 
        $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type: 'GET',
                url: '/api/orders/summary/' + this.id
            })
            .then(function (data) {
                // assign the array a varible
                let $orderArray = data[0].map(function (order) {
                    console.log(order)
                    // create table row
                    let $tr = $('<tr>')
                    // create table data
                    let $td0 = $('<td>')
                        .text(order.prodName)
                    let $td1 = $('<td>')
                        .addClass('center-align')
                        .text(order.olQuantity)
                    let $td2 = $('<td>')
                        .addClass('center-align')
                        .text(order.prodPrice)
                    let $td3 = $('<td>')
                        .addClass('center-align')
                        .text(order.Total)
                    // chain the table data to a row for each object
                    $tr.append($td0, $td1, $td2, $td3)

                    return $tr
                })
                // empty table if full
                $orderTable.empty();
                // render data to screen
                $orderTable.append($orderArray);

            });
    });
});