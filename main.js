console.log("Inventory loaded:", inventory.length);

function generateReport() {
  const totalProducts = inventory.length;
  let totalValue = 0;
  let lowStockItems = [];
  let highestValueProduct = null;
  let highestValue = 0;

  for (let i = 0; i < inventory.length; i++) {
    const product = inventory[i];

    const productValue = product.price * product.quantity;
    totalValue += productValue;

    if (product.quantity < 10) {
      lowStockItems.push({
        name: product.name,
        quantity: product.quantity,
      });
    }

    if (productValue > highestValue) {
      highestValue = productValue;
      highestValueProduct = product;
    }
  }

  console.log(`Total products: ${totalProducts}`);
  console.log(`Total Inventory Value: $${totalValue.toFixed(2)}`);

  if (lowStockItems.length > 0) {
    console.log("Low Stock Items:");
    for (let Item of lowStockItems) {
      console.log(`-${Item.name} (Quantity: ${Item.quantity})`);
    }
  } else {
    console.log("No low stock item!");
  }

  if (highestValueProduct) {
    console.log(
      `highest value product: ${
        highestValueProduct.name
      } ($${highestValue.toFixed(2)})`
    );
  }
}
generateReport();
