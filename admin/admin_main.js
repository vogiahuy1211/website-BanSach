/*Ghi chú quan trọng

- Lúc đăng kí mặc định các Address1, Address2, Address3, Address4 nhận giá trị '0';
- Trạng thái mặc định nhận giá trị '1' tức đang hoạt động;
- Trạng thái khi bị khoá nhận giá trị '0';
- 3 hàm lấy quận, lấy huyện, lấy xã từ id tui đã làm sẳn chỉ việc sài
- Xem phần form thêm khách hàng cũng như hàm hiện tỉnh, hiện quận, hiện phường khi chọn để thiết kế 
khi cần làm form thêm địa chỉ nếu dùng nhớ đổi id thẻ (nếu các ông rành rồi thì thôi nhé :) )

Cố lên ae!
*/

//localStorage.clear();
/* Tạo hiệu ứng khi click và hover cho left menu */
const menuItems = document.querySelectorAll('.nav_left-menu');
menuItems.forEach(item => {
    item.addEventListener('click', function() {
         menuItems.forEach(i => i.classList.remove('active'));
         this.classList.add('active');
    }); 
});

/* local storges tạm thời */

/*
var USERS = [
    {UserID: 10002, FullName: 'Nguyễn Văn A',UserPassword: 'jjjjjj', UserName: 'NguyenLam', Sdt: '1234567890', Status: '1', Address1: 'dsgdsgdgd', Address2: '1', Address3: '1', Address4: '1'},
    {UserID: 10001, FullName: 'Nguyễn Văn B',UserPassword: 'jjjjjj' ,UserName: 'NguyenLam', Sdt: '1234567890', Status: '0', Address1: 'Chưa có', Address2: '0', Address3: '0', Address4: '0', },
];


localStorage.setItem('USER',JSON.stringify(USERS));
*/
/* Khởi tạo địa chỉ */

