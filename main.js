// Function to add product

function generateUniqueId() {
  const existingIds = inventory.map((p) => p.id);

  let id = Math.floor(1000000000 + Math.random() * 9000000000);
  if (existingIds.includes(id)) {
    id = Math.floor(1000000000 + Math.random() * 9000000000);
  }

  return id;
}

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

  const id = generateUniqueId();

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

function removeProduct() {
  if (inventory.length === 0) {
    alert("Inventory is empty. Nothing to remove.");
    return;
  }

  const categories = [...new Set(inventory.map((p) => p.category))];

  const category = prompt(
    `Please enter the category of the product you want to remove:\n${categories.join(
      ", "
    )}`
  );

  if (!category || category.trim() === "") {
    alert("No category entered. Operation cancelled.");
    return;
  }

  const productsInCategory = inventory.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  if (productsInCategory.length === 0) {
    alert(`No products found in category '${category}'.`);
    return;
  }

  const productName = prompt(
    `Products in '${category}':\n${productsInCategory
      .map((p) => p.name)
      .join(", ")}\n\nEnter the name of the product you want to remove:`
  );

  if (!productName || productName.trim() === "") {
    alert("No product name entered. Operation cancelled.");
    return;
  }

  const index = inventory.findIndex(
    (p) =>
      p.name.toLowerCase() === productName.toLowerCase() &&
      p.category.toLowerCase() === category.toLowerCase()
  );

  if (index === -1) {
    alert(`Product '${productName}' was not found in category '${category}'.`);
    return;
  }

  const productToRemove = inventory[index];

  const confirmDelete = confirm(
    `Are you sure you want to remove '${productToRemove.name}' from the '${productToRemove.category}' category?\n\nThis action cannot be undone.`
  );

  if (!confirmDelete) {
    alert("Product removal cancelled. No changes made.");
    return;
  }

  const removed = inventory.splice(index, 1);

  alert(
    `Product '${removed[0].name}' (${removed[0].category}) removed successfully!\nRemaining items in inventory: ${inventory.length}`
  );
}

console.log("Updated Inventory:", inventory);

function inventoryApplication() {
  const choice = prompt(
    "Enter a command:\n1. Add Product\n2. Remove Product\n3. Update Stock\n4. Generate Report\n5. Exit"
  );

  if (choice === "1") {
    addProduct();
  } else if (choice === "2") {
    removeProduct();
  } else if (choice === "3") {
    updateStock();
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
