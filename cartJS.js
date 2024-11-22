const productInCart = document.querySelector('.product-in-cart');
const orderHistory = document.querySelector('.orderHistory');
const statusSection = document.querySelector('.status-section');

function thayDoiLuaChonLeftMenu(activeElement, inactiveElement, showStatus = false) {
    activeElement.classList.add('selected');
    inactiveElement.classList.remove('selected');
    statusSection.style.display = showStatus ? 'block' : 'none';
}

productInCart.addEventListener('click', () => {
    thayDoiLuaChonLeftMenu(productInCart, orderHistory, false);
});

orderHistory.addEventListener('click', () => {
    thayDoiLuaChonLeftMenu(orderHistory, productInCart, true);
});

// Thay đổi lựa chọn trong lịch sử giao hàng
const statusItems = [
    document.querySelector('.status-success'),
    document.querySelector('.status-pending'),
    document.querySelector('.status-canceled')
]

function thayDoiLuaChonHistoryLM(activeElement) {
    statusItems.forEach(item => {
        if (item === activeElement) {
            item.classList.add('selected-orderHistory');
        }
        else item.classList.remove('selected-orderHistory');
    })
}

statusItems.forEach(item => {
    item.addEventListener('click', () => {
        thayDoiLuaChonHistoryLM(item);
    })
})

// Thêm bớt sản phẩm và tính tiền tổng của 1 sản phẩm
function tongTien1SP(orderItem, book) {
    const totalPrice1Item = orderItem.querySelector('.total-price');
    let totalPrice = book.quantity * book.price;

    book.totalPrice1Item = totalPrice;
    totalPrice1Item.textContent = totalPrice.toLocaleString('vi-VN') + 'đ';
}
function themBotSanPham(btn) {
    const quantityProduct = btn.parentElement.querySelector('input[id = "quantity"]');

    const bookName = btn.parentElement.parentElement.querySelector('.product-descript a').textContent;
    const book = books.find(b => b.name === bookName);

    if (btn.classList.contains('increase-btn')) {
        quantityProduct.value++;
    } else if (btn.classList.contains('decrease-btn') && quantityProduct.value > 1) {
        quantityProduct.value--;
    }

    book.quantity = quantityProduct.value;
    tongTien1SP(btn.parentElement.parentElement, book);
}

// Làm việc với mảng chứa các sách
var books = [
    { productId: 40, img: 'assets/images/sanpham40.webp', cateory: 'tinhcam', name: 'Vẽ em bằng màu nội nhớ', price: 220000 },
    { productId: 41, img: 'assets/images/sanpham41.webp', cateory: 'tinhcam', name: 'kiếp nào ta cũng tìm thấy nhau', price: 250000 },
    { productId: 42, img: 'assets/images/sanpham42.webp', cateory: 'lich su', name: 'các triều đại Việt Nam', price: 290000 },
    { productId: 43, img: 'assets/images/sanpham43.webp', cateory: 'tinhcam', name: 'Ngày xưa có một chuyện tình', price: 270000 }
]
// var books = JSON.parse(localStorage.getItem('product'));
function addQuantity() {
    for (let i = 0; i < books.length; i++) {
        books[i].quantity = 1;
        books[i].totalPrice1Item = books[i].price;
    }
}
addQuantity();

function displayOrderItems() {
    var s = "";
    for (let i = 0; i < books.length; i++) {
        s += `
                <div class="order-item">
                    <div><input class="select-1" type="checkbox"></div>
                    <div class="text-size product-descript">
                        <img src="` + books[i].img + `">
                        <a>`+ books[i].name + `</a>
                    </div>
                    <div class="text-size other">` + books[i].price.toLocaleString('vi-VN') + `đ</div>
                    <div class="text-size other alter-quantity">
                        <button class="text-size decrease-btn" onclick = "themBotSanPham(this)">-</button>
                        <input type="number" id="quantity" value="${books[i].quantity}"  readonly>
                        <button class="text-size increase-btn" onclick = "themBotSanPham(this)">+</button>
                    </div>
                    <div class="text-size other">
                        <span class = "total-price">` + books[i].price.toLocaleString('vi-VN') + `đ</span>
                    </div>

                </div>`
    }
    document.querySelector('.cart-section .orderItems-list').innerHTML = s;
}


// Chọn từng sản phẩm hoặc tất cả để xóa hoặc mua
let productIsPayOrDel = [];


