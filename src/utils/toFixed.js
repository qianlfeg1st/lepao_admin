/* eslint-disable */
export default () => {

  Number.prototype.toFixed = function (length) {

    let backResult
    if (length <= 0) {
      backResult = this
    }
    if (typeof length !== 'number') {
      backResult = 'NAN'
    }
    let num = this + ''
    let di = num.indexOf('.')
    if (di == -1) {
      if (length == 0) {
        backResult = num
      } else {
        backResult = num + '.' + '0'.repeat(length)
      }
    } else {
      if (length == 0) {
        backResult = num.substring(0, di)
      } else {
        let dec = num.substring(di + 1, num.length)
        if (dec.length > length) {
          let result = ''
          let p = +dec[length]
          let int = num.substring(0, di) * Math.pow(10, length)
          let firstDec = +dec.substring(0, length - 1) * 10
          let secondDec = +dec[length - 1] + 1
          if (p < 5) {
            result = int + dec.substring(0, length) * 1
          } else if (p > 5) {
            result = int + (firstDec + secondDec)
          } else {
            let b = +dec[length - 1]
            let a = +dec.substring(length + 1, dec.length)
            if (a > 0) {
              result = int + (firstDec + secondDec)
            } else if (b & 1 == 1) {
              result = int + (firstDec + secondDec)
            } else {
              result = int + dec.substring(0, length) * 1
            }
          }

          let resultStr = result.toString()

          if (resultStr.length <= length) {
            backResult = result / Math.pow(10, length) + ''
          } else {
            backResult = resultStr.substring(0, (resultStr.length - length)) + '.' + resultStr.substring((resultStr.length - length), result.length)
          }
        } else if (dec.length < length) {
          backResult = num + '0'.repeat(length - dec.length)
        } else {
          backResult = num
        }
      }
    }

    return backResult
  }

}