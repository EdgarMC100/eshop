// document.addEventListener('DOMContentLoaded',function name(params) {

// })

var tbody = document.getElementById('t-body');
let thead = document.getElementsByClassName('t-head')[0];
console.log(thead);
let btnOrder = document.getElementById('orders');
let endpoint = "https://eshop-deve.herokuapp.com/api/v2/orders";

async function getOrders(endpoint) {
    try {
        const response = await fetch(endpoint, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkM2NIVUVibVJoc1EzeXhNbzV2VnliSTFzaDZCSDJZRCIsImlhdCI6MTU4NTkzMjYzNDU0OH0.tMSht_M3ryQl5IqCirhYR1gb8j3FQ26vILT4Qpx4XrdFz-zUmqbgFYiKTaZHPpB85etRIMhxVoZf6tOrHy0fnA'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          });
    } catch (error) {
        console.log(error)
    }


    return response.json();
}

function generateStaticOrders(){
    while(tbody.hasChildNodes()){
        console.log(tbody.removeChild(tbody.childNodes[0]));
    }
    console.log(tbody.children.removeChild);
    const data = [{
        "id":123456,"items":4, 
        "creation-date":"2020-09-20",
        "shipping-method":"Castores tierra",
        "id-detaill":123456
    },
    {
        "id":123456,"items":4, 
        "creation-date":"2020-09-20",
        "shipping-method":"Castores tierra",
        "id-detaill":123456
    },
    {
        "id":123456,"items":4, 
        "creation-date":"2020-09-20",
        "shipping-method":"Castores tierra",
        "id-detaill":123456
    }];   
    const options = {
        // valueNames: ['id'],
        // item: '<tr><td class="id"></td></tr>'
        valueNames: [ 'id', 'items','creation-date','shipping-method','id-detaill'],
        item: '<tr><td class="id"></td> <td class="items"></td> <td class="creation-date"></td> <td class="shipping-method"></td> <td><a class="id-detaill"></a></td> <tr>'
    };
    let userList = new List('orders2', options);
    userList.add(data);

}
function addOrdersToTable(order) {
    btnOrder.style.background = "#ddb550"
    var patt = /^\d+-\d+-\d+/;
    var creationDate = patt.exec(order.dates.createdAt)[0];
    var arrayFields = [order.id,order.items.length,creationDate,order.shippingMethod,order.id];
    let tr = document.createElement('tr');
    // console.log(arrayFields);
    for (let index = 0; index < arrayFields.length; index++) {
        let td = document.createElement('td');
        let textNode = document.createTextNode(arrayFields[index]);
        td.appendChild(textNode);
        td.style.paddingRight = "70px";
        if(index==0){
            td.classList.add("id")
        }else if(index == 1){
            td.style.paddingRight = "65px";
        }else if(index==2){
            td.style.paddingRight = "20px";
            td.classList.add("creation-date")
        }else if(index == 4){
            let anchorElement = document.createElement('a');
            anchorElement.id = arrayFields[index];
            anchorElement.href = '#'
            anchorElement.appendChild(document.createTextNode('details'))
            td.removeChild(textNode);
            td.appendChild(anchorElement);
            td.style.paddingRight = "65px"
            //
            tr.appendChild(td);
            break;
        }
        tr.appendChild(td);

    }
    tbody.appendChild(tr);
    // let textNode = document.createTextNode(order.id);
    // let textNodeItems = document.createTextNode(order.items.count());
    // td.appendChild(textNode);
    // tr.appendChild(td);
    // tr.appendChild()

    // console.log(order.id);
}
function processData(orders) {
    // let data1 = {orders:[{},{}]};
    for (let index = 0; index < orders.length; index++) {
        addOrdersToTable(orders[index]);
    }
}
function fillList(endpoint) {
    console.log('enter');
    getOrders(endpoint).then(function(data){
        // console.log(data);
        // tr.appendChild(td)
        // console.log(tr);
        // console.log(td);
        processData(data.orders.reverse());

        // console.log(data)
    },function(error){
        console.log('HO');
        console.log(error);
    });
}
function customizeOrders(orders){
    const patt = /^\d+-\d+-\d+/;
    let creationDate = "";
    let objectArrayCustomized = [];

    orders.forEach(order => {
        creationDate = patt.exec(order.dates.createdAt)[0];
        objectArrayCustomized.push({"id": parseInt(order.id),"items":order.items.length,"creation-date":creationDate,"shipping-method":order.shippingMethod,"id-detaill": order.id});
    });
    return objectArrayCustomized;
}


function fillListJs(endpoint) {
    let values = [
        {
          name: 'Jonny Strömberg',
          born: 1986
        },
        {
          name: 'Jonas Arnklint',
          born: 1985
        },
        {
          name: 'Martina Elm',
          born: 1986
        }
      ];
    getOrders(endpoint).then(function(data) {
            let customizedObjects = customizeOrders(data.orders);
            console.log(customizedObjects)
            const options = {
                // valueNames: ['id'],
                // item: '<tr><td class="id"></td></tr>'
                valueNames: [ 'id', 'items','creation-date','shipping-method','id-detaill'],
                item: '<tr><td class="id"></td> <td class="items"></td> <td class="creation-date"></td> <td class="shipping-method"></td> <td><a class="id-detaill"></a></td> <tr>'
            };
            let userList = new List('orders2', options);
            userList.add(customizedObjects);
            // userList.add({id:'3'});
    },function (error) {
        console.log(error);
    })
}

// btnOrder.addEventListener('click',fillList(endpoint));
btnOrder.addEventListener('click',function(){
    // fillList(endpoint);
    generateStaticOrders();
});