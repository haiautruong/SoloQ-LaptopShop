var isSupportLocalStorge = typeof (Storage)
    ? true
    : false;
let qtyCart = 0;
let currentList = localStorage.getItem("listItemCart")
    ? JSON.parse(localStorage.getItem('listItemCart'))
    : [];
currentList.forEach(elm => {
    qtyCart += elm.counter;
})
document
    .getElementById('qtyCart')
    .innerHTML = "" + qtyCart;
// --------------------------------

function addCart(idCart) {
    if (isSupportLocalStorge) {

        let item = currentList.find((elm) => {
            return (elm.idCart === idCart)
        })

        if (item) {
            item.counter++;
        } else {
            item = {
                counter: 1,
                idCart: idCart
            }
            currentList.push(item);
        }

        qtyCart++;
        document
            .getElementById('qtyCart')
            .innerHTML = "" + qtyCart;
        console.log(currentList);
        localStorage.setItem("listItemCart", JSON.stringify(currentList));
    }
}

function handleCart(id) {
    let url = '';
    let total = "";
    let currentList = localStorage.getItem("listItemCart")
        ? JSON.parse(localStorage.getItem('listItemCart'))
        : [];

    let test = localStorage.getItem("listItemCart");
    console.log(typeof (test));
    console.log(currentList);

    let myRes;

    $.ajax({
        type: 'GET',
        url: '/api/get-products',
        data: {
            list_products: currentList
        },
        async: false,
        success: (res, status) => {
            myRes = res;
            res.forEach(element => {
                currentList.forEach(elm => {
                    console.log("elm", elm)
                    if (element._id === elm.idCart) {
                        total += `
                <div class="product-widget">
                    <div class="product-img">
                        <img src="/images/${element.image}" alt="">
                    </div>
                    <div class="product-body">
                        <h3 class="product-name">
                            <a href="/product/detail/${element._id}">product name goes here</a>
                        </h3>
                        <h4 class="product-price">
                            <span class="qty">${elm.counter}x</span>${element.price}</h4>
                    </div>
                    <button class="delete">
                        <i class="fa fa-close"></i>
                    </button>
                </div>`;
                    }
                })

            });

            $('#list_product').html(total);
        }
    });

}

let categoryCode = function test(id) {

    console.log("AbC", id);

    return id;
}

$(document).ready(function () {
    let idCategory = window.location.pathname.split('/')[2];
    // console.log(idCategory);
    // console.log(window.location.pathname);
    // var test = $('#test').find('.magic').attr('id');
    // console.log(test);


    $('#pagination-store').pagination({
        dataSource: `http://localhost:3000/api/store-pagination/${idCategory}`,
        locator: 'products',
        totalNumberLocator: function (response) {
            return response.total;
        },
        pageSize: 3,
        ajax: {
            beforeSend: function () {
                $('#store-products').html('Loading data ...');
            }
        },
        callback: function (data, pagination) {
            console.log(data);
            console.log("pagination", pagination);
            let pageContent = data;
            let html = "";
            pageContent.forEach(elm => {
                console.log("paging-product: ", elm);
                html += `
                <div class="col-md-4 col-xs-6">
                    <div class="product">
                        <div class="product-img">
                            <img style="height: 200px" src="/images/${elm.image}" alt="">
                        </div>
                        <div class="product-body">
                            <p class="product-category">${elm.categoryCode.name}</p>
                            <h3 class="product-name"><a href="#">${elm.name}</a></h3>
                            <h4 class="product-price">${elm.price}</h4>
                            <div class="product-btns">
                                <button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">xem ngay</span></button>
                            </div>
                        </div>
                        <div class="add-to-cart">
                            <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> thêm vào
                                giỏ</button>
                        </div>
                    </div>
                </div>`;
            })
            $('#store-products').html(html);
        }
    })
})
