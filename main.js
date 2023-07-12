const config = {
    initialForm: document.getElementById("initial-form"),
    mainPage: document.getElementById("mainPage"),
}

function displayNone(ele) {
    ele.classList.remove("d-block");
    ele.classList.add("d-none");
}

function displayBlock(ele) {
    ele.classList.remove("d-none");
    ele.classList.add("d-block");
}

const item = [
    {
        "name":"Flip machine",
        "price":15000,
        "priceLate":1,
        "max":500,
        "type":"ability",
        "getPrice":25,
        "imgUrl":"https://cdn.pixabay.com/photo/2014/04/03/10/06/barbecue-309842_640.png"
    },
    {
        "name":"ETF Stock",
        "price":300000,
        "priceLate":1.1,
        "max":Infinity,
        "type":"stock",
        "getPrice":0.1,
        "imgUrl":"https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"
    },
    {
        "name":"ETF Bonds",
        "price":300000,
        "priceLate":1,
        "max":Infinity,
        "type":"stock",
        "getPrice":0.07,
        "imgUrl":"https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"
    },
    {
        "name":"Lemonade Stand",
        "price":30000,
        "priceLate":1,
        "max":1000,
        "type":"realEstate",
        "getPrice":30,
        "imgUrl":"https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png"
    },
    {
        "name":"Ice Cream Truck",
        "price":100000,
        "priceLate":1,
        "max":500,
        "type":"realEstate",
        "getPrice":120,
        "imgUrl":"https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png"
    },
    {
        "name":"House",
        "price":20000000,
        "priceLate":1,
        "max":100,
        "type":"realEstate",
        "getPrice":32000,
        "imgUrl":"https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png"
    },
    {
        "name":"TownHouse",
        "price":40000000,
        "priceLate":0,
        "max":100,
        "type":"realEstate",
        "getPrice":64000,
        "imgUrl":"https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png"
    },
    {
        "name":"Mansion",
        "price":250000000,
        "priceLate":1,
        "max":20,
        "type":"realEstate",
        "getPrice":500000,
        "imgUrl":"https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png"
    },
    {
        "name":"Industrial Space",
        "price":1000000000,
        "priceLate":1,
        "max":10,
        "type":"realEstate",
        "getPrice":2200000,
        "imgUrl":"https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png"
    },
    {
        "name":"Hotel Skyscraper",
        "price":10000000000,
        "priceLate":1,
        "max":5,
        "type":"realEstate",
        "getPrice":25000000,
        "imgUrl":"https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png"
    },
    {
        "name":"Bullet-speed Sky Railway",
        "price":10000000000000,
        "priceLate":1,
        "max":1,
        "type":"realEstate",
        "getPrice":30000000000,
        "imgUrl":"https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png"
    }
]

class UserAccount {
    initialMoney = 50000;
    constructor(name, age = 20){
        this.name = name;
        this.money = this.initialMoney;
        this.age = age;
        this.days = 0;
        this.hamburger = 0;
        this.addMoneyPerClick = 25;
        this.addMoneyPerDays = 0;
        this.itemBox = [];
        this.time = 1;
    }
}


class Item {
    constructor(name, price, priceLate, max, type, getPrice, imgUrl){
        this.name = name;
        this.price = price;
        this.priceLate = priceLate;
        this.max = max;
        this.type = type;
        this.getPrice = getPrice;
        this.imgUrl = imgUrl;
        this.stock = 0;
    }
}

function initalChanging(userAccount){
    userAccount.days++;
    document.getElementById('days').textContent = userAccount.days + " days";
    userAccount.money += userAccount.addMoneyPerDays;
    document.getElementById("money").innerHTML = "¥ " + userAccount.money;
    if(userAccount.days % 365 == 0) {
        userAccount.age++;
        document.getElementById('age').textContent = userAccount.age + " years old";
    }
}