window.onload = function() {
    KhoiTaoCacDiaChi();
    KhoiTaoAdmin();
    Login_Admin()
};

 function KhoiTaoAdmin(){
    if(JSON.parse(localStorage.getItem('AdminAccount')) === null){
        var Admin = [
            {AdminID: '0', AdminFullName: 'Nguyễn Công Lâm', AdminName: 'Admin', AdminPassword: 'Admin',AdminSdt: '0376516504',AdminEmail: 'nguyenconglam2k5@gmail.com'}
        ];
        localStorage.setItem('ADMIN', JSON.stringify(Admin));
    }
    if(JSON.parse(localStorage.getItem('SaveLogin')) === null){
        var save = {saveL: '0' ,AdminID: ''};
    
        localStorage.setItem('SaveLogin', JSON.stringify(save));
    }
 }

 function KhoiTaoCacDiaChi(){
    if(JSON.parse(localStorage.getItem('Tinh_TP')) === null){
        var Tinh_TP = [
            {TinhID: '1', TinhName: 'TP.Hồ Chí Minh'},
            {TinhID: '2', TinhName: 'Hà Nội'}
        ];
        localStorage.setItem('Tinh_TP',JSON.stringify(Tinh_TP));
    }
    if(JSON.parse(localStorage.getItem('Quan_Huyen')) === null){
        var Quan_Huyen = [
            {TinhID: '1', Quan_HuyenID: '1', Quan_HuyenName: 'Quận 1'},
            {TinhID: '1', Quan_HuyenID: '2', Quan_HuyenName: 'Quận 3'},
            {TinhID: '1', Quan_HuyenID: '3', Quan_HuyenName: 'Quận 5'},
            {TinhID: '1', Quan_HuyenID: '4', Quan_HuyenName: 'Quận Bình Tân'},
            {TinhID: '1', Quan_HuyenID: '5', Quan_HuyenName: 'Quận Thủ Đức'},
            {TinhID: '2', Quan_HuyenID: '6', Quan_HuyenName: 'Quận Ba Đình'},
            {TinhID: '2', Quan_HuyenID: '7', Quan_HuyenName: 'Quận Hoàn Kiếm'},
            {TinhID: '2', Quan_HuyenID: '8', Quan_HuyenName: 'Quận Tây Hồ'},
        ];
        localStorage.setItem('Quan_Huyen',JSON.stringify(Quan_Huyen));
    }
    if(JSON.parse(localStorage.getItem('Phuong_Xa')) === null){
        var Phuong = [
            /*Phường không cần id */
            {Quan_HuyenID: '1',PhuongID: '1',PhuongName:'Bến Thành'},
            {Quan_HuyenID: '1',PhuongID: '2',PhuongName:'Bến Nghé'},
            {Quan_HuyenID: '1',PhuongID: '3',PhuongName:'Phạm Ngũ Lão'},
            {Quan_HuyenID: '2',PhuongID: '4',PhuongName:'Phường 1'},
            {Quan_HuyenID: '2',PhuongID: '5',PhuongName:'Phường 2'},
            {Quan_HuyenID: '2',PhuongID: '6',PhuongName:'Phường 3'},
            {Quan_HuyenID: '2',PhuongID: '7',PhuongName:'Phường 4'},
            {Quan_HuyenID: '2',PhuongID: '8',PhuongName:'Phường 5'},
            {Quan_HuyenID: '3',PhuongID: '9',PhuongName:'Phường 1'},
            {Quan_HuyenID: '3',PhuongID: '10',PhuongName:'Phường 2'},
            {Quan_HuyenID: '3',PhuongID: '11',PhuongName:'Phường 3'},
            {Quan_HuyenID: '3',PhuongID: '12',PhuongName:'Phường 4'},
            {Quan_HuyenID: '3',PhuongID: '13',PhuongName:'Phường 5'},
            {Quan_HuyenID: '3',PhuongID: '14',PhuongName:'Phường 6'},
            {Quan_HuyenID: '4',PhuongID: '15',PhuongName:'Bình Hưng Hoà'},
            {Quan_HuyenID: '4',PhuongID: '16',PhuongName:'An Lạc'},
            {Quan_HuyenID: '4',PhuongID: '17',PhuongName:'Tân Tạo'},
            {Quan_HuyenID: '4',PhuongID: '18',PhuongName:'Bình Trị Đông A'},
            {Quan_HuyenID: '5',PhuongID: '19',PhuongName:'An Khánh'},
            {Quan_HuyenID: '5',PhuongID: '20',PhuongName:'An Phú'},
            {Quan_HuyenID: '5',PhuongID: '21',PhuongName:'An Lợi Đông'},
            {Quan_HuyenID: '6',PhuongID: '22',PhuongName:'Cống Vị'},
            {Quan_HuyenID: '6',PhuongID: '23',PhuongName:'Điện Biên'},
            {Quan_HuyenID: '6',PhuongID: '24',PhuongName:'Đội Cấn'},
            {Quan_HuyenID: '6',PhuongID: '25',PhuongName:'An Lợi Đông'},
            {Quan_HuyenID: '7',PhuongID: '26',PhuongName:'Chương Dương Bộ'},
            {Quan_HuyenID: '7',PhuongID: '27',PhuongName:'Cửa Đông'},
            {Quan_HuyenID: '7',PhuongID: '28',PhuongName:'Cửa Nam'},
            {Quan_HuyenID: '7',PhuongID: '29',PhuongName:'Đông Xuân'},
            {Quan_HuyenID: '8',PhuongID: '30',PhuongName:'Bưởi'},
            {Quan_HuyenID: '8',PhuongID: '31',PhuongName:'Thuỵ Khuê'},
            {Quan_HuyenID: '8',PhuongID: '32',PhuongName:'Yến Phụ'},
        ];
        localStorage.setItem('Phuong_Xa', JSON.stringify(Phuong));
    }
}

/*Lấy tỉnh từ ID */
function Lay_Tinh_Tu_ID(id){
    var Tinh = JSON.parse(localStorage.getItem('Tinh_TP'));
    if(id === '0'){
        return 'Chưa có';
    }
    for(var i = 0; i < Tinh.length; i++){
        if(id === Tinh[i].TinhID){
            return Tinh[i].TinhName;
        }
    }
}

/* Láy  Quận-huyện từ ID */
function Lay_Quan_Huyen_Tu_ID(id){
    var Quan = JSON.parse(localStorage.getItem('Quan_Huyen'));
    if(id === '0'){
        return 'Chưa có';
    }
    for(var i = 0; i < Quan.length; i++){
        if(id === Quan[i].Quan_HuyenID){
            return Quan[i].Quan_HuyenName;
        }
    }
}

