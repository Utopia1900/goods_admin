var currencyValidator = {
  format: function (number) {
    return (Math.trunc(number * 1000000000000) / 1000000000000).toFixed(2)
  },
  parse: function (newString, oldNumber) {
    var CleanParse = function (value) {
      return { value: value }
    }
    var CurrencyWarning = function (warning, value) {
      return {
        warning: warning,
        value: value,
        attempt: newString
      }
    }
    var NotAValidDollarAmountWarning = function (value) {
      return new CurrencyWarning(newString + ' is not a valid dollar amount', value)
    }
    var AutomaticConversionWarning = function (value) {
      return new CurrencyWarning(newString + ' was automatically converted to ' + value, value)
    }

    var newNumber = Number(newString)
    var indexOfDot = newString.indexOf('.')
    var indexOfE = newString.indexOf('e')

    if (isNaN(newNumber)) {
      if (
        indexOfDot === -1 &&
        indexOfE > 0 &&
        indexOfE === newString.length - 1 &&
        Number(newString.slice(0, indexOfE)) !== 0
      ) {
        return new CleanParse(oldNumber)
      } else {
        return new NotAValidDollarAmountWarning(oldNumber)
      }
    }

    var newCurrencyString = currencyValidator.format(newNumber)
    var newCurrencyNumber = Number(newCurrencyString)
    // console.log(newString + '/////' + newCurrencyString + '/////' + newCurrencyNumber + '////' + newNumber);

    if (newCurrencyNumber === newNumber) {
      if (indexOfE !== -1 && indexOfE === newString.length - 2) {
        return new AutomaticConversionWarning(newNumber)
      } else {
        return new CleanParse(newNumber)
      }
    } else {
      return new NotAValidDollarAmountWarning(
        newNumber > newCurrencyNumber
          ? newCurrencyNumber
          : oldNumber
      )
    }
  }
}

function validCurrency (id) {
  var current = $('#' + id).val();
  var valid = true;
  if (current.length == 0) return ;
  current = current.slice(0,
    current.indexOf('.') === -1
      ? current.length
      : current.indexOf('.') + 3
  );
  if (Number(current) >= 20000) {
    current = '0';
    valid = false;
  }
  if (valid) {
    var tmp = currencyValidator.parse(current);
    /*console.log('value: ' + current);
    console.log('format: ' + tmp.warning + '/' + tmp.value);*/
    if (tmp.warning) {
      if (!tmp.value) tmp.value = '0';
      current = tmp.value;
    }
  }
  if (current.indexOf('.') !== -1) {
    current = parseInt(current) + current.substring(current.indexOf('.'), current.length);
  } else {
    current = Number(current);
  }
  $('#' + id).val(current);
}