function initializeUserAccount(){
    let form = document.getElementById("user-form");

    let userAccount = new UserAccount(form.querySelectorAll(`input[name="userName"]`)[0].value, document.getElementById("age").value);
    if(userAccount.name.length < 1) return false;

    displayNone(config.initialForm);

    let mainContainer = document.createElement("div");
    mainContainer.id = "mainData";
    mainContainer.append(createMainPage(userAccount, "new"), createSaveResetBotton(userAccount))
    
    let t = 1000;
    let id = setInterval(() => {
        initalChanging(userAccount);
    }, t);

    config.mainPage.append(mainContainer);

    document.getElementById("save-btn").addEventListener("click", () => {
        clearInterval(id);
        save(userAccount);
    });

    document.getElementById("reset-btn").addEventListener("click", () => {
        if(reset()) clearInterval(id);
    });

    document.getElementById("time-scale").addEventListener("click", () => {
        clearInterval(id);
        userAccount.time++;
        if(userAccount.time >= 6) userAccount.time = 1;
        t = 1000 / userAccount.time;
        id = setInterval(() => {
            initalChanging(userAccount);
        }, t);
        document.getElementById("time-scale-label").innerHTML = "x " + userAccount.time;
    })
}

function saveDataDisplay(){
    let result = callStorage();
    if (result) {
        displayNone(config.initialForm);
        let userAccount = result.account;
        let mainContainer = document.createElement("div");
        mainContainer.id = "mainData";
        mainContainer.append(createMainPage(userAccount, "login"), createSaveResetBotton(userAccount));
        
        let id = setInterval(()=>{
            initalChanging(userAccount);
        } , 1000 / userAccount.time);

        config.mainPage.append(mainContainer);

        document.getElementById("save-btn").addEventListener("click", function() {
            clearInterval(id);
            save(userAccount);
        });

        document.getElementById("reset-btn").addEventListener("click", function() {
            if(reset()) clearInterval(id);
        });
        
        document.getElementById("time-scale").addEventListener("click", () => {
            clearInterval(id);
            userAccount.time++;
            if(userAccount.time >= 6) userAccount.time = 1;
            t = 1000 / userAccount.time;
            id = setInterval(() => {
                initalChanging(userAccount);
            }, t);
            document.getElementById("time-scale-label").innerHTML = "x " + userAccount.time;
        })
    }
}

function createSaveResetBotton(userAccount){
    let saveOrReset = document.createElement("div");
    saveOrReset.classList.add("mt-2");
    saveOrReset.innerHTML =
    `
    <div>
        <div class="col-12 d-flex justify-content-between align-items-center" style="height: 70px;">
            <div>
                <button class="bg-primary mx-2 btn-lg" id="time-scale"><i class="fas fa-forward fa-fluid"></i></button>
                <span class="fw-bold fa-fluid" id="time-scale-label"> x ${userAccount.time}</span>
            </div>
            <div class="">
                <button class="bg-primary mx-2 btn-lg" id="reset-btn"><i class="fas fa-sign-out-alt fa-fluid"></i></button>
                <button class="bg-primary btn-lg" id="save-btn"><i class="far fa-save fa-fluid"></i></button>
            </div>
        </div>
    </div>
    `;
    return saveOrReset;
}


function callStorage(){
    if(JSON.parse(localStorage.getItem(document.getElementById("yourName").value)) === null){
        alert("保存されていません。");
        return false;
    }
    let data = JSON.parse(localStorage.getItem(document.getElementById("yourName").value));
    return data;
}