/* Lấy Phường từ id */
function Lay_Phuong_Xa_Tu_ID(id){
    var Phuong = JSON.parse(localStorage.getItem('Phuong_Xa'));
    if(id === '0'){
        return 'Chưa có';
    }
    for(var i = 0; i < Phuong.length; i++){
        if(id === Phuong[i].PhuongID){
            return Phuong[i].PhuongName;
        }
    }
}
/*-----------------------------------------------BĂT ĐẦU PHẦN ĐĂNG NHẬP ADMIN----------------------------------------------------------- */
function Login_Admin(){
    var saveLog = JSON.parse(localStorage.getItem('SaveLogin'));
    var Admin = JSON.parse(localStorage.getItem('ADMIN'));
    /*Khi đã lưu đăng nhập */
    if(saveLog.saveL === '1' && saveLog.AdminID !== ''){
        for(var i = 0; i < Admin.length; i++){
            if(Admin[i].AdminID === saveLog.AdminID){
                document.getElementById('form_login_Admin').style.display = 'none';
                document.getElementById('name_account').innerHTML = Admin[i].AdminFullName;
                Show_Admin_infor();
                return;
            }
        }
    }
    if(saveLog.saveL === '1'){
        document.getElementById('lock_login').innerHTML = '<i class="fa-regular fa-floppy-disk"></i>Huỷ lưu đăng nhập';
        document.getElementById('lock_login').style.width = '180px';
        document.getElementById('lock_login').style.backgroundColor = 'green';
    }

    var username = document.getElementById('Admin_Name');
    var pass = document.getElementById('Admin_Password');
    /* Khi load trang hoặc đăng nhập lần đầu tiên */
    if(username.value === '' && pass.value ===''){
        return;
    }
    for(var i = 0; i < Admin.length; i++){
        if(username.value === Admin[i].AdminName && pass.value === Admin[i].AdminPassword){
            alert('Đăng nhập thành công!');
            document.getElementById('form_login_Admin').style.display = 'none';
            document.getElementById('name_account').innerHTML = Admin[i].AdminFullName;
            saveLog.AdminID = Admin[i].AdminID;
            localStorage.setItem('SaveLogin', JSON.stringify(saveLog));
            Show_Admin_infor();
            return;
        }
        else{
            alert('Tên tài khoản hoặc mật khẩu không chính xác');
            return;
        }
    }

}

function Show_Admin_infor(){
    var saveLog = JSON.parse(localStorage.getItem('SaveLogin'));
    var Admin = JSON.parse(localStorage.getItem('ADMIN'));
    var s =' <div id="Thong_tin_Admin"> <p class="title_admin">Thông tin Admin:</p>';
    for(var i = 0; i < Admin.length; i++){
        if(saveLog.AdminID === Admin[i].AdminID){
            s+= '<p class="text_admin">Họ và Tên: ' +Admin[i].AdminFullName+ '</p>';
            s+= '<p class="text_admin">Số điện thoại: '+Admin[i].AdminSdt + '</p>';
            s+= '<p class="text_admin">Email: ' + Admin[i].AdminEmail + '</p>';
            s+= '<p class="title_admin infor_shop">Thông tin SHOP:</p>';
            s+= '<p class="text_admin">Tên Shop: Kho Tàng Sách</p>'
            s+= '<p class="text_admin">Địa chỉ : số 06, An Dương Vương, Phường 3, Quận 5 TP.Hồ Chí Minh</p>';
            s+= '<p class="text_admin">Hotline: 0376516504</p>';
            s+= '<p class="text_admin">Loại hình kinh doanh: Bán sách trực tuyến</p> </div>';
            s+= '<div id="Thong_tin_Admin_control">';
            s+= '<div id="back_home_bnt" onclick = "Back_home_Web()"><i class="fa-solid fa-arrow-left"></i> Trở lại trang bán hàng</div>';
            s+= '<div id="logout_bnt" onclick = "Logout_Admin()"><i class="fa-solid fa-arrow-right-from-bracket"></i>Đăng xuất</div>';
            s+= '<div id="lock_login" onclick = "saveLogin()"><i class="fa-solid fa-floppy-disk"></i>Lưu đăng nhập</div> </div>';
        }
    }
    document.getElementById('admin_content').innerHTML = s;
    if(saveLog.saveL === '0'){
        document.getElementById('lock_login').innerHTML = '<i class="fa-solid fa-floppy-disk"></i>Lưu đăng nhập';
        document.getElementById('lock_login').style.width = '150px';
        document.getElementById('lock_login').style.backgroundColor = 'red' ;
    }
    else{
        document.getElementById('lock_login').innerHTML = '<i class="fa-regular fa-floppy-disk"></i>Huỷ lưu đăng nhập';
        document.getElementById('lock_login').style.width = '180px';
        document.getElementById('lock_login').style.backgroundColor = 'green' ;
    }
}