const selectAll = document.getElementById('select-all');
const select1 = document.getElementsByClassName('select-1');

function nangCapChonTatCa() { //khi chọn từng cái sản phẩm 1/ khi chọn hết rồi thì checkbox của chọn tất cả = true
    let allChecked = true;    //                           2/ khi bỏ chọn 1 sản phẩm khi đang chọn tất cả thì ctc = false
    for (let i = 0; i < select1.length; i++) {
        if (!select1[i].checked)
            allChecked = false;
    }
    selectAll.checked = allChecked;
}

function chon1SanPham(selection) {
    let bookName = selection.parentElement.parentElement.querySelector('.product-descript a').textContent;
    let book = books.find(book => book.name === bookName);

    if (selection.checked) productIsPayOrDel.push(book);
    else {
        let index = productIsPayOrDel.findIndex(product => product.name === bookName);
        productIsPayOrDel.splice(index, 1);
    }
}


function chonTatCa() {
    if (selectAll.checked) productIsPayOrDel = Array.from(books);
    else productIsPayOrDel = [];

    for (let i = 0; i < select1.length; i++) {
        select1[i].checked = selectAll.checked;
    }
}



function ganSuKienChoCheckbox() {
    const select1 = document.getElementsByClassName('select-1');
    for (let i = 0; i < select1.length; i++) {
        select1[i].addEventListener('click', () => {
            chon1SanPham(select1[i]);
        });

        select1[i].addEventListener('click', nangCapChonTatCa);
    }
}


displayOrderItems();
ganSuKienChoCheckbox();


function closeAlertNotSelect() {
    document.querySelector('.modal').classList.add('modal-hidden');
    document.querySelector('.modal .alert-cart').classList.add('hidden');
}
function openAlertNotSelect(word) {
    let modal = document.querySelector('.modal');
    const alertModalBuy = modal.querySelector('.message');
    alertModalBuy.textContent = `Bạn vẫn chưa chọn sản phẩm để ${word}`;
    document.querySelector('.modal').classList.remove('modal-hidden');
    document.querySelector('.modal .alert-cart').classList.remove('hidden');
}

function muaHang() {
    if (productIsPayOrDel.length === 0) {
        openAlertNotSelect("mua");
        return;
    }

    thanhToan();
}

function xoaKhoiGioHang() {
    if (productIsPayOrDel.length === 0) {
        openAlertNotSelect("xóa");
        return;
    }

    productIsPayOrDel.forEach(product => {
        let index = books.findIndex(book => book.name === product.name);
        books.splice(index, 1);
    });

    productIsPayOrDel.length = 0;
    displayOrderItems();
    ganSuKienChoCheckbox();
}


var address = [
    { fullName: 'Tăng Huỳnh Quốc Khánh', numberPhone: '012345XXXX', }
]






function thanhToan() {
    // Ẩn phần giỏ hàng
    document.querySelector('.cart-section').classList.add('hidden');
    document.querySelector('.footer-cart-actions').classList.add('hidden');

    // Hiển thị phần thanh toán
    document.querySelector('.checkout-section').classList.remove('hidden');
    displayOrderItemsIsPayed();
}


function quayLaiGioHang() {
    // Ẩn phần thanh toán
    document.querySelector('.checkout-section').classList.add('hidden');

    // Hiển thị phần giỏ hàng 
    document.querySelector('.cart-section').classList.remove('hidden');
    document.querySelector('.footer-cart-actions').classList.remove('hidden');
}




function displayOrderItemsIsPayed() {
    var s = "";
    for (let i = 0; i < productIsPayOrDel.length; i++) {
        s += `
                <div class="order-item">
                    <div class="text-size product-descript">
                        <img src="` + productIsPayOrDel[i].img + `">
                        <a>`+ productIsPayOrDel[i].name + `</a>
                    </div>
                    <div class="text-size other">` + productIsPayOrDel[i].price.toLocaleString('vi-VN') + `đ</div>
                    <div class="text-size other alter-quantity">` + productIsPayOrDel[i].quantity + `</div>
                    <div class="text-size other">
                        <span class = "total-price">` + productIsPayOrDel[i].totalPrice1Item.toLocaleString('vi-VN') + `đ</span>
                    </div>

                </div>`
    }
    document.querySelector('.product-is-payed .orderItems-list').innerHTML = s;
}

