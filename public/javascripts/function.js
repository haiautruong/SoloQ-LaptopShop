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

    let myRes;

    $.ajax({
        type: 'GET',
        url: '/api/get-products',
        data: {
            list_products: currentList
        },
        async: false,
        success: (res, status) => {

            res.forEach(element => {
                currentList.forEach(elm => {

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
                        return;
                    }
                });

            });

            $('#list_product').html(total);
        }
    });

}

function pay() {
    console.log('payyy');
    localStorage.clear();
}

//cart
$(document).ready(function () {
    let pathname = window.location.pathname;
    if (pathname !== '/users/cart') {
        return;
    }

    console.log("in carttttt");

    let html = "";
    let currentList = localStorage.getItem("listItemCart")
        ? JSON.parse(localStorage.getItem('listItemCart'))
        : [];


    $.ajax({
        type: 'GET',
        url: '/api/get-products',
        data: {
            list_products: currentList
        },
        async: false,
        success: (res, status) => {
            let total = 0;
            res.forEach(element => {
                currentList.forEach(elm => {

                    if (element._id === elm.idCart) {
                        let sumItem = element.price * parseInt(elm.counter);
                        total += sumItem;
                        console.log(sumItem)
                        html += `<tr>
                        <td>
                            <div>
                                <img src="/images/${element.image}" alt="" style="width: 150px" />
                                <span style="font-weight: 500">${element.name}</span>
                            </div>
                        </td>
                        <td>
                            ${element.price}
                        </td>
                        <td>
                            <div class="product_count">
                                <input type="number" name="qty" id="sst" maxlength="12" value="${elm.counter}"
                                    title="Quantity:" class="input-text qty"></div>
                        </td>
                        <td>
                            ${sumItem}
                        </td>
                        <td>
                            <button class="btn" style="background-color: transparent">
                                <span style="color: Tomato;">
                                    <i id="delete" class="fa fa-trash-o fa-2x"></i>
                                </span>
                            </button>
                            
                        </td>
                    </tr>`;
                        return;
                    }
                });

            });

            html += `<tr>
                        <td colspan="3" style="text-align: right; font-weight: bold; padding-right: 18px">Tổng
                            cộng</td>
                        <td colspan="2">
                            ${total}
                        </td>

                    </tr>`;

            $('#cartProducts').html(html);
            let btnPay = `<a href="/users/checkout" class="primary-btn">Thanh toán</a>`
            $("#wrapBtnPay").html(btnPay)
        }
    });
});

//pagination store
$(document).ready(function () {
    let id = window.location.pathname.split('/')[3];

    if ($('#commentsPagination').length == 0) {
        return;
    }

    $('#commentsPagination').pagination({
        dataSource: `http://localhost:3000/api/get-comments?id=${id}`,
        locator: 'comments',
        totalNumberLocator: function (response) {
            return response.total;
        },
        pageSize: 2,
        ajax: {
            beforeSend: function () {
                console.log("get commments call");
                $('#listComments').html('Loading data ...');
            }
        },
        callback: function (data, pagination) {
            console.log(data);
            console.log("pagination", pagination);
            let pageContent = data;
            let html = "";
            pageContent.forEach(elm => {
                let starHtml = "";

                for (let i = 1; i <= elm.rating; i++) {
                    starHtml += `<i class="fa fa-star"></i>`;
                }
                for (let i = elm.rating + 1; i <= 5; i++) {
                    starHtml += `<i class="fa fa-star-o empty"></i>`;
                }

                html += `<li>
                    <div class="review-heading">
                        <h5 class="name">${elm.name}</h5>
                        <p class="date">${elm.createdAt}</p>
                        <div class="review-rating">
                            ${starHtml}
                        </div>
                    </div>
                    <div class="review-body">
                        <p>${elm.comment}</p>
                    </div>
                </li>`;
            })
            $('#listComments').html(html);
        }
    });

});