function saveLogin(){
    var saveLog = JSON.parse(localStorage.getItem('SaveLogin'));
    if(saveLog.saveL === '0'){
        if(confirm('Điều này sẽ khiến tài khoản không đăng xuất khi reload lại trang gây ra lổ hổng trong bảo mật! Bạn vẫn muốn lưu đăng nhập?')){
            saveLog.saveL = '1';
            localStorage.setItem('SaveLogin',JSON.stringify(saveLog));
            alert('Lưu đăng nhập thành công');
            Show_Admin_infor();
            return;
        }
    }
    else{
        saveLog.saveL = '0';
        localStorage.setItem('SaveLogin',JSON.stringify(saveLog));
        alert('Huỷ lưu đăng nhập thành công');
        Show_Admin_infor();
        return;
    }
}

function Logout_Admin(){
    var saveLog = JSON.parse(localStorage.getItem('SaveLogin'));
    saveLog.saveL = '0';
    saveLog.AdminID = '';
    localStorage.setItem('SaveLogin',JSON.stringify(saveLog));
    window.location.href = window.location.href;
}

function Back_home_Web(){
    window.location.href = 'index.html';
}

/*-----------------------------------------------BĂT ĐẦU PHẦN DOANH THU---------------------------------------------------------- */









/*---------------------------------------------------BẮT ĐẦU PHẦN KHÁCH HÀNG------------------------------------------------------------ */
/*Hiện Quận - Huyện --> Thực hiện khi lựa chọn của TỈnh thay đổi (onchange) */
function HienQuanUser(){
    var Tinh = document.getElementById('User_Tinh-tp');
    var showQuan = document.getElementById('User_Quan-huyen');
    var Quan = JSON.parse(localStorage.getItem('Quan_Huyen'));
    var s ='<option value="0" selected>Quận/Huyện</option>';
    if(Tinh.value === '0'){
        showQuan.innerHTML = s;
        return false;
    }
    for(var i = 0; i < Quan.length; i++){
        if(Quan[i].TinhID === Tinh.value){
            s+= ' <option value="' + Quan[i].Quan_HuyenID + '">' + Quan[i].Quan_HuyenName + '</option>';
        }
    }
    showQuan.innerHTML = s;
}

/*Hiện Xã - Phường --> Thực hiện khi lựa chọn của Quận thay đổi (onchange) */
function HienPhuongXaUser(){
    var Quan = document.getElementById('User_Quan-huyen');
    var showPhuong = document.getElementById('User_Phuong-xa');
    var Phuong = JSON.parse(localStorage.getItem('Phuong_Xa'));
    var s = '<option value="0" selected>Phường/xã</option>';
    if(Quan.value === '0'){
        showPhuong.innerHTML = s;
        return false;
    }
    for(var i = 0; i < Phuong.length; i++){
        if(Phuong[i].Quan_HuyenID === Quan.value){
            s+= ' <option value="' + Phuong[i].PhuongID + '">' + Phuong[i].PhuongName + '</option>';
        }
    }
    showPhuong.innerHTML = s;
}





/*Hàm kiểm tra trùng lặp tên đăng nhập */
function KT_UserName(username){
    var data = JSON.parse(localStorage.getItem('USER'));
    for(var i = 0; i < data.length; i++){
        if(username === data[i].UserName){
            return true;
        }
    }
    return false;
}

/*Chuyển trạng thái sang lời */
function ChuyenTrangThai(it){
    if(it === '0'){
        return 'Đang bị khoá';
    }
    else{
        return 'Đang hoạt động';
    }
}

/* Hiển thị khách hàng */ 

