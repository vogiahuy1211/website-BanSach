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


var USERS = [
    {UserID: 10001, FullName: 'Nguyễn Văn A',UserPassword: 'jjjjjj', UserName: 'NguyenLam', Sdt: '1234567890', Status: '1', Address1: 'dsgdsgdgd', Address2: '1', Address3: '1', Address4: '1'},
    {UserID: 10002, FullName: 'Nguyễn Văn B',UserPassword: 'jjjjjj' ,UserName: 'NguyenLam', Sdt: '1234567890', Status: '0', Address1: 'Chưa có', Address2: '0', Address3: '0', Address4: '0', },
];


localStorage.setItem('USER',JSON.stringify(USERS));


/* Khởi tạo địa chỉ */

window.onload = function() {
    KhoiTaoCacDiaChi();
};

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

/*Hiện Quận - Huyện --> Thực hiện khi lựa chọn của TỈnh thay đổi (onchange) */
function HienQuanUser(){
    var Tinh = document.getElementById('User_Tinh-tp');
    if(Tinh.value === '0'){
        return false;
    }
    var showQuan = document.getElementById('User_Quan-huyen');
    var Quan = JSON.parse(localStorage.getItem('Quan_Huyen'));
    var s ='<option value="0" selected>Quận/Huyện</option>';
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
    if(Quan.value === '0'){
        return false;
    }
    var showPhuong = document.getElementById('User_Phuong-xa');
    var Phuong = JSON.parse(localStorage.getItem('Phuong_Xa'));
    var s = '<option value="0" selected>Phường/xã</option>';
    for(var i = 0; i < Phuong.length; i++){
        if(Phuong[i].Quan_HuyenID === Quan.value){
            s+= ' <option value="' + Phuong[i].PhuongID + '">' + Phuong[i].PhuongName + '</option>';
        }
    }
    showPhuong.innerHTML = s;
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
        return;
    }
    if(newUserFullName.value === ''){
        alert('Vui lòng nhập tên');
        newUserFullName.focus();
    }
    var newUserName = document.getElementById('tenDangnhap');
    if(newUserName.value === ''){
        alert('Vui lòng điền tên đăng nhập');
        newUserFullName.focus();
    }
    var newUserPassword = document.getElementById('mkhau');
    var re_newUserPassword = document.getElementById('re_mkhau');
    if(newUserPassword.value !== re_newUserPassword.value){
        alert('Mật khẩu nhập lại không đúng');
        re_newUserPassword.focus();
        re_newUserPassword.select();
        return;
    }
    var newAddress1 = document.getElementById('Duong_soNha');
    if(newAddress1.value === ''){
        alert('Vui lòng nhập địa chỉ');
        newUserFullName.focus();
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
    localStorage.setItem('USER' ,JSON.stringify(UserArray));
    HideForm_Add_User();
    showUser();
}

/* Thoát chi tiết và chỉnh sửa */
function exitCSUser(){
    document.getElementById('Show_user_Chitiet_va_Sua').style.display = 'none';
}

/*Hiện chi tiết và chỉnh sửa */
function Show_chitiet_User(idUser){
    document.getElementById('Show_user_Chitiet_va_Sua').style.display = 'block';
    var show = document.getElementById('CSUser_show');
    var data = JSON.parse(localStorage.getItem('USER'));
    var s = '<div class="text_CSUser">Thông tin chi tiết khách hàng:</div>';
    for(var i = 0; i < data.length; i++){
        if(idUser === data[i].UserID){
            s+= '<p >Họ và tên: ' + data[i].FullName + ' </p> <p>Số điện thoại: '+ data[i].Sdt + ' </p> <p>Địa chỉ: ' +data[i].Address1 + ' , ' +Lay_Phuong_Xa_Tu_ID(data[i].Address2)+ ' , '+ Lay_Quan_Huyen_Tu_ID(data[i].Address3) + ' , ' + Lay_Tinh_Tu_ID(data[i].Address4) + '</p>';
            s+= '<div class="text_CSUser">Thông tin tài khoản:</div>' + '<p>Tài khoản : ' + data[i].UserName + '</p> <p>Mật khẩu : ' + data[i].UserPassword + '</p>';
            s+= '<div id="CSUser_status"><span>Trạng thái tài khoản:</span> <span id="stas">' + ChuyenTrangThai(data[i].Status) + '</span></div>';
            s+= '<div id="CSUser_control">  <div id="CSUse_set"><i class="fa-solid fa-gear"></i> Chỉnh sửa</div> <div id="CSUse_lock" onclick = "Change_Status_User('+ data[i].UserID +')"> </div> </div>';
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
