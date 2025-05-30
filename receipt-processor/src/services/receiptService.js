const { v4: uuidv4 } = require('uuid');

const db = {}; // In-memory storage

function calculatePoints(receipt) {
    let points = 0;

    // 1. One point per alphanumeric character in retailer name
    points += (receipt.retailer.match(/[a-zA-Z0-9]/g) || []).length;
    console.log("retailer name", points);

    // 2. 50 points if total is round dollar amount
    if (parseFloat(receipt.total) % 1 === 0) points += 50;
    console.log("50 increment", points);

    // 3. 25 points if total is multiple of 0.25
    if (parseFloat(receipt.total) % 0.25 === 0) points += 25;
    console.log("25 increment", points);

    // 4. 5 points for every two items
    points += Math.floor(receipt.items.length / 2) * 5;
    console.log("5 for each pair", points);

    // 5. Description length rule
    for (const item of receipt.items) {
        const desc = item.shortDescription.trim();
        if (desc.length % 3 === 0) {
            points += Math.ceil(parseFloat(item.price) * 0.2);
            console.log( item.shortDescription, points );
        }
    }

    /*

    // Not required at this time
    // 6. 5 points if total > 10.00
    if (parseFloat(receipt.total) > 10.0) {
        points += 5;
    }
    */

    // 7. 6 points if day of date is odd
    const day = parseInt(receipt.purchaseDate.split("-")[2]);
    if (day % 2 === 1) points += 6;
    console.log("day points", points);

    // 8. 10 points if time is between 2:00 PM and 4:00 PM
    const [hour, minute] = receipt.purchaseTime.split(':').map(Number);
    if ((hour >= 14 && minute >= 1) && (hour <= 15 && minute <= 59)) {
        points += 10;
    }
    console.log("time points", points);

    return points;
}

function processReceipt(receipt) {
    const id = uuidv4();
    const points = calculatePoints(receipt);
    db[id] = points;
    return id;
}

function getPoints(id) {
    return db[id] ?? null;
}

module.exports = { processReceipt, getPoints };