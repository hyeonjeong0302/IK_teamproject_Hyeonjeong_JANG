import shoppingList from "./data.js"; //shoppinglist로 변수 받기

const bestSection = document.querySelector(".best_product");

for (let j = 1; j <= 5; j++) {
  for (let i = 0; i < shoppingList.length; i++) {
    const bestDiv = document.createElement("div");
    bestDiv.setAttribute("class", "best_box");

    const bestImg = document.createElement("img");
    bestImg.setAttribute("src", shoppingList[i].src);
    bestDiv.appendChild(bestImg);

    const bestName = document.createElement("p");
    const bestNameText = document.createTextNode(shoppingList[i].name);
    bestName.appendChild(bestNameText);
    bestDiv.appendChild(bestName);

    const bestPrice = document.createElement("p");
    const bestPriceText = document.createTextNode(shoppingList[i].price);
    bestPrice.appendChild(bestPriceText);
    bestDiv.appendChild(bestPrice);

    bestSection.appendChild(bestDiv);
  } //shoppingList_for
} //pagenation