//pagination comment
$(document).ready(function () {
    let type = window.location.pathname.split('/')[2];
    let id = window.location.pathname.split('/')[3];

    if ($('#pagination-store').length == 0) {
        return;
    }

    $('#pagination-store').pagination({
        dataSource: `http://localhost:3000/api/store-pagination?name=${type}&id=${id}`,
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
                        <a href="/product/detail/${elm._id}" class="product-detail-href">
                        <div class="product-img">
                            <img style="height: 200px" src="/images/${elm.image}" alt="">
                        </div>
                        <div class="product-body">
                            <p class="product-category">${elm.categoryCode.name} - ${elm.brandCode.name}</p>
                            <h3 class="product-name"><a href="/product/detail/${elm._id}">${elm.name}</a></h3>
                            <h4 class="product-price">${elm.price}</h4>
                            <div class="product-btns">
                                <button class="quick-view"><i class="fa fa-eye"></i><span class="tooltipp">xem ngay</span></button>
                            </div>
                        </div>
                        <div class="add-to-cart">
                            <button class="add-to-cart-btn"><i class="fa fa-shopping-cart" id=${elm._id} onclick="addCart(this.id)"></i> thêm vào
                                giỏ</button>
                        </div>
                        </a>
                    </div>
                </div>`;
            })
            $('#store-products').html(html);
        }
    });

});

//checkout
$(document).ready(function () {
    let pathname = window.location.pathname;
    if (pathname !== '/users/checkout') {
        return;
    }
    console.log("in payyyyy");
    let currentList = localStorage.getItem("listItemCart")
        ? JSON.parse(localStorage.getItem('listItemCart'))
        : [];

    if (currentList.length === 0) {
        console.log("null");
        htmlEmpty = `<p>Giỏ hàng chưa có sản phẩm</p>`;
        $("#order").html(htmlEmpty);
        return;
    }
    
    
    let html = `<div class="order-summary">
                    <div class="order-col">
                        <div><strong>SẢN PHẨM</strong></div>
                        <div><strong>TỔNG CỘNG</strong></div>
                    </div>
                    <div class="order-products">`;


    $.ajax({
        type: 'GET',
        url: '/api/get-products',
        data: {
            list_products: currentList
        },
        async: false,
        success: (res, status) => {
            let history = {
                listProducts: [],
                total: 0,
            }
            let total = 0;
            res.forEach(element => {
                currentList.forEach(elm => {

                    if (element._id === elm.idCart) {
                        let sumItem = element.price * parseInt(elm.counter);
                        total += sumItem;
                        console.log(sumItem)
                        html += `<div class="order-col">
                                    <div>${elm.counter} x ${element.name}</div>
                                    <div>${sumItem}</div>
                                </div>`;
                        let product = {
                            idProduct: elm.idCart,
                            quantity: elm.counter,
                            price: element.price 

                        }
                        history.listProducts.push(product);
                        return;
                    }
                });
            });
            history.total = total;
            let historyJson = JSON.stringify(history).toString();
            console.log("history",typeof historyJson);

            html += `</div>
                    <div class="order-col">
                        <div>Phí vận chuyển</div>
                        <div><strong>MIỄN PHÍ</strong></div>
                    </div>
                    <div class="order-col">
                        <div><strong>TỔNG CỘNG</strong></div>
                        <div><strong class="order-total">${total}</strong></div>
                    </div>
                </div>
                <div class="payment-method">
                    <div class="input-radio">
                        <input type="radio" name="payment" id="payment-1" checked>
                        <label for="payment-1">
                            <span></span>
                            Thanh toán khi nhận hàng
                        </label>
                    </div>
                </div>
                <button type="submit" onclick="pay()" class="primary-btn order-submit form-control" style="padding-bottom: 50px">Đặt hàng</button>
                <input name="listProductPay" value='${historyJson}' readonly style="display: none">
            </div>`;

            $("#order").html(html);
        }
    });
});
