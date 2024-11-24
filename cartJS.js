let userLogin = {};
let addressInfoList = [];
let address2Deliver = {};
// Đóng ô chọn địa chỉ
function closeSelectAddress() {
    document.querySelector('.modal').classList.add('modal-hidden');
    document.querySelector('.select-address').classList.add('hidden');

}
// Mở ô chọn địa chỉ 
function openSelectAddress() {
    document.querySelector('.modal').classList.remove('modal-hidden');
    document.querySelector('.select-address').classList.remove('hidden');

    displayAddressInfoList();
    setupAddressSelection();
    getAddressBefore();
}

// Lấy dữ liệu từ User khi đăng nhập
function getLocalStorageUserLogin() {
    userLogin = JSON.parse(localStorage.getItem('userLogin'));
    document.querySelector('#idName').value = userLogin.fullname;
    document.querySelector('#idPhoneNumber').value = userLogin.phoneNumber;
    addressInfoList = [
        { userID: userLogin.userId, userFullName: userLogin.fullname, phoneNumber: userLogin.phoneNumber, addressDetail: userLogin.address1 },
    ];
    address2Deliver = addressInfoList[0];
    changeDeliveInfo();
}

// Hiển thị những địa chỉ có sẵn của user
function displayAddressInfoList() {
    let s = '';
    let behindS = `
        <div class="add-address-btn">
            <button onclick = "openAddNewAddress()">
                <i class=" fa-solid fa-plus"></i>Thêm Địa Chỉ Mới
            </button>
        </div>
    `;
    for (let i = 0; i < addressInfoList.length; i++) {
        s += `
        <div class="address-item">
            <div class="select-btn">
                <input type="radio" class = "select-btn-address">
            </div>

            <div class="address-info">
                <div class="user-basic-info">
                    <div class="userFullName">${addressInfoList[i].userFullName}</div>
                    <div class="distance"></div>
                    <div class="phoneNumber">${addressInfoList[i].phoneNumber}</div>
                </div>

                <div class="address-detail">${addressInfoList[i].addressDetail}</div>
            </div>
        </div>
        `
    }
    s += behindS;
    document.querySelector('.address-list').innerHTML = s;
}

// Tắt tất cả các selection đã chọn
function uncheckAllSelection(selections) {
    selections.forEach(select => {
        if (select.checked) {
            select.checked = false;
        }
    });

}

// Chọn địa chỉ này sẽ tắt checked của địa chỉ trước
function setupAddressSelection() {
    let selections = document.querySelectorAll('.select-btn-address');

    selections.forEach(select => {
        select.addEventListener('click', () => {
            uncheckAllSelection(selections);
            select.checked = true;
        });
    });
}

//Chọn địa chỉ và ấn hủy sẽ tự động chọn về cái trước đó
function getAddressBefore() {
    let selections = document.querySelectorAll('.select-btn-address');
    uncheckAllSelection(selections);

    selections.forEach(selection => {
        let addressDetail = selection.closest('.address-item').querySelector('.address-detail').textContent;
        if (addressDetail === address2Deliver.addressDetail) {
            selection.checked = true;
        }
    })
}

// Đổi địa chỉ ở chỗ thanh toán sau khi đã chọn 
function changeDeliveInfo() {
    let s = '';
    s += `
        <div class="buyer-info">${address2Deliver.userFullName} ` + ` ${address2Deliver.phoneNumber}</div>
        <div class="address-info">${address2Deliver.addressDetail}</div>
    `;

    s += `<button class="change-address" onclick="openSelectAddress()">Thay Đổi</button>`;
    document.querySelector('.checkout-section .delive-info').innerHTML = s;
}

// Lấy địa chỉ để giao        
function getAddress2Deliver() {            //Hàm này đúng rồi 
    let addresses = document.querySelectorAll('.select-btn-address');
    addresses.forEach(address => {
        if (address.checked) {
            let addressItem = address.closest('.address-item');

            let userFullName = addressItem.querySelector('.userFullName').textContent;
            let phoneNumber = addressItem.querySelector('.phoneNumber').textContent;
            let addressDetail = addressItem.querySelector('.address-detail').textContent;

            address2Deliver = {
                userFullName,
                phoneNumber,
                addressDetail,
            };
        }
    });
    changeDeliveInfo();
}


