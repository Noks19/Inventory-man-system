// Function to add product

function addProduct() {
  const categories = [...new Set(inventory.map((p) => p.category))];
  let categoryPrompt = "Please enter a category";
  if (categories.length > 0) {
    categoryPrompt += ` (Existing categories: ${categories.join(", ")})`;
  }
  let category = prompt(categoryPrompt);
  if (!category || category.trim() === "") {
    category = "Uncategorized";
  }

  // Name
  let name = prompt("Please enter the product name:");
  if (!name || name.trim() === "") {
    alert("Please provide a non-empty name.");
    return;
  }

  // Price
  let price = parseFloat(prompt("Please enter the price:"));
  if (isNaN(price) || price < 0) {
    alert("Price must be a positive number.");
    return;
  }

  // Quantity
  let quantity = parseInt(prompt("Please enter the quantity:"));
  if (isNaN(quantity) || quantity < 0) {
    alert("Quantity must be a positive number.");
    return;
  }

  const product = {
    id,
    category,
    name,
    price,
    quantity,
  };

  inventory.push(product);
  console.log("Product Added:", product);
  alert(
    `'${name}' added successfully!\nCategory: ${category}\nName: ${name}\nID: ${id}\nPrice: ${price}\nQuantity: ${quantity}`
  );
}

function generateUniqueId() {
  const existingIds = inventory.map((p) => p.id);

  let id = Math.floor(1000000000 + Math.random() * 9000000000);
  if (existingIds.includes(id)) {
    id = Math.floor(1000000000 + Math.random() * 9000000000);
  }

  return id;
}

function removeProduct() {
  if (inventory.length === 0) {
    alert("Inventory is empty. Nothing to remove.");
    console.log("Inventory is empty. Nothing to remove.");
    return;
  }

  const categories = [...new Set(inventory.map((p) => p.category))];

  const category = prompt(
    `Please enter the category of the product you want to remove:\n${categories.join(
      ", "
    )}`
  );

  const id = generateUniqueId();
  if (!category || category.trim() === "") {
    alert("No category entered. Operation cancelled.");
    console.log("Remove cancelled: No category entered.");
    return;
  }

  const productsInCategory = inventory.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  if (productsInCategory.length === 0) {
    alert(`No products found in category '${category}'.`);
    console.log(`No products found in category '${category}'.`);
    return;
  }

  const productName = prompt(
    `Products in '${category}':\n${productsInCategory
      .map((p) => `ID: ${p.id} | Name: ${p.name} | Qty: ${p.quantity}`)
      .join("\n")}\n\nEnter the name of the product you want to remove:`
  );

  if (!productName || productName.trim() === "") {
    alert("No product name entered. Operation cancelled.");
    console.log("Remove cancelled: No product name entered.");
    return;
  }

  const index = inventory.findIndex(
    (p) =>
      p.name.toLowerCase() === productName.toLowerCase() &&
      p.category.toLowerCase() === category.toLowerCase()
  );

  if (index === -1) {
    alert(`Product '${productName}' was not found in category '${category}'.`);
    console.log(
      `Product '${productName}' not found in category '${category}'.`
    );
    return;
  }

  const productToRemove = inventory[index];

  const confirmDelete = confirm(
    `Are you sure you want to remove '${productToRemove.name}' from the '${productToRemove.category}' category?\n\nThis action cannot be undone.`
  );

  if (!confirmDelete) {
    alert("Product removal cancelled. No changes made.");
    console.log("Product removal cancelled by user.");
    return;
  }

  const removed = inventory.splice(index, 1);

  alert(
    `Product '${removed[0].name}' (${removed[0].category}) removed successfully!\nRemaining items in inventory: ${inventory.length}`
  );

  console.log("Product removed:", removed[0]);
  console.log("Updated Inventory:", inventory);
}

// Update Stock
function updateStockQuantity() {
  if (inventory.length === 0) {
    alert("Inventory is empty. Nothing to update.");
    console.log("Inventory is empty. Nothing to update.");
    return;
  }

  const productList = inventory
    .map((p) => `ID: ${p.id} | Name: ${p.name} | Qty: ${p.quantity}`)
    .join("\n");

  const productId = prompt(
    `Enter the Product ID you want to update:\n\n${productList}`
  );
  console.log("Product ID entered:", productId);

  const quantityUpdate = parseInt(prompt("Enter the new quantity:"), 10);
  console.log("Quantity entered:", quantityUpdate);

  const index = inventory.findIndex(
    (product) => product.id === Number(productId)
  );

  if (index !== -1) {
    const oldQuantity = inventory[index].quantity;
    inventory[index].quantity = quantityUpdate;

    alert(
      `Stock updated!\n\nProduct: ${inventory[index].name}\nID: ${inventory[index].id}\nOld Quantity: ${oldQuantity}\nNew Quantity: ${quantityUpdate}`
    );

    console.log("Stock Updated:", {
      id: inventory[index].id,
      name: inventory[index].name,
      oldQuantity,
      newQuantity: quantityUpdate,
    });
    console.log("Updated Inventory:", inventory);
  } else {
    alert(`Product with ID ${productId} not found.`);
    console.log(`Product with ID ${productId} not found.`);
  }
}

function generateReport() {
  const totalProducts = inventory.length;
  let totalValue = 0;
  let lowStockItems = [];
  let highestValueProduct = null;
  let highestValue = 0;

  for (let i = 0; i < inventory.length; i++) {
    const product = inventory[i];

    const stockInventory = [];

    const addStockInventory = (name, category, id, price, quantity) => {
      // local variable (local scope) inventory
      const inventory = {
        name: name,
        category: category,
        id: id,
        price: price,
        quantity: quantity,
      };
      stockInventory.push(inventory); // global variable // global scope
    };

    const findInventoryByName = (productId) => {
      const inventory = stockInventory.find(function (inv) {
        if (inv.productId === productId) {
          return true;
        }
        return false;
      });
      return inventory;
    };

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

function inventoryApplication() {
  const choice = prompt(
    "Enter a command:\n1. Add Product\n2. Remove Product\n3. Update Stock\n4. Generate Report\n5. Exit"
  );

  if (choice === "1") {
    addProduct();
  } else if (choice === "2") {
    removeProduct();
  } else if (choice === "3") {
    updateStockQuantity();
  } else if (choice === "4") {
    generateReport();
  } else if (choice === "5") {
    alert("Exiting application. Goodbye!");
    return;
  } else {
    alert("Invalid command.");
  }

  if (choice !== "5") {
    inventoryApplication();
  }
}

inventoryApplication();
