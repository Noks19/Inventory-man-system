const stockInventory = [];

const addStockInventory = (name, category, productId, price, quantity) => {
  // local variable (local scope) inventory
  const inventory = {
    name: name,
    category: category,
    productId: productId,
    price: price,
    quantity: quantity,
  };
  stockInventory.push(inventory); // global variable // global scope
};

const findInventoryByName = (productId) => {
  const inventory = stockInventory.find(function(inv)
  {if (inv.productId === productId) {
    return true;
  }
  return false;
});
return inventory;
};


// Update Stock 
function updateStockQuantity(productId, changeAmount) {
  let productFound = false;
  // For Loop: iterate to find and update
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].id === productId) {
      inventory[i].quantity = changeAmount;
      productFound = true;
      console.log(`Stock for productID ${id} updated to ${changeAmount}.`);
    }
  }

  if (!productFound) {
    console.log(`Product with ID ${id} not found.`);
  }
}

