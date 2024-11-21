function createProduct() {
    if (localStorage.getItem('product') === null) {
        var productArray = [
            { productId: 1, src: 'assets/images/sanpham1.webp', category: 'tuoitho', name: 'Tôi thấy hoa vàng trên cỏ xanh', price: 99000 },
            { productId: 2, src: 'assets/images/sanpham2.webp', category: 'kynangsong', name: '3 người thầy vỹ đại', price: 60000 },
            { productId: 3, src: 'assets/images/sanpham3.webp', category: 'kynangsong', name: 'nếu chỉ còn một ngày để sống', price: 200000 },
            { productId: 4, src: 'assets/images/sanpham4.webp', category: 'tuoitho', name: 'cây cam ngọt của tôi', price: 220000 },
            { productId: 5, src: 'assets/images/sanpham5.webp', category: 'kynangsong', name: 'đừng chỉ đẹp mà không hiểu chuyện', price: 139000 },
            { productId: 6, src: 'assets/images/sanpham6.webp', category: 'tinhcam', name: 'nhà nàng ở cạnh nhà tôi', price: 290000 },
            { productId: 7, src: 'assets/images/sanpham7.webp', category: 'chualanh', name: 'hiểu về trái tim', price: 99000 },
            { productId: 8, src: 'assets/images/sanpham8.webp', category: 'chualanh', name: 'trong con say níu sợi dây đứt', price: 230000 },
            { productId: 9, src: 'assets/images/sanpham9.webp', category: 'tinhcam', name: 'nàng và con mèo của nàng', price: 99000 },
            { productId: 10, src: 'assets/images/sanpham10.webp', category: 'kynangsong', name: 'nhà đầu tư vĩ đại', price: 260000 },
            { productId: 11, src: 'assets/images/sanpham11.webp', category: 'tuoitho', name: 'đi qua hoa cúc', price: 180000 },
            { productId: 12, src: 'assets/images/sanpham12.webp', category: 'lichsu', name: 'Việt Nam sử lược', price: 60000 },
            { productId: 13, src: 'assets/images/sanpham13.webp', category: 'tuoitho', name: 'hoàng tử bé', price: 130000 },
            { productId: 14, src: 'assets/images/sanpham14.webp', category: 'lichsu', name: 'Đạo đức kinh', price: 99000 },
            { productId: 15, src: 'assets/images/sanpham15.webp', category: 'kynangsong', name: 'giải mã hóc-môn dopamine', price: 270000 },
            { productId: 16, src: 'assets/images/sanpham16.webp', category: 'lichsu', name: 'lược sử loài người', price: 139000 },
            { productId: 17, src: 'assets/images/sanpham17.webp', category: 'lichsu', name: 'lịch sử tư tưởng trung quốc', price: 300000 },
            { productId: 18, src: 'assets/images/sanpham18.webp', category: 'chualanh', name: 'yêu những điều không hoàn hảo', price: 230000 },
            { productId: 19, src: 'assets/images/sanpham19.webp', category: 'tinhcam', name: '5cm/s', price: 99000 },
            { productId: 20, src: 'assets/images/sanpham20.webp', category: 'lichsu', name: 'đàm đạo cùng Khổng Tử', price: 240000 },
            { productId: 21, src: 'assets/images/sanpham21.webp', category: 'lichsu', name: 'những tù nhân của địa lý', price: 139000 },
            { productId: 22, src: 'assets/images/sanpham22.webp', category: 'tuoitho', name: 'tuổi thơ dữ dội', price: 130000 },
            { productId: 23, src: 'assets/images/sanpham23.webp', category: 'tinhcam', name: 'hạ đỏ', price: 260000 },
            { productId: 24, src: 'assets/images/sanpham24.webp', category: 'tinhcam', name: 'em sẽ đến cùng cơn mưa', price: 230000 },
            { productId: 25, src: 'assets/images/sanpham25.webp', category: 'kynangsong', name: 'thao túng tâm lý', price: 240000 },
            { productId: 26, src: 'assets/images/sanpham26.webp', category: 'chualanh', name: 'mẹ làm gì có ước mơ', price: 139000 },
            { productId: 27, src: 'assets/images/sanpham27.webp', category: 'tinhcam', name: 'Yêu miêu', price: 99000 },
            { productId: 28, src: 'assets/images/sanpham28.webp', category: 'tinhcam', name: 'trường an ly ca', price: 130000 },
            { productId: 29, src: 'assets/images/sanpham29.webp', category: 'kynangsong', name: 'từ tốt đến vỹ đại', price: 270000 },
            { productId: 30, src: 'assets/images/sanpham30.webp', category: 'kynangsong', name: 'Sống Chậm', price: 260000 },
            { productId: 31, src: 'assets/images/sanpham31.webp', category: 'chualanh', name: 'trèo lên mái nhà để khóc', price: 99000 },
            { productId: 32, src: 'assets/images/sanpham32.webp', category: 'chualanh', name: 'những kẻ lãng du', price: 220000 },
            { productId: 33, src: 'assets/images/sanpham33.webp', category: 'kynangsong', name: 'làm sao học ít hiểu nhiều', price: 270000 },
            { productId: 34, src: 'assets/images/sanpham34.webp', category: 'kynangsong', name: 'tiểu sử Elon Musk', price: 99000 },
            { productId: 35, src: 'assets/images/sanpham35.webp', category: 'kynangsong', name: 'Trump đừng bao giờ bỏ cuộc', price: 230000 },
            { productId: 36, src: 'assets/images/sanpham36.webp', category: 'kynangsong', name: 'V.Putin sự vĩ đại của nước Nga', price: 290000 },
            { productId: 37, src: 'assets/images/sanpham37.webp', category: 'kynangsong', name: 'sự ly kỳ của cậu bé giao báo', price: 300000 },
            { productId: 38, src: 'assets/images/sanpham38.webp', category: 'lichsu', name: 'lược sử tôn giáo', price: 270000 },
            { productId: 39, src: 'assets/images/sanpham39.webp', category: 'lichsu', name: 'chiến tranh tiền tệ', price: 180000 },
            { productId: 40, src: 'assets/images/sanpham40.webp', category: 'tinhcam', name: 'Vẽ em bằng màu nội nhớ', price: 220000 },
            { productId: 41, src: 'assets/images/sanpham41.webp', category: 'tinhcam', name: 'kiếp nào ta cũng tìm thấy nhau', price: 99000 },
            { productId: 42, src: 'assets/images/sanpham42.webp', category: 'lichsu', name: 'các triều đại Việt Nam', price: 290000 },
            { productId: 43, src: 'assets/images/sanpham43.webp', category: 'tinhcam', name: 'Ngày xưa có một chuyện tình', price: 270000 },
            { productId: 44, src: 'assets/images/sanpham44.webp', category: 'lichsu', name: 'Vì sao Phật giáo giàu chân lý', price: 180000 },
            { productId: 45, src: 'assets/images/sanpham45.webp', category: 'kynangsong', name: 'Thép đã tôi thế đấy', price: 139000 }
        ];

        localStorage.setItem('product', JSON.stringify(productArray));
    }
}
const arrProducts = JSON.parse(localStorage.getItem('product'));