function createMainPage(userAccount, type){
    let container = document.createElement("div");
    container.classList.add("p-3", "d-flex", "bg-secondary", "vh-75", "flex-wrap");
    
    let hamburgerCon = document.createElement("div");
    hamburgerCon.classList.add("col-md-4", "col-12", "text-center", "align-items-center", "bg-dark", "p-2", "fit-height");

    let hamburgerInfo = document.createElement("div");
    hamburgerInfo.innerHTML =
    `
    <div class="bg-secondary mb-md-5">
        <h4 id="burger">${userAccount.hamburger} Burgers</h4>
        <p id="addMoneyPerClick">one click ¥${userAccount.addMoneyPerClick}</p>
    </div>
    `
    
    let hamburgerImg = document.createElement("div");
    hamburgerImg.innerHTML =
    `
    <a href="#" disabled="disabled" class="d-block col-md-10 col-4 mx-auto">
        <img src="https://cdn.pixabay.com/photo/2012/04/13/01/51/hamburger-31775_960_720.png" id="hamburger" alt="">
    </a>
    `

    hamburgerCon.append(hamburgerInfo, hamburgerImg);
    container.append(hamburgerCon);

    
    const Img = hamburgerImg.querySelector('#hamburger');
    
    Img.addEventListener("click", () => {
        changePerClick(userAccount);
    });
    
    let userInfoCon = document.createElement("div");
    userInfoCon.classList.add("col-md-8", "col-12", "p-2");
    
    let userInfo = document.createElement("div");
    userInfo.classList.add("text-center", "p-2");
    userInfo.innerHTML = 
    `
    <div class="d-flex flex-wrap">
        <div class="border border-dark border-4 col-6">
            <p class="text-white p-md-2">${userAccount.name}</p>
        </div>
        <div class="border border-dark border-4 col-6">
            <p id="age" class="text-white p-md-2">${userAccount.age} years old</p>
        </div>
        <div class="border border-dark border-4 col-6">
            <p id="days" class="text-white p-md-2">${userAccount.days} days</p>
        </div>
        <div class="border border-dark border-4 col-6">
            <p id="money" class="text-white p-md-2">¥ ${userAccount.money}</p>
        </div>
    </div>
    `;
    
    
    let itemCon = document.createElement("div");
    itemCon.classList.add("bg-dark", "p-2", "box-height", "overflow-auto");
    let itemArr = document.createElement("div");
    itemCon.append(itemArr);
    
    if(type == "new"){
        for(let i = 0; i < item.length; i++){
            let item1 = new Item(item[i]["name"], item[i]["price"], item[i]["priceLate"], item[i]["max"], item[i]["type"], item[i]["getPrice"], item[i]["imgUrl"]);
            userAccount.itemBox.push(item1);
            itemArr.append(createItem(item1));
        }
    } else {
        for(let i = 0; i < item.length; i++){
            itemArr.append(createItem(userAccount.itemBox[i]));
        }
    }
    
    let itemStocks = itemCon.querySelectorAll("#item-stock");
    let items = itemCon.querySelectorAll("#item");
    
    for(let i = 0; i < items.length; i++){
        items[i].addEventListener('click', () => {
            itemCon.innerHTML = "";
            itemCon.append(displayItemDetail(item[i]));
            
            document.getElementById("purchaseValue").addEventListener("click", () => {
                changeTotal();
            })
            
            document.getElementById("purchase-btn").addEventListener("click", () => {
                let numBox = document.getElementById("purchaseValue");
                if(isBuy(userAccount)) {
                    let purchaseValue = document.getElementById("purchaseValue");
                    userAccount.itemBox[i].stock += parseInt(purchaseValue.value);
                    if(item[i].max >= userAccount.itemBox[i].stock){
                        if(userAccount.itemBox[i].type == 'ability'){
                            changeMoneyPerClick(userAccount, item[i]);
                            document.getElementById("money").innerHTML = "¥ " + userAccount.money;
                            document.getElementById("addMoneyPerClick").innerHTML = "one click ¥" + userAccount.addMoneyPerClick;
                        }
                        else if(userAccount.itemBox[i].type == 'realEstate'){
                            userAccount.addMoneyPerDays += userAccount.itemBox[i].getPrice * numBox.value;
                            document.getElementById("money").innerHTML = "¥ " + userAccount.money;
                        }
                        else {
                            userAccount.addMoneyPerDays += userAccount.itemBox[i].price * userAccount.itemBox[i].getPrice * numBox.value;
                            document.getElementById("money").innerHTML = "¥ " + userAccount.money;
                        }
                    }
                    else {
                        userAccount.itemBox[i].stock -= parseInt(purchaseValue.value);
                        let numBox = document.getElementById("purchaseValue");
                        let itemPrice = parseInt(numBox.value) * parseInt(numBox.getAttribute("data-price"));
                        userAccount.money += itemPrice;
                        alert("out of stock");
                    }
                    itemStocks[i].innerHTML = userAccount.itemBox[i].stock;
                }
                
                itemCon.innerHTML = "";
                itemCon.append(itemArr);
            })
            
            document.getElementById("back-btn").addEventListener("click", () => {
                itemCon.innerHTML = "";
                itemCon.append(itemArr);
            })

        })
    }
    userInfoCon.append(userInfo, itemCon);
    
    container.append(userInfoCon);
    
    return container;
}

