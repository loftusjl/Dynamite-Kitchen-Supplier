document.addEventListener('DOMContentLoaded', function () {

    $('.btnPressed').on('click', function () {
        let btnPressed = this.id

        console.log(btnPressed)


        $.ajax({
                headers: {
                    'Content-Type': 'application/json'
                },
                type: 'GET',
                url: '/api/orders/summary/' + this.id
            })
            .then(function (data) {
                console.log(data[0])
                // href='#modalOrderHistory'
                // modal-trigger
                //window.location.replace('/api/orders/summary/' + this.id);
            });


    });
});