function createnewbook() {
    if (localStorage.getItem('newbook') === null) {
        var newbookarray = [
            { productId: 1, src: 'assets/images/sanpham1.webp', category: 'thiếu nhi & tuổi thơ', name: 'Tôi thấy hoa vàng trên cỏ xanh', price: 120000 },
            { productId: 3, src: 'assets/images/sanpham3.webp', category: 'phát triển bản thân', name: 'nếu chỉ còn một ngày để sống', price: 200000 },
            { productId: 24, src: 'assets/images/sanpham24.webp', category: 'hồi ký & tình cảm', name: 'nhà nàng ở cạnh nhà tôi', price: 230000 },
            { productId: 39, src: 'assets/images/sanpham39.webp', category: 'kinh tế & lịch sử', name: 'chiến tranh tiền tệ', price: 299000 },
        ];
        localStorage.setItem('newbook', JSON.stringify(newbookarray));
    }
    const newbooks = JSON.parse(localStorage.getItem('newbook'));
    const arrnewproduct = document.getElementsByClassName('item-newproducts');
    for (let i = 0; i < arrnewproduct.length; i++) {
        s = `
    <div class="images-newbook"><img src="${newbooks[i].src}" alt=""></div>
    <div class="info-book name">${newbooks[i].name}</div>
    <div class="info-book categorynew"><i class="fa-solid fa-tag"></i>${newbooks[i].category}</div>
    <div class="info-book price"> <i class="fas fa-coins newcoin"></i>giá: ${newbooks[i].price}Đ</div>`
        arrnewproduct[i].innerHTML = s;
    }
}
function changePage(pageNumber) {
    // Lấy tất cả các button có class "page-item"
    let pages = document.querySelectorAll('.page');

    // Loại bỏ lớp "active" khỏi tất cả các class
    for (let i = 0; i < pages.length; i++) {
        pages[i].classList.remove('activepage');
    }

    // Thêm lớp "active" vào page tương ứng với trang được chọn
    let currentPage = document.getElementsByClassName(`page${pageNumber}`);
    currentPage[0].classList.add('activepage');
}

function resetActivePage() {
    // Lấy tất cả các phần tử có class "page"
    let page1 = document.querySelectorAll('.page');

    // Loại bỏ lớp "active" khỏi tất cả các phần tử
    for (let i = 0; i < page1.length; i++) {
        page1[i].classList.remove('activepage');
    }

    // Thêm lớp "active" vào trang 1
    let pagedefaut = document.querySelector('.page1');

    pagedefaut.classList.add('activepage');

}
function rederpage(arrproducts) {
    let result = arrproducts.length;
    let numberpage = Math.ceil(result / 8);
    var pagination = document.querySelector('.pagination');
    let pagesHtml = '';  // Khai báo biến pagesHtml để tránh ghi đè
    for (let i = 1; i <= numberpage; i++) {
        // Tạo các phần tử cho các số trang và gán vào pagesHtml
        pagesHtml += `<div class="page page${i}" onclick="changePage(${i})">${i}</div>`;
    }

    // Gắn HTML đã tạo vào phần tử pagination
    pagination.innerHTML = pagesHtml;
}
window.onload = function() {
    // Các hàm bạn muốn gọi khi trang tải xong
    createProduct();
    createnewbook();
    rederpage(arrProducts); 
    resetActivePage();
    resetcategory();
   // Ví dụ, mảng arrproducts đã được xác định
}
document.querySelectorAll('.add-cart').forEach(button => {
    button.addEventListener('click', function() {
      // Khi click vào nút, thêm class 'clicked' để thay đổi màu và phóng to
      this.classList.add('clicked');
    });
  
    // Khi di chuột ra ngoài nút, xóa class 'clicked'
    button.addEventListener('mouseleave', function() {
      this.classList.remove('clicked');
    });
  });
  
  function resetcategory(category){
       var cate=document.querySelectorAll('.category');
       for(let i=0;i<cate.length;i++){
        cate[i].classList.remove('activepage');
       }
        cate[0].classList.add('activepage');
  }
function changecategory (category){
  var changecate= document.querySelectorAll('.category');
    for(let i=0;i<changecate.length;i++){
        changecate[i].classList.remove('activepage');
    }
    var categorynow=document.querySelector(`.category${category}`);
    categorynow.classList.add('activepage');
}
