const tabContentContainer = document.createElement("div");
tabContentContainer.id = "content";

const tabContainer = document.createElement("div");
tabContainer.classList.add("menu-container");

["Home", "Menu", "Contact-Info"].forEach(function(section) {
  const div = document.createElement("div");
  div.classList.add("tab", section.toLowerCase());
  div.textContent = section;
  tabContainer.appendChild(div);
});

Array.from(tabContainer.children).forEach(function(tab) {
  tab.addEventListener("click", function() {
    showPage(tab);
    toggleActiveTab(tab);
  });
});

function toggleActiveTab(tab) {
  const currentActiveTab = document.querySelector('.tab.clicked');
  currentActiveTab.classList.remove('clicked');
  tab.classList.add('clicked');
}

document.body.appendChild(tabContainer);
tabContainer.firstChild.classList.add("clicked");
document.body.appendChild(tabContentContainer);
showPage(tabContainer.firstChild);

function clearContent(container){
  container.innerHTML = "";
}

function generateHomePage(parentContainer) {
  const pizzaImage = generateImageElement("http://www.foodanddine.com/wp-content/uploads/2016/05/Pizza-capricciosa.jpg");
  const pizzaTextBlock = generatePizzaText();
  const homePageContainer = document.createElement("div");

  [pizzaImage, pizzaTextBlock].forEach(function(element) {
    homePageContainer.appendChild(element);
  })

  return homePageContainer;

  function generatePizzaText () {
    const textContainer = document.createElement("div")
    textContainer.classList.add("description");

    const textElements = [
      {content: "Time For Pizza!", type: "h3"},
      {content: `Our pizza is the best pizza to
                 ever grace the earth. We hand make
                 all pizzas and ingredients. We
                 manage to hand craft pizzas that
                 are wonderful, authentic, and still
                 have a low cost. If possible our ingredients
                 are locally sourced and bought
                 straight from the farmers themselves.
                 Try one today!`, type: "p"}
    ];

    textElements.forEach(function(element) {
      textContainer.appendChild(generateTextBlock(element))
    });

    return textContainer;
  }

  function generateImageElement(imageSrc) {
    const image = document.createElement("img");
    image.setAttribute("src", imageSrc);
    return image;
  }

}

function generateTextBlock({content, type}) {
  const text = document.createElement(type);
  text.textContent = content;
  return text;
}

function generateMenuPage(){
  const menuListContainer = document.createElement("div");
  const pizzaPrices = {
            type: "ul",
            items: [{item: "Pepperonni Pizza", info: 10.99},
                    {item: "Cheese Pizza", info: 9.99},
                    {item: "Mushroom Pizza", info: 10.50},
                    {item: "Chicken Pizza", info: 10.00}]
  };
  menuListContainer.appendChild(generateList(pizzaPrices));
  return menuListContainer;
}

function generateList({type, items}) {
  const list = document.createElement(type);

  items.forEach(function({item, info}) {
    listItem = document.createElement("li");
    listItem.textContent = `${item}: ${info}`;
    list.appendChild(listItem);
  });
  return list;
}


function generateContactPage() {
  const contactPageContainer = document.createElement("div");
  const contactParagraph = generateTextBlock({content: "Come visit our wonderful restaurant at 222 S main ST. In numerous locations. Get ahold of us!", type: "p"});

  const bullets = {type: "ul",
            items: [{item: "Store Phone", info: "1800-666-6666"},
                    {item: "Email", info: "timeforpizza@pizzaplace.moc"},
                    {item: "Mail", info: "City State, Box 1, 55584"}]
            };

  const contactBullets = generateList(bullets);
  [contactParagraph, contactBullets].forEach(function(element){
    contactPageContainer.appendChild(element);
  })

  return contactPageContainer;
}

function showPage(tab) {
  const tabName = tab.textContent;
  clearContent(tabContentContainer);
  tabContentContainer.appendChild(selectGenerator(tabName));
}

function selectGenerator(tabName) {
  if(tabName === "Home"){
    return generateHomePage();
  } else if (tabName === "Menu") {
    return generateMenuPage();
  } else {
    return generateContactPage();
  }
}