function showUser(){
    var s = '<div id="khach_hang"> <p id="content_name">Danh sách khách hàng</p> <div id="them_khach_hang" onclick = "ShowForm_Add_User()">Thêm +</div> <div id="show_list"></div> <table id="table_from-khach_hang"> <tr id="user_head_table"> <th >STT</th> <th >Mã khách hàng</th> <th>Họ và tên</th> <th>Tên đăng nhập</th> <th>Số điện thoại</th> <th>Trạng thái TK</th> <th class="cot7"></th> </tr> ';
    if(localStorage.getItem('USER') === null){
        document.getElementById('admin_content').innerHTML = s +'</table> <div id="khong_co_khach_hang">Không có khách hàng nào</div> </div> </div>';
        return false;
    }
    var UserArray = JSON.parse(localStorage.getItem('USER'));
    if(UserArray.length === 0){
        document.getElementById('admin_content').innerHTML = s +'</table> <div id="khong_co_khach_hang">Không có khách hàng nào</div> </div> </div>';
        return false;
    }
    for(var i = 0; i < UserArray.length; i++){
        s+= '<tr class="user_body_table"> <td>' + (i+1) + '</td> <td>' + UserArray[i].UserID + '</td> <td>'+ UserArray[i].FullName + '</td> <td>' + UserArray[i].UserName + '</td> <td>' + UserArray[i].Sdt + '</td> <td>' + ChuyenTrangThai(UserArray[i].Status) + '</td> <td class="cot7"> <div class="khach_hang_chitiet" onclick = "Show_chitiet_User(' + UserArray[i].UserID+ ')" > Chi tiết </div> <div title="Xoá" class="khach_hang_delete" onclick ="DeleteUser(\''+UserArray[i].UserID+'\')"> <i class="fa-solid fa-xmark"></i> </div> </td> </tr>';
    }
    document.getElementById('admin_content').innerHTML = s +'</table> </div> </div>';
}

/* Xoá khách hàng */
function DeleteUser(UserDel){
    var UserArray = JSON.parse(localStorage.getItem('USER'));
    for(i = 0; i < UserArray.length; i++){
        if(UserArray[i].UserID == UserDel){
            if(confirm('Bạn muốn xoá người dùng này')){
                UserArray.splice(i,1);
            }
        }
    }
    localStorage.setItem('USER',JSON.stringify(UserArray));
    showUser();
}


/* Hiện bảng thêm khách hàng */
function ShowForm_Add_User(){
    document.getElementById('form_add_infor').style.display = 'block';
    document.getElementById('nganThoat').style.display = 'block';
    /*Hiện tỉnh --> thực hiện ngay sau khi form hiện ra */
    var Tinh = JSON.parse(localStorage.getItem('Tinh_TP'));
    var add4 = document.getElementById('User_Tinh-tp');
    var s = '<option value="0" selected>Tỉnh/thành phố</option>';
    for(var i = 0; i < Tinh.length; i++){
        s += ' <option value="' + Tinh[i].TinhID + '">' + Tinh[i].TinhName + '</option>';
    }
    add4.innerHTML = s;
}

/* Ẩn bảng thêm khách hàng */
function HideForm_Add_User(){
    document.getElementById('form_add_infor').style.display = 'none';
    document.getElementById('add_user').reset();
    document.getElementById('nganThoat').style.display = 'none';
}