// Mở ô nhập địa chỉ mới
function openAddNewAddress() {
    document.querySelector('.add-address').classList.remove('hidden');
    document.querySelector('.select-address').classList.add('hidden');
}

// Đóng ô nhập địa chỉ mới
function closeAddNewAddress() {
    document.querySelector('.add-address').classList.add('hidden');
    document.querySelector('.select-address').classList.remove('hidden');
}


// Hiển thị tỉnh
function showProvinces() {
    let s = '<option value="0">Chọn Tỉnh / Thành phố</option>';
    let dataTinh_TP = JSON.parse(localStorage.getItem('Tinh_TP'));
    dataTinh_TP.forEach(tinhTP => {
        s += `
            <option value ="${tinhTP.TinhID}">${tinhTP.TinhName}</option>
        `;
    })
    document.querySelector('#provinces').innerHTML = s;
}
showProvinces();

// Lấy Id tỉnh để hiển thị huyện thuộc tỉnh đó
function getProvinceID() {
    let provinceID = document.querySelector('#provinces').value;
    showDistricts(provinceID);
}

// Hiển thị huyện sau khi chọn tỉnh
function showDistricts(provinceID) {
    let s = '<option value="0">Chọn Quận / Huyện</option>';
    let dataQuan_Huyen = JSON.parse(localStorage.getItem('Quan_Huyen'));
    dataQuan_Huyen.forEach(quanHuyen => {
        if (quanHuyen.TinhID === provinceID)
            s += `
            <option value="${quanHuyen.Quan_HuyenID}">${quanHuyen.Quan_HuyenName}</option>
        `;
    })

    document.querySelector('#districts').innerHTML = s;
}

function getDistrictID() {
    let districtID = document.querySelector('#districts').value;
    showWards(districtID);
}


// Hiển thị xã sau khi chọn 
function showWards(districtID) {
    let s = '<option value="0">Chọn Phường / Xã</option>';
    let dataPhuong_Xa = JSON.parse(localStorage.getItem('Phuong_Xa'));
    dataPhuong_Xa.forEach(phuongXa => {
        if (phuongXa.Quan_HuyenID === districtID) {
            s += `
                <option value="${phuongXa.PhuongID}">${phuongXa.PhuongName}</option>
            `;
        }
    })

    document.querySelector('#wards').innerHTML = s;
}

// Kiểm tra địa chỉ mới đã nhập đủ ch
function checkInfoNewAddress() {
    let address = document.getElementById('idAddress');
    let province = document.getElementById('provinces');
    let district = document.getElementById('districts');
    let ward = document.getElementById('wards');

    let provinceID = province.value;
    let districtID = district.value;
    let wardID = ward.value;

    if (address.value === '') {
        alert("Vui lòng nhập địa chỉ");
        address.focus();
        return;
    }
    if (province.value === '0') {
        alert("Vui lòng chọn tỉnh/thành phố");
        province.focus();
        return;
    }
    if (district.value === '0') {
        alert("Vui lòng chọn quận/huyện");
        district.focus();
        return;
    }
    if (ward.value === '0') {
        alert("Vui lòng chọn phường/xã");
        ward.focus();
        return;
    }
    saveNewAddress(provinceID, districtID, wardID);
}

/*Lấy tỉnh từ ID */
function getProvinceNameByID(id) {
    var Tinh = JSON.parse(localStorage.getItem('Tinh_TP'));
    if (id === '0') {
        return 'Chưa có';
    }
    for (var i = 0; i < Tinh.length; i++) {
        if (id === Tinh[i].TinhID) {
            return Tinh[i].TinhName;
        }
    }
}

/* Láy  Quận-huyện từ ID */
function getDistrictNameByID(id) {
    var Quan = JSON.parse(localStorage.getItem('Quan_Huyen'));
    if (id === '0') {
        return 'Chưa có';
    }
    for (var i = 0; i < Quan.length; i++) {
        if (id === Quan[i].Quan_HuyenID) {
            return Quan[i].Quan_HuyenName;
        }
    }
}