function displayItemDetail(item){
    let container = document.createElement("div");
    container.classList.add("bg-secondary", "p-3");
    let itemDetail = document.createElement("div");
    itemDetail.classList.add("d-flex", "flex-wrap", "justify-content-between");
    itemDetail.innerHTML = 
    `
    <div class="col text-left py-5">
        <h4 class="full-width">${item.name}</h4>
        <p class="full-width">Max purchases: ${item.max}</p>
        <p class="full-width">Price: ${item.price}</p>
        <p class="full-width">Get ¥${item.getPrice} /click</p>
    </div>
    <div class="col">
        <div>
            <img src="${item.imgUrl}">
        </div>
    </div>
    `;
    
    let purchaseForm = document.createElement("div");
    purchaseForm.innerHTML = 
    `
    <div>
        <div class="mb-2">
            <p class="text-left">ow many would you like to buy?</p>
            <div>
                <input class="full-width form-control" type="number" min="0" data-price="${item.price}" id="purchaseValue" placeholder="0" required>
                <p class="text-right" data-total="0" id="totalAmount">total : ¥0</p> 
            </div>
        </div>
        <div class="full-width d-flex justify-content-between">
            
            
            <div class="col-6 pr-0">
                <button id="back-btn" class="btn btn-outline-primary col-12 new-btn" type="submit">Go Back</button>
            </div>
            <div class="col-6 pr-0">
                <button id="purchase-btn" class="btn btn-primary col-12 login-btn" type="submit">Purchase</button>
            </div>
        </div>
    </div>
    `
    
    container.append(itemDetail, purchaseForm);
    return container;
}

function createItem(item) {
    let container = document.createElement("a");
    container.href = "javascript:void(0)";
    container.id = "item";
    container.classList.add("d-block", "bg-secondary", "mb-1", "d-flex", "flex-wrap", "align-items-center", "justify-content-center");
    
    let imgCon = document.createElement("div");
    imgCon.classList.add("col-4");
    imgCon.innerHTML = `
    <div class="col-12 mx-auto py-3">
        <img src="${item.imgUrl}" width="200" height="200" class="img-fluid" alt="">
    </div>
    `;
    
    let itemInfoCon = document.createElement("div");
    itemInfoCon.classList.add("col-8", "text-left", "text-white");
    
    let type = item.type == "ability" ? "click" : "sec";
    itemInfoCon.innerHTML = 
    `
    <div class="py-4">
        <div class="d-flex justify-content-between">
            <h4>${item.name}</h4>
            <h4 id="item-stock" data-stock="${item.stock}">${item.stock}</h4>
        </div>
        <div class="d-flex justify-content-between">
            <p class="text-left" id="itemPrice" data-price="${item.price}">¥${item.price}</p>
            <p class="text-success text-right">¥${item.getPrice} /${type}</p>
        </div>
    </div>
    `;
    
    container.append(imgCon, itemInfoCon);
    return container;
}

function save(userAccount){
    let data = {
        mainData : config.mainPage.innerHTML,
        account : userAccount
    };

    localStorage.setItem(userAccount.name, JSON.stringify(data));
    alert("保存しました。");
    displayBlock(config.initialForm);
    config.mainPage.innerHTML = "";
}

function reset(){
    let result = window.confirm("データをリセットしても良いですか?");
    if (result) {
        config.mainPage.innerHTML = "";
        initializeUserAccount();
        return true;
    }
    else return false;
}

function isBuy(userAccount){
    let numBox = document.getElementById("purchaseValue");
    let itemPrice = parseInt(numBox.value) * parseInt(numBox.getAttribute("data-price"));
    if(userAccount.money >= itemPrice) {
        userAccount.money -= itemPrice;
        return true;
    }
    else {
        alert("You don't have enough money");
        return false;
    }
}

function changePerClick(userAccount){
    userAccount.hamburger++;
    document.getElementById("burger").innerHTML = userAccount.hamburger + " Burger";
    userAccount.money += userAccount.addMoneyPerClick;
    document.getElementById("money").innerHTML = "¥ " + userAccount.money;
}

function changeMoneyPerClick(userAccount, item){
    let numBox = document.getElementById("purchaseValue");
    userAccount.addMoneyPerClick += item.getPrice * numBox.value;
}

function changeTotal(){
    let numBox = document.getElementById("purchaseValue");
    let total = document.getElementById("totalAmount");
    total.innerHTML = `total: ¥${parseInt(numBox.value) * parseInt(numBox.getAttribute("data-price"))}`;
    total.setAttribute("data-total", String(parseInt(numBox.value) * parseInt(numBox.getAttribute("data-price"))));
}