/* Thêm khách hàng */
function AddUser(){
    var UserArray = JSON.parse(localStorage.getItem('USER')) || [];
    var newUserID = UserArray.length + 10001;
    var newUserFullName = document.getElementById('Hoten');
    var newUserSdt = document.getElementById('SDT');
    if(isNaN(Number(newUserSdt.value)) || newUserSdt.value.length < 10){
        alert('Số điện thoại không đúng');
        newUserSdt.focus();
        newUserSdt.select();
        return false;
    }
    if(newUserFullName.value === ''){
        alert('Vui lòng nhập tên');
        newUserFullName.focus();
        return false;
    }
    var newUserName = document.getElementById('tenDangnhap');
    if(newUserName.value === ''){
        alert('Vui lòng điền tên đăng nhập');
        newUserFullName.focus();
        return false;
    }
    if(newUserName.value.length < 6){
        alert('Tên đăng nhập phải trên 6 chữ số');
        newUserName.focus();
        return false;
    }
    if(KT_UserName(newUserName.value)){
        alert('Tên đăng nhập đã tồn tại');
        newUserName.focus();
        newUserName.select();
        return false;
    }
    var newUserPassword = document.getElementById('mkhau');
    if(newUserPassword.value === ''){
        alert('Vui lòng điền mật khẩu');
        newUserPassword.focus();
        return false;
    }
    if(newUserPassword.value.length < 6){
        alert('Mật khẩu phải trên 6 chữ số');
        newUserPassword.focus();
        return false;
    }
    var re_newUserPassword = document.getElementById('re_mkhau');
    if(newUserPassword.value !== re_newUserPassword.value){
        alert('Mật khẩu nhập lại không đúng');
        re_newUserPassword.focus();
        re_newUserPassword.select();
        return false;
    }
    var newAddress1 = document.getElementById('Duong_soNha');
    if(newAddress1.value === ''){
        alert('Vui lòng nhập địa chỉ');
        newAddress1.focus();
        return false;
    }
    var newAddress2 = document.getElementById('User_Phuong-xa');
    var newAddress3 = document.getElementById('User_Quan-huyen');
    var newAddress4 = document.getElementById('User_Tinh-tp');
    if(newAddress4.value === '0'){
        alert('Vui lòng chọn tỉnh/thành phố');
        newAddress4.focus();
        return false;
    }
    if(newAddress3.value === '0'){
        alert('Vui lòng chọn quận/huyện');
        newAddress3.focus();
        return false;
    }
    if(newAddress2.value === '0'){
        alert('Vui lòng chọn phường xã');
        newAddress2.focus();
        return false;
    }
    var Usertmp = {UserID: newUserID, FullName: newUserFullName.value, UserPassword: newUserPassword.value, UserName: newUserName.value,Sdt: newUserSdt.value,Status: '1', Address1: newAddress1.value, Address2: newAddress2.value, Address3: newAddress3.value, Address4: newAddress4.value  };
    UserArray.unshift(Usertmp);
    if(confirm('Bạn có chắc muốn thêm khách hàng ?')){
        localStorage.setItem('USER' ,JSON.stringify(UserArray));
        alert('Thêm khách hàng thành công');
        HideForm_Add_User();
        showUser();
        return;
    }
}

/* Thoát chi tiết và chỉnh sửa */
function exitCSUser(){
    document.getElementById('Show_user_Chitiet_va_Sua').style.display = 'none';
    document.getElementById('nganThoat').style.display = 'none';
    showUser();
}

/*Hiện chi tiết và chỉnh sửa */
function Show_chitiet_User(idUser){
    document.getElementById('Show_user_Chitiet_va_Sua').style.display = 'block';
    document.getElementById('nganThoat').style.display = 'block';
    var show = document.getElementById('CSUser_show');
    var data = JSON.parse(localStorage.getItem('USER'));
    var s = '<div class="text_CSUser">Thông tin chi tiết khách hàng:</div>';
    var diachi = '' ;
    for(var i = 0; i < data.length; i++){
        if(idUser === data[i].UserID){
            if(data[i].Address2 === '0' || data[i].Address3 === '0' || data[i].Address4 === '0'){
                diachi = 'Chưa cập nhật';
            }
            else{
                diachi =  data[i].Address1 + ' , ' +Lay_Phuong_Xa_Tu_ID(data[i].Address2)+ ' , '+ Lay_Quan_Huyen_Tu_ID(data[i].Address3) + ' , ' + Lay_Tinh_Tu_ID(data[i].Address4);
            }
            s+= '<p >Họ và tên: ' + data[i].FullName + ' </p> <p>Số điện thoại: '+ data[i].Sdt + ' </p> <p>Địa chỉ: ' + diachi + '</p>';
            s+= '<div class="text_CSUser">Thông tin tài khoản:</div>' + '<p>Tài khoản : ' + data[i].UserName + '</p> <p>Mật khẩu : ' + data[i].UserPassword + '</p>';
            s+= '<div id="CSUser_status"><span>Trạng thái tài khoản:</span> <span id="stas">' + ChuyenTrangThai(data[i].Status) + '</span></div>';
            s+= '<div id="CSUser_control">  <div id="CSUse_set" onclick = "Show_Set_User('+data[i].UserID+')"><i class="fa-solid fa-gear"></i> Chỉnh sửa</div> <div id="CSUse_lock" onclick = "Change_Status_User('+ data[i].UserID +')"> </div> </div>';
            show.innerHTML = s;
            if(data[i].Status !== '0'){
                document.getElementById('stas').style.color = 'green';
                document.getElementById('CSUse_lock').innerHTML = '<i class="fa-solid fa-lock"></i> Khoá tài khoản';
            }
            else{
                document.getElementById('stas').style.color = 'red';
                document.getElementById('CSUse_lock').innerHTML = '<i class="fa-solid fa-lock-open"></i> Mở khoá tài khoản';
                document.getElementById('CSUse_lock').style.backgroundColor = 'green';
            }
            return;
        }
    }
}

