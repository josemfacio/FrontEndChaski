const PRODUCT_CART = "almacenCart";

export function getProductsCart() {
  const response = localStorage.getItem(PRODUCT_CART);
  return JSON.parse(response || "[]");
}

export function addProductCart(id, canti) {
  const products = getProductsCart();
  const existingProduct = products.find((product) => product.id === id);

  if (!existingProduct) {
    products.push({
      id: id,
      cantidad: null,
      ot: null,
      cant: canti,
    });
    localStorage.setItem(PRODUCT_CART, JSON.stringify(products));
    return true;
  } else {
    return false;
  }
}
export function findProductCart(id) {
  const products = getProductsCart();
  const existingProduct = products.find((product) => product.id === id);
  return existingProduct ? existingProduct : null;
}
export function editProductCantApi(index, cant) {
  const products = getProductsCart();

  if (index >= 0 && index < products.length) {
    products[index].cantidad = parseInt(cant);
    // Aquí puedes agregar la lógica adicional que necesites
    // por ejemplo, actualizar la información en el localStorage si es necesario
    localStorage.setItem(PRODUCT_CART, JSON.stringify(products));
    return true;
  } else {
    return false;
  }
}

export function editProductOTApi(index, ot) {
  const products = getProductsCart();

  if (index >= 0 && index < products.length) {
    products[index].ot = parseInt(ot);
    // Aquí puedes agregar la lógica adicional que necesites
    // por ejemplo, actualizar la información en el localStorage si es necesario
    localStorage.setItem(PRODUCT_CART, JSON.stringify(products));
    return true;
  } else {
    return false;
  }
}

export function removeProductCartApi(index) {
  const idProducts = getProductsCart();
  idProducts.splice(index, 1);
  localStorage.setItem(PRODUCT_CART, JSON.stringify(idProducts));
  return;
}

export function cleanProductCartApi() {
  localStorage.removeItem(PRODUCT_CART);
}
