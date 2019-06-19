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

function formatCurrency(value){
    return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

function unFormatCurrency(value){
    return accounting.unformat(value);
}
function formatDate(date){
    return date.toLocaleString();
    
}

function addCart(idCart, counter) {

    if (isSupportLocalStorge) {

        let item = currentList.find((elm) => {
            return (elm.idCart === idCart)
        })

        let step = 0;
        if (item) {
            if (counter) {
                step =  counter - item.counter;
                item.counter = counter;
            } else {
                step = 1;
                item.counter++;
            }
        } else {
            item = {
                counter: 1,
                idCart: idCart
            }
            currentList.push(item);
        }
        qtyCart += step;
        document
            .getElementById('qtyCart')
            .innerHTML = "" + qtyCart;

        localStorage.setItem("listItemCart", JSON.stringify(currentList));
    }
}

function handleCart(id) {
    let url = '';
    let html = "";
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
            let total = 0;
            res.forEach(element => {

                currentList.forEach(elm => {
                    if (element._id === elm.idCart) {
                        total += (parseInt(element.price) * parseInt(elm.counter));
                        let price = formatCurrency(element.price);
                        html += `
                <div class="product-widget">
                    <div class="product-img">
                        <img src="/images/${element.image}" alt="">
                    </div>
                    <div class="product-body">
                        <h3 class="product-name">
                            <a href="/product/detail/${element._id}">${element.name}</a>
                        </h3>
                        <h4 class="product-price">
                            <span class="qty">${elm.counter}x</span>${price}</h4>
                    </div>
                </div>`;
                        return;
                    }
                });
            });
            total = formatCurrency(total);

            $('#cart-summary').html(`<h5>Tổng cộng: ${total}</h5>`)

            $('#list_product').html(html);
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
            let idx = 0;
            res.forEach(element => {
                currentList.forEach(elm => {
                    if (element._id === elm.idCart) {
                        let sumItem = element.price * parseInt(elm.counter);
                        total += sumItem;
                        sumItemFormat = formatCurrency(sumItem);
                        let price = formatCurrency(element.price);
                        html += `<tr class="td-save-${idx}" id="${element._id}">
                        <td>
                            <div>
                                <a href="/product/detail/${element._id}"><img src="/images/${element.image}" alt="" style="width: 150px" /></a>
                                <a href="/product/detail/${element._id}" style="font-weight: 500"> ${element.name}</a>
                            </div>
                        </td>
                        <td id="price-${idx}" class="${element.price}">
                            ${price}
                        </td>
                        <td>
                            <div class="product_count">
                                <input type="number" name="qty" id="${idx}" maxlength="12" value="${elm.counter}"
                                    title="Quantity:" class="input-text qty btn-inc-dec-product" min="1"></div>
                        </td>
                        <td id="sub-total-${idx}" class="${sumItem}">
                            ${sumItemFormat}
                        </td>
                        <td>
                            <button class="btn del-btn" style="background-color: transparent" id="del-btn-${idx}">
                                <span style="color: Tomato;">
                                    <i id="delete" class="fa fa-trash-o fa-2x"></i>
                                </span>
                            </button>
                            
                        </td>
                    </tr>`;
                        return;
                    }
                });

                idx++;
            });
            totalFomart = formatCurrency(total);
            html += `<tr>
                        <td colspan="3" style="text-align: right; font-weight: bold; padding-right: 18px">Tổng
                            cộng</td>
                        <td colspan="2" id="id-order-total" class="${total}">
                            ${totalFomart}
                        </td>

                    </tr>`;

            $('#cartProducts').html(html);
            let btnPay = `<a href="/users/checkout" class="primary-btn">Thanh toán</a>`
            $("#wrapBtnPay").html(btnPay)
        }
    });
});

//dele button
$(document).ready(function (){
    $('.del-btn').on('click', function(e){
        let id = $(this).attr('id').split('-')[2];
        id = parseInt(id);
        console.log(id);
        console.log(currentList.splice(id, 1));
        localStorage.setItem('listItemCart', JSON.stringify(currentList));
        window.location.reload();
    })
});
//pagination comment
$(document).ready(function () {
    let id = window.location.pathname.split('/')[3];

    if ($('#commentsPagination').length == 0) {
        return;
    }

    $('#commentsPagination').pagination({
        dataSource: `http://localhost:3000/api/get-comments?id=${id}`,
        //dataSource: `/api/get-comments?id=${id}`,        
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
                let date = elm.createdAt;
                date = formatDate(date);
                html += `<li>
                    <div class="review-heading">
                        <h5 class="name">${elm.name}</h5>
                        <p class="date">${date}</p>
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

//pagination store
$(document).ready(function () {
    let type = window.location.pathname.split('/')[2];
    let id = window.location.pathname.split('/')[3];

    if ($('#pagination-store').length == 0) {
        return;
    }

    $('#pagination-store').pagination({
        dataSource: `http://localhost:3000/api/store-pagination?name=${type}&id=${id}`,
        //dataSource: `/api/store-pagination?name=${type}&id=${id}`,
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
                let price = formatCurrency(elm.price);
                html += `
                <div class="col-md-4 col-xs-6">
                    <div class="product">
                        <a href="/product/detail/${elm._id}" class="product-detail-href">
                        <div class="product-img">
                            <img style="height: 130px" src="/images/${elm.image}" alt="">
                        </div>
                        <div class="product-body">
                            <p class="product-category">${elm.categoryCode.name} - ${elm.brandCode.name}</p>
                            <h3 class="product-name"><a href="/product/detail/${elm._id}">${elm.name}</a></h3>
                            <h4 class="product-price">${price}</h4>
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
                        sumItem = formatCurrency(sumItem);

                        html += `<div class="order-col">
                                    <div>${elm.counter} x ${element.name}</div>
                                    <div>${sumItem}</div>
                                </div>`;
                        let product = {
                            idProduct: elm.idCart,
                            nameProduct: element.name,
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
            console.log("history", typeof historyJson);
            total = formatCurrency(total);
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

$(document).ready(function () {
    $(".btn-inc-dec-product").on('change', function (e) {
        const idx = $(this).attr('id');
        const id = $(`.td-save-${idx}`).attr('id');
        let counter = parseInt($(this).val());
        let price = $(`#price-${idx}`).attr('class');
        price = parseInt(price);

        let subTotal = $(`#sub-total-${idx}`).attr('class');
        subTotal = parseInt(subTotal);

        let orderTotal = $('#id-order-total').attr('class');
        orderTotal = parseInt(orderTotal);

        let newSubTotal = price * counter;
        orderTotal += (newSubTotal - subTotal);

        newSubTotal = formatCurrency(newSubTotal);
        orderTotal = formatCurrency(orderTotal);

        $(`#sub-total-${idx}`).html(newSubTotal);
        $('#id-order-total').html(orderTotal);

        addCart(id, counter);
    });
});