/*Đổi trạng thái */
function Change_Status_User(idUser){
    var data = JSON.parse(localStorage.getItem('USER'));
    for(var i = 0; i < data.length; i++){
        if(idUser === data[i].UserID){
            if(data[i].Status === '0'){
                data[i].Status = '1';
            }
            else{
                data[i].Status = '0';
            }
            break;
        }
    }
    localStorage.setItem('USER',JSON.stringify(data));
    Show_chitiet_User(idUser);
}

function Thoat_Set_User(){
    if(confirm('Bạn có chắc sẽ huỷ chỉnh sửa này'))
    {
        document.getElementById('Set_User').style.display = 'none';
        document.getElementById('set_user_form').reset();
        return;
    }
}

/*Hiện Quận - Huyện --> Thực hiện khi lựa chọn của TỈnh thay đổi (onchange) của phần chỉnh sửa */
function Set_HienQuanUser(){
    var Tinh = document.getElementById('Set_User_Tinh-tp');
    var showQuan = document.getElementById('Set_User_Quan-huyen');
    var Quan = JSON.parse(localStorage.getItem('Quan_Huyen'));
    var s ='<option value="0" selected>Quận/Huyện</option>';
    if(Tinh.value === '0'){
        showQuan.innerHTML = s;
        return false;
    }
    for(var i = 0; i < Quan.length; i++){
        if(Quan[i].TinhID === Tinh.value){
            s+= ' <option value="' + Quan[i].Quan_HuyenID + '">' + Quan[i].Quan_HuyenName + '</option>';
        }
    }
    showQuan.innerHTML = s;
}

/*Hiện Xã - Phường --> Thực hiện khi lựa chọn của Quận thay đổi (onchange) của phần chỉnh sửa*/
function Set_HienPhuongXaUsert(){
    var Quan = document.getElementById('Set_User_Quan-huyen');
    var showPhuong = document.getElementById('Set_User_Phuong-xa');
    var Phuong = JSON.parse(localStorage.getItem('Phuong_Xa'));
    var s = '<option value="0" selected>Phường/xã</option>';
    if(Quan.value === '0'){
        showPhuong.innerHTML = s;
        return false;
    }
    for(var i = 0; i < Phuong.length; i++){
        if(Phuong[i].Quan_HuyenID === Quan.value){
            s+= ' <option value="' + Phuong[i].PhuongID + '">' + Phuong[i].PhuongName + '</option>';
        }
    }
    showPhuong.innerHTML = s;
}

/**********Hiện form Chỉnh sửa**************/
function Show_Set_User(idUser){
    document.getElementById('Set_User').style.display = 'block';
    var Tinh = JSON.parse(localStorage.getItem('Tinh_TP'));
    var add4 = document.getElementById('Set_User_Tinh-tp');
    var s = '<option value="0" selected>Tỉnh/thành phố</option>';
    for(var i = 0; i < Tinh.length; i++){
        s += ' <option value="' + Tinh[i].TinhID + '">' + Tinh[i].TinhName + '</option>';
    }
    add4.innerHTML = s;
    var data = JSON.parse(localStorage.getItem('USER'));

    for(var i = 0; i < data.length; i++ ){
        if(idUser === data[i].UserID){
            document.getElementById('Set_Hoten').value = data[i].FullName;
            document.getElementById('Set_SDT').value = data[i].Sdt;
            document.getElementById('Set_Duong_soNha').value = data[i].Address1;
            document.getElementById('Set_tenDangnhap').value = data[i].UserName;
            document.getElementById('Set_mkhau').value = data[i].UserPassword;
            document.getElementById('Set_re_mkhau').value = data[i].UserPassword;
            document.getElementById('Set_User_Tinh-tp').value = data[i].Address4;
            Set_HienQuanUser();
            document.getElementById('Set_User_Quan-huyen').value = data[i].Address3;
            Set_HienPhuongXaUsert();
            document.getElementById('Set_User_Phuong-xa').value = data[i].Address2;
        }
    }
    document.getElementById('Set_button').setAttribute('onclick', 'Xac_nhan_Chinh_Sua_User(' + idUser + ')');
}

