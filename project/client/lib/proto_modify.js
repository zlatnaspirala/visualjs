
export default function ActivateModifiers() {

  // Make 1200.99 $   looks like this 1.230,00
  Number.prototype.BalanceStyle = function (
    decPlaces,
    thouSeparator,
    decSeparator
  ) {
    var n = this,
      decPlaces = isNaN((decPlaces = Math.abs(decPlaces))) ? 2 : decPlaces,
      decSeparator = decSeparator == undefined ? "." : decSeparator,
      thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
      sign = n < 0 ? "-" : "",
      i = parseInt((n = Math.abs(+n || 0).toFixed(decPlaces))) + "",
      j = (j = i.length) > 3 ? j % 3 : 0;
    return (
      sign +
      (j ? i.substr(0, j) + thouSeparator : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) +
      (decPlaces
        ? decSeparator +
          Math.abs(n - i)
            .toFixed(decPlaces)
            .slice(2)
        : "")
    );
  };

  Array.prototype.unset = function (value) {
    if (this.indexOf(value) != -1) {
      this.splice(this.indexOf(value), 1);
    }
  };

  Array.prototype.ACCESS_MODULE = function (name) {
    for (var x = 0; x < this.length; x++) {
      if (this[x].NAME == name) {
        return this[x];
      }
    }
  };

  Array.prototype.ACCESS = function (name) {
    for (var x = 0; x < this.length; x++) {
      if (this[x].NAME == name) {
        return this[x];
      }
    }
  };

  Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
  };

  NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
      if (this[i] && this[i].parentElement) {
        this[i].parentElement.removeChild(this[i]);
      }
    }
  };
}
