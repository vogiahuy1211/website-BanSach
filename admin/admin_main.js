/* Tạo hiệu ứng khi click và hover cho left menu */
const menuItems = document.querySelectorAll('.nav_left-menu');
menuItems.forEach(item => {
    item.addEventListener('click', function() {
         menuItems.forEach(i => i.classList.remove('active'));
         this.classList.add('active');
    }); 
});