/* Lấy Phường từ id */
function getWardNameByID(id) {
    var Phuong = JSON.parse(localStorage.getItem('Phuong_Xa'));
    if (id === '0') {
        return 'Chưa có';
    }
    for (var i = 0; i < Phuong.length; i++) {
        if (id === Phuong[i].PhuongID) {
            return Phuong[i].PhuongName;
        }
    }
}

function saveNewAddress(provinceID, districtID, wardID) {
    let newAddress = [];
    newAddress.userID = userLogin.UserID;
    newAddress.userFullName = userLogin.fullname;
    newAddress.phoneNumber = userLogin.phoneNumber;
    newAddress.addressDetail = document.querySelector('#idAddress').value;

    let wardName = getWardNameByID(wardID);
    let districtName = getDistrictNameByID(districtID);
    let provinceName = getProvinceNameByID(provinceID);

    newAddress.addressDetail = document.querySelector('#idAddress').value +
        ", " + wardName + ", " + districtName + ", " + provinceName;

    addressInfoList.push(newAddress);

    closeAddNewAddress();
    displayAddressInfoList();
    setupAddressSelection();
    getAddressBefore();
    console.log("Lưu Địa Chỉ mới");
}
// End ADDRESS CART !!!!!




















// START CART
let orderSummary = {};
const productInCart = document.querySelector('.product-in-cart');
const orderHistory = document.querySelector('.orderHistory');
const continueShopping = document.querySelector('.back-mainPage');
function thayDoiLuaChonLeftMenu(activeElement, inactiveElement) {
    activeElement.classList.add('selected');
    inactiveElement.classList.remove('selected');
}

productInCart.addEventListener('click', () => {
    thayDoiLuaChonLeftMenu(productInCart, orderHistory);
    document.querySelector('.items-in-cart').classList.remove('hidden');
    document.querySelector('.history-in-cart').classList.add('hidden');
});

orderHistory.addEventListener('click', () => {
    thayDoiLuaChonLeftMenu(orderHistory, productInCart);
    document.querySelector('.items-in-cart').classList.add('hidden');
    document.querySelector('.history-in-cart').classList.remove('hidden');
});

continueShopping.addEventListener('click', () => {
    document.getElementById('backIndexHtml').click();
})

function addNoneOrderHistory() {
    if (localStorage.getItem('orderList') === null)
        document.querySelector('.none-orderHistory-list').classList.remove('hidden');
}
function closeNoneOrderHistory() {
    document.querySelector('.none-orderHistory-list').classList.add('hidden');
}
addNoneOrderHistory();
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
let productIsPayed = [];


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

    if (selection.checked) productIsPayed.push(book);
    else {
        let index = productIsPayed.findIndex(product => product.name === bookName);
        productIsPayed.splice(index, 1);
    }
}


function chonTatCa() {
    if (selectAll.checked) productIsPayed = Array.from(books);
    else productIsPayed = [];

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
    if (productIsPayed.length === 0) {
        openAlertNotSelect("mua");
        return;
    }

    thanhToan();
}
function deleteItem() {
    productIsPayed.forEach(product => {
        let index = books.findIndex(book => book.name === product.name);
        books.splice(index, 1);
    });
    productIsPayed.length = 0;
}

function xoaKhoiGioHang() {
    if (productIsPayed.length === 0) {
        openAlertNotSelect("xóa");
        return;
    }

    deleteItem();

    displayOrderItems();
    ganSuKienChoCheckbox();
}


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

function createOrderSummary() {
    orderSummary.FullName = address2Deliver.userFullName;
    orderSummary.Sdt = address2Deliver.phoneNumber;
    orderSummary.Address = address2Deliver.addressDetail;
    orderSummary.OrderDate = getDateNow();
    orderSummary.Status = "Chưa xác nhận";
    // Thuộc tính PaymentMethod sẽ được add vào sau khi chọn paymentMethod
}



function getTotalAmount(productList) {
    let totalAmount = 0;
    productList.forEach(product => {
        totalAmount += product.price * product.quantity;
    })
    totalAmount = totalAmount.toLocaleString('vi-VN');

    return totalAmount;
}


