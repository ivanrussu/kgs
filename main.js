$(document).ready(function () {
  const kgs = $('#kgs');
  const rub = $('#rub');
  const usd = $('#usd');

  const rubToKgs = 1.33;
  const kgsToRub = 1 / rubToKgs;

  const rubToUsd = 60;
  const usdToRub = 1 / rubToUsd;

  const usdToKgs = 80.18;
  const kgsToUsd = 1 / usdToKgs;

  (function ($) {
    $.fn.inputFilter = function (callback, errMsg) {
      return this.on("input keydown keyup mousedown mouseup select contextmenu drop focusout", function (e) {
        if (callback(this.value)) {
          // Accepted value
          if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
            $(this).removeClass("input-error");
            this.setCustomValidity("");
          }
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          // Rejected value - restore the previous one
          $(this).addClass("input-error");
          this.setCustomValidity(errMsg);
          this.reportValidity();
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          // Rejected value - nothing to restore
          this.value = "";
        }
      });
    };
  }(jQuery));


  [kgs, rub, usd].forEach((input) => {
    input.inputFilter(function (value) {
      return /^-?\d*[.,]?\d*$/.test(value);
    }, "Must be a floating (real) number");
  });

  kgs.on('input', (e) => {
    rub.val(kgs.val() * kgsToRub);
    usd.val(kgs.val() * kgsToUsd);
  });

  rub.on('input', (e) => {
    kgs.val(rub.val() * rubToKgs);
    usd.val(rub.val() * usdToRub);
  });

  usd.on('input', (e) => {
    kgs.val(usd.val() * usdToKgs);
    rub.val(usd.val() * rubToUsd);
  });

});