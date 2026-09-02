(() => {
  const nativeSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function(name, value) {
    const next = String(value);
    if (this.getAttribute(name) === next) return;
    return nativeSetAttribute.call(this, name, next);
  };
})();