function displayOrderItemsIsPayed() {
    var s = "";
    for (let i = 0; i < productIsPayed.length; i++) {
        s += `
                <div class="order-item">
                    <div class="text-size product-descript">
                        <img src="` + productIsPayed[i].img + `">
                        <a>`+ productIsPayed[i].name + `</a>
                    </div>
                    <div class="text-size other">` + productIsPayed[i].price.toLocaleString('vi-VN') + `đ</div>
                    <div class="text-size other alter-quantity">` + productIsPayed[i].quantity + `</div>
                    <div class="text-size other">
                        <span class = "total-price">` + productIsPayed[i].totalPrice1Item.toLocaleString('vi-VN') + `đ</span>
                    </div>

                </div>`
    }

    s += `
        <div class = "summary">
            <div class = "total-amount">
                <div ><strong>Tổng Tiền: </strong></div>
                <div class = "text-total">${getTotalAmount(productIsPayed)}đ</div>
            </div> 
        </div> 
    `;
    document.querySelector('.product-is-payed .orderItems-list').innerHTML = s;
}


function setupPaymentSelection() {
    let selections = document.querySelectorAll('.select-checkout');

    selections.forEach(select => {
        select.addEventListener('click', () => {
            uncheckAllSelection(selections);
            select.checked = true;
        });
    });
}
setupPaymentSelection();

function showPaymentForm(method) {
    // Ẩn tất cả các form thanh toán
    const cashForm = document.querySelector('.cash-payment-form');
    const bankForm = document.querySelector('.bank-payment-form');
    const cardForm = document.querySelector('.card-payment-form');

    cashForm.classList.add('hidden');
    bankForm.classList.add('hidden');
    cardForm.classList.add('hidden');

    // Hiện form tương ứng với phương thức thanh toán đã chọn
    if (method === 'cash') {
        cashForm.classList.remove('hidden');
    } else if (method === 'bank-transfer') {
        bankForm.classList.remove('hidden');
    } else if (method === 'card') {
        cardForm.classList.remove('hidden');
    }
}

function checkInfoCardMethod() {
    let selectedMethod = document.querySelector('.select-checkout:checked').value;

    if (selectedMethod === 'card') {
        let cardNumber = document.getElementById('card-number');
        let cardExpiry = document.getElementById('card-expiry');
        let cardCvv = document.getElementById('card-cvv');

        if (!cardNumber.value) {
            alert("Vui lòng nhập số thẻ");
            cardNumber.focus();
            return false;
        }
        if (!cardExpiry.value) {
            alert("Vui lòng nhập ngày hết hạn");
            cardExpiry.focus();
            return false;
        }
        if (!cardCvv.value) {
            alert("Vui lòng nhập CVV");
            cardCvv.focus();
            return false;
        }
    }
    return true;
}

function hoanTatThanhToan() {
    let selectionsCheckout = document.querySelectorAll('.select-checkout');
    let haveSelect = false;
    selectionsCheckout.forEach(selection => {
        if (selection.checked) {
            haveSelect = true;
            orderSummary.PaymentMethod = selection.closest('.payment-option div').textContent.trim();
        }
    })

    if (!haveSelect) {
        alert("Vui lòng chọn phương thức thanh toán");
        return;
    }
    console.log(orderSummary.PaymentMethod);
    if (!checkInfoCardMethod()) return;
    closeCheckoutSection();
    closeNoneOrderHistory()
    createOrderSummary();
    displayOrderItemsSummary()
}

function closeCheckoutSection() {
    document.querySelector('.checkout-section').classList.add('hidden');
}


function getDateNow() {
    let today = new Date();
    let day = today.getDate().toString().padStart(2, '0');
    let month = (today.getMonth() + 1).toString().padStart(2, '0');
    let year = today.getFullYear();

    let currentDate = `${day}/${month}/${year}`;
    return currentDate;
}

