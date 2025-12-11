// script.js

// Dữ liệu sản phẩm mẫu
const products = [
    { id: 1, name: "Áo Polo Cotton", price: 250000, image: "https://via.placeholder.com/300x200?text=Ao+Polo" },
    { id: 2, name: "Quần Jeans Slimfit", price: 450000, image: "https://via.placeholder.com/300x200?text=Quan+Jeans" },
    { id: 3, name: "Giày Sneaker Trắng", price: 800000, image: "https://via.placeholder.com/300x200?text=Giay+Sneaker" },
    { id: 4, name: "Đồng Hồ Thể Thao", price: 1200000, image: "https://via.placeholder.com/300x200?text=Dong+Ho" },
    { id: 5, name: "Ba Lô Laptop", price: 600000, image: "https://via.placeholder.com/300x200?text=Ba+Lo" }
];

// --- 1. Quản lý Giỏ hàng (Sử dụng Local Storage) ---

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        // Tính tổng số lượng sản phẩm
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    saveCart();
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
}


// --- 2. Render Sản phẩm ---

function renderProducts(productList = products) {
    const productListElement = document.getElementById('product-list');
    if (!productListElement) return;

    productListElement.innerHTML = productList.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">${product.price.toLocaleString('vi-VN')} VNĐ</p>
                <button class="btn primary-btn" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Thêm vào Giỏ
                </button>
            </div>
        </div>
    `).join('');
}


// --- 3. Chức năng Tìm kiếm ---

function searchProducts() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    const searchTerm = searchInput.value.toLowerCase().trim();
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );

    renderProducts(filteredProducts);
}


// --- 4. Khởi tạo chức năng khi trang tải xong ---

document.addEventListener('DOMContentLoaded', () => {
    // Chỉ render và cập nhật giỏ hàng trên trang index.html
    if (document.getElementById('product-list')) {
        renderProducts();
    }
    updateCartCount();
    
    // Xử lý Form Đăng nhập (Chỉ demo, không gửi đi thật)
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Đăng nhập thành công! (Demo chức năng)');
            window.location.href = 'index.html'; // Chuyển hướng sau khi đăng nhập
        });
    }
});