/*----------------------------Xác nhận chỉnh sửa---------------------------------- */
function Xac_nhan_Chinh_Sua_User(idUser){
    var newTen = document.getElementById('Set_Hoten');
    var data = JSON.parse(localStorage.getItem('USER'));
    if(newTen.value === ''){
        alert('Vui lòng nhập tên');
        newTen.focus();
        return false;
    }
    var newSdt = document.getElementById('Set_SDT');
    if(isNaN(Number(newSdt.value)) || newSdt.value.length < 10){
        alert('Số điện thoại không đúng');
        newSdt.focus();
        newSdt.select();
        return false;
    }
    var newDiaChiNha = document.getElementById('Set_Duong_soNha');
    if(newDiaChiNha.value === ''){
        alert('Vui lòng nhập địa chỉ');
        newDiaChiNha.focus();
        return false;
    }
    var newUserName =  document.getElementById('Set_tenDangnhap');
    if(newUserName.value === ''){
        alert('Vui lòng nhập tên đăng nhập');
        newUserName.focus();
        return false;
    }
    if(newUserName.value.length < 6){
        alert('Tên đăng nhập phải trên 6 chữ số');
        newUserName.focus();
        return false;
    }
    var kt2 = '';
    for(var i = 0; i < data.length; i++ ){
        if(data[i].UserID === idUser){
            kt2 = data[i].UserName;
        }
    }
    if(KT_UserName(newUserName.value) && kt2 !== newUserName.value){
        alert('Tên đăng nhập đã tồn tại');
        newUserName.focus();
        newUserName.select();
        return false;
    }
    var newMK = document.getElementById('Set_mkhau');
    if(newMK.value === ''){
        alert('Vui lòng nhập mật khẩu');
        newMK.focus();
        return false;
    }
    if(newMK.value.length < 6){
        alert('Mật khẩu phải trên 6 chữ số');
        newMK.focus();
        return false;
    }
    var newRe_MK = document.getElementById('Set_re_mkhau');
    if(newMK.value !== newRe_MK.value){
        alert('Mật khẩu nhập lại không đúng');
        newRe_MK.focus();
        newRe_MK.select();
        return false;
    }
    var newTinh = document.getElementById('Set_User_Tinh-tp');
    var newQuan = document.getElementById('Set_User_Quan-huyen');
    var newXa = document.getElementById('Set_User_Phuong-xa');
    if(newTinh.value === '0'){
        alert('Vui lòng chọn tỉnh/thành phố');
        newTinh.focus();
        return false;
    }
    if(newQuan.value === '0'){
        alert('Vui lòng chọn quận/huyện');
        newQuan.focus();
        return false;
    }
    if(newXa.value === '0'){
        alert('Vui lòng chọn phường xã');
        newXa.focus();
        return false;
    }
  
    for(var i = 0; i < data.length; i++ ){
        if(idUser === data[i].UserID){
            data[i].FullName = newTen.value;
            data[i].Sdt = newSdt.value;
            data[i].Address1 = newDiaChiNha.value;
            data[i].Address4 = newTinh.value;
            data[i].Address3 = newQuan.value;
            data[i].Address2 = newXa.value;
            data[i].UserName = newUserName.value;
            data[i].UserPassword = newMK.value;
            break;
        }
    }
    if(confirm('Bạn có chắc muốn chỉnh sửa ?'))
    {
        localStorage.setItem('USER',JSON.stringify(data));
        alert('Chỉnh sửa thành công');
        document.getElementById('Set_User').style.display = 'none';
        document.getElementById('set_user_form').reset
        Show_chitiet_User(idUser);
        return;
    }
}

/*-----------------------------------------------XONG KHÁCH HÀNG------------------------------------------------------------------- */


