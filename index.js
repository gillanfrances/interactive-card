$('#fullname').on('input', function() {
    let name = $(this).val();
        $('#display-name').text(name === "" ? "Jane Appleseed" : name);
});

$('#cardnumber').on('input', function() {
        let val = $(this).val().replace(/\s+/g, '').replace(/[^0-9]/g, '');
        let formatted = val.match(/.{1,4}/g)?.join(' ') || "";
        
        $(this).val(formatted);
        $('#display-number').text(formatted === "" ? "0000 0000 0000 0000" : formatted);
});

$('#expirymonth, #expiryyear').on('input', function() {
        let mm = $('#expirymonth').val() || "00";
        let yy = $('#expiryyear').val() || "00";
        
        $('#display-expiry').text(mm + "/" + yy);
});

$('#cvc').on('input', function() {
        let cvc = $(this).val();
        $('#display-cvc').text(cvc === "" ? "000" : cvc);
});

$('#confirm-btn').on('click', function() {
        $('.card-details').fadeOut(300, function() {
            $('.success').fadeIn();
        });
});

