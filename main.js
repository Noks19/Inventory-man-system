const inventory = [
  ...bakery,
  ...beverages,
  ...cannedGoods,
  ...dairy,
  ...frozen,
  ...produce,
  ...snacks,
  ...household,
];
console.log("Inventory loaded:", inventory.length);


//Function to add a product to the system

const addProduct = (id, category = "Uncategorized", name, price, quantity) => {
    //To make sure there are no duplicates
if (inventory.some(product => product.id === id)) {
    throw new Error("A product with this id exists in the system");
}

//Parametre validations

if (typeof id !== 'number' || isNaN(id)) {
    throw new Error ("Please provide a valid number");
}

if (typeof category !== 'string' || category.trim() === '') {
    throw new Error("Please provide a non-empty string");
}

if (typeof name !== 'string' || name.trim() === '') {
    throw new Error ("Please provide a non-empty string");
}

if (typeof price !== 'number' || isNaN(price) || price < 0) {
    throw new Error("Stop - use positive numbers only");
}

if (typeof quantity !== 'number' || isNaN(quantity) || quantity < 0) {
    throw new Error("Stop - use positive numbers only");
}

//If the parametre validations check out, create and add
    const product = {
        id,
        category,
        name,
        price,
        quantity
    };

    inventory.push(product);
    console.log(`Success! This product: ${name}, has been added to the inventory`);
}

//Prompt

const getInput = () => {
    let id = prompt("Please enter an id");
    let category = prompt("Please enter a category");
    let name = prompt("Please enter a name");
    let price = prompt("Please enter a price");
    let quantity = prompt("Please enter a quantity");

    //Let's convert to the correct data type

    id = parseInt(id);
    price = parseFloat(price);
    quantity = parseInt(quantity);

    //For the default value

    if (category === null || category.trim() === "") {
        category = "Uncategorized";
    }
    return { id, category, name, price, quantity};
} 

//Testing 

console.log("Inventory loaded: before", inventory.length);

addProduct (52523498145, "Bakery", "Cinammon Cookies", 1500, 2700); //A successful test

addProduct (12345678910, "CannedGoods", "Cherry Tomato", 880, 100); //Another successful test

 addProduct(7738311193, "", "Coconut Bread", 2900, 50); //Throws a duplicate id + the empty category

    addProduct(9603410528, "Produce", "Cassava", -3500, 5); //Throws an error for the negative price

    addProduct(30008492285, "Dairy", "Miliki", 650, 28);

console.log("Inventory loaded: ", inventory.length);    