function displayOrderSummary() {
    let userFullName = orderSummary.FullName;
    let userSDT = orderSummary.Sdt;
    let userAddress = orderSummary.Address;
    let orderDate = orderSummary.OrderDate;
    let statusText = orderSummary.Status;
    let paymentMethod = orderSummary.PaymentMethod;
    let s = `
    <h1>Tóm tắt đơn hàng</h1>

        <div class="buyer-info">
            <div class="title">Thông tin người mua:</div>
            <div class="section-content"><Strong>Tên:</Strong> ${userFullName}</div>
            <div class="section-content"><Strong>Số điện thoại:</Strong> ${userSDT}</div>
            <div class="section-content"><Strong>Địa chỉ:</Strong> ${userAddress}</div>
        </div>

        <div class="order-info">
            <div class="title">Thông tin đơn hàng:</div>
            <div class="section-content"><Strong>Ngày đặt hàng:</Strong> ${orderDate}</div>
            <div class="section-content"><Strong>Trạng thái:</Strong> ${statusText}</div>
            <div class="payment-method"><strong>Phương thức thanh toán:</strong> ${paymentMethod}</div>
            <div class="product-is-payed">
                <div class="product-table-header">
                    <div class="text-size product-descript">Sản Phẩm</div>
                    <div class="text-size other">Đơn Giá</div>
                    <div class="text-size other">Số Lượng</div>
                    <div class="text-size other">Số Tiền</div>
                        </div>

                <div class="orderItems-list">

                        </div>
                    </div>
                </div>

        
    `;


    document.querySelector('.order-summary').innerHTML = s;
}

function displayOrderItemsSummary() {

    displayOrderSummary();
    var s = "";
    for (let i = 0; i < productIsPayed.length; i++) {
        s += `
                <div class="order-item">
                    <div class="text-size product-descript">
                        <img src="` + productIsPayed[i].img + `">
                        <a>`+ productIsPayed[i].name + `</a>
                    </div>
                    <div class="text-size other">` + productIsPayed[i].price.toLocaleString('vi-VN') + `đ</div>
                    <div class="text-size other alter-quantity">` + productIsPayed[i].quantity + `</div>
                    <div class="text-size other">
                        <span class = "total-price">` + productIsPayed[i].totalPrice1Item.toLocaleString('vi-VN') + `đ</span>
                    </div>

                </div>`
    }

    s += `
        <div class = "summary">
            <div class = "total-amount">
                <div ><strong>Tổng Tiền: </strong></div>
                <div class = "text-total">${getTotalAmount(productIsPayed)}đ</div>
            </div> 
        </div> 
    `;
    document.querySelector('.order-summary .product-is-payed .orderItems-list').innerHTML = s;
    console.log(books);
    saveAsLocalStorage();
}

function saveAsLocalStorage() {
    let DonHang = JSON.parse(localStorage.getItem('orderList'));
    if (DonHang === null) DonHang = [];

    let new_DonHang = {
        OrderID: "N/A",
        UserID: address2Deliver.userID,
        FullName: address2Deliver.userFullName,
        Sdt: address2Deliver.phoneNumber,
        Address: address2Deliver.addressDetail.trim,
        OrderItems: productIsPayed,
        OrderDate: getDateNow(),
        Status: 0,
    };
    console.log(new_DonHang.OrderItems[0]);
    DonHang.push(new_DonHang);
    localStorage.setItem('orderList', JSON.stringify(DonHang));
}

// Hàm chuyển đổi trạng thái số thành chuỗi 
function getStatusLabel(status) {
    switch (status) {
        case 0: return "Chưa xử lý";
        case 1: return "Đã xử lý";
        case 2: return "Đã giao";
        case 3: return "Đã hủy";
        default: return "Không xác định";
    }
}

function displayOrderHistory() {
    let s = '';
    const orderHistoryList = JSON.parse(localStorage.getItem('orderList'));

    for (let i = 0; i < orderHistoryList.length; i++) {
        const order = orderHistoryList[i];
        let orderItems = '';
        let orderTotalPrice = 0;
        let orderStatus = getStatusLabel(order.Status);
        order.OrderItems.forEach(item => {
            orderItems += `${item.name} x ${item.quantity}, `;
            orderTotalPrice += item.quantity * item.price;
        });

        s += `
            <div class="orderHistory">
                <div>${order.OrderID}</div>

                <div class="product">
                    ${orderItems}
                </div>

                <div>${orderTotalPrice.toLocaleString('vn-VN') || 'N/A'}đ</div>
                <div>${orderStatus}</div>

                <div>
                    <button class = "btn-detail" onclick="viewOrderDetails(${order.OrderID})">Xem</button>
                </div>
            </div>
        `;
    }

    document.querySelector('.orderHistory-list').innerHTML = s;
}

function viewOrderDetails(orderId) {
    console.log(`Xem chi tiết đơn hàng với ID: ${orderId}`);
}
