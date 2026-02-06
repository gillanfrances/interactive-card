function showError(inputSelector, errorSelector, message) {
        $(inputSelector).addClass('error');
        $(errorSelector).text(message).show();
    }

    function clearErrors() {
        $('input').removeClass('error');
        $('.error-msg').hide();
    }

    $('#fullname').on('input', function() { $('#display-name').text($(this).val() || "Jane Appleseed"); });
    
    $('#cardnumber').on('input', function() {
        let val = $(this).val().replace(/\s+/g, '').replace(/[^0-9]/g, '');
        if (val.length > 16) val = val.substring(0, 16);
        let formatted = val.match(/.{1,4}/g)?.join(' ') || "";
        $(this).val(formatted);
        $('#display-number').text(formatted || "0000 0000 0000 0000");
    });

    $('#expirymonth, #expiryyear, #cvc').on('input', function() {
    // This regex replaces any character that is NOT 0-9 with an empty string
    this.value = this.value.replace(/[^0-9]/g, '');
    
    if (this.id === 'cvc') {
        $('#display-cvc').text(this.value || "000");
    }
});

    $('#confirm-btn').on('click', function(e) {
        e.preventDefault();
        clearErrors();
        let isValid = true;

        if ($('#fullname').val().trim() === "") {
            showError('#fullname', '#err-name', "Can't be blank");
            isValid = false;
        }

        let cardVal = $('#cardnumber').val().replace(/\s/g, '');
        if (cardVal === "") {
            showError('#cardnumber', '#err-number', "Can't be blank");
            isValid = false;
        } else if (cardVal.length < 16 || /[^0-9]/.test(cardVal)) {
            showError('#cardnumber', '#err-number', "Wrong format, must be 16 numbers");
            isValid = false;
        }

        let monthStr = $('#expirymonth').val();
        let monthVal = parseInt(monthStr);
        if (monthStr === "") {
            showError('#expirymonth', '#err-expiry', "Can't be blank");
            isValid = false;
        } else if (monthVal < 1 || monthVal > 12) {
            showError('#expirymonth', '#err-expiry', "Invalid month (01-12)");
            isValid = false;
        }

        let yearStr = $('#expiryyear').val();
        let yearVal = parseInt(yearStr);
        if (yearStr === "") {
            showError('#expiryyear', '#err-expiry', "Can't be blank"); // Note: usually shares error space with month
            isValid = false;
        } else if (yearVal < 26) {
            showError('#expiryyear', '#err-expiry', "Expiry must be 2026 or later");
            isValid = false;
        }

        let cvcStr = $('#cvc').val();
        if (cvcStr === "") {
            showError('#cvc', '#err-cvc', "Can't be blank");
            isValid = false;
        } else if (cvcStr.length < 3) {
            showError('#cvc', '#err-cvc', "Wrong format");
            isValid = false;
        }

        if (isValid) {
            $('.card-details').fadeOut(300, function() {
                $('.success').fadeIn();
            });
        }
    });

$('.success button').on('click', function() {
    $('input').val('');
    
    $('#display-number').text("0000 0000 0000 0000");
    $('#display-name').text("Jane Appleseed");
    $('#display-expiry').text("00/00");
    $('#display-cvc').text("000");

    $('input').removeClass('error');
    $('.error-msg').hide();

    $('.success').fadeOut(300, function() {
        $('.card-details').fadeIn();
    });
});
