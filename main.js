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

  alert(
    `Report:\n ` +
      `Total products: ${totalProducts}\n` +
      `Total Value: ${totalValue.toFixed(2)}\n` +
      (highestValueProduct
        ? `Highest value: ${highestValueProduct.name} ($${highestValue.toFixed(
            2
          )})\n`
        : "") +
      `Low Stock Items: ${lowStockItems.length}`
  );
}

function mainMenu() {
  let choice;

  do {
    choice = prompt(
      "Inventory Management Menu:\n" +
        "1. Add Product \n" +
        "2. Remove Product \n" +
        "3. Update Stock\n" +
        "4. Generate Report\n" +
        "5. Exit\n\n" +
        "Enter your choice (1-5):"
    );

    if (choice === null) {
      break;
    }

    switch (choice.trim()) {
      case "1":
        alert("Add Product feature.");
        break;

      case "2":
        alert("Remove Product feature.");
        break;

      case "3":
        alert("Update Stock feature.");
        break;

      case "4":
        generateReport();
        break;

      case "5":
        alert("Exiting Inventory Management System.");
        break;

      default:
        alert("Invalid choice. Please enter 1-5.");
        break;
    }
  } while (choice !== "5" && choice !== null);
}

mainMenu();
