console.log("Inventory loaded:", inventory.length);

function generateReport() {
  const totalProducts = inventory.length;

  let totalValue = 0;

  let lowStockItems = [];

  for (let i = 0; i < inventory.length; i++) {
    const product = inventory[i];

    totalValue += product.price * product.quantity;

    if (product.quantity < 10) {
      lowStockItems.push({
        name: product.name,
        quantity: product.quantity,
      });
    }
  }

  console.log(`Total products: ${totalValue}`);
  console.log(`Total Inventory Value: $${totalValue.toFixed(2)}`);

  if (lowStockItems.length > 0) {
    console.log("Low Stock Items:");
    for (let Item of lowStockItems) {
      console.log(`-${Item.name} (Quantity: ${Item.quantity})`);
    }
  } else {
    console.log("No low stock item!");
  }
}
generateReport();
