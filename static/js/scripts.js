document.querySelectorAll('.menu-item > a').forEach(item => {
    item.addEventListener('click', function(event) {
        const submenu = this.nextElementSibling;
        if (submenu && submenu.classList.contains('submenu')) {
            // Prevenir la acción predeterminada
            event.preventDefault();
            // Alternar la visibilidad del submenú
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
        }
    });
});
function toggleDropdown() {
    const dropdown = document.getElementById("delivery-dropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

function selectOption(option) {
    document.querySelector(".delivery-button").textContent = option;
    document.getElementById("delivery-dropdown").style.display = "none";
}
document.getElementById('search-input').addEventListener('input', function() {
    const searchTerm = this.value;
    const title = document.getElementById('page-title');

    if (searchTerm) {
        title.textContent = `Resultados para: ${searchTerm}`;  // Cambia el título a lo que se ingrese
    } else {
        title.textContent = "Nuestros Productos";  // Restaura el título original si el campo está vacío
    }
});
// Abre el modal
function openPaymentModal() {
    document.getElementById('payment-modal').style.display = 'block';
}

// Cierra el modal
function closePaymentModal() {
    document.getElementById('payment-modal').style.display = 'none';
}

// Función para obtener los datos del producto
function getProductDetails() {
    const productName = document.getElementById('product-name')?.textContent || '';
    const productPrice = parseFloat(document.getElementById('product-price')?.textContent.replace('$', '').trim()) || 0;
    const quantity = parseInt(document.getElementById('quantity')?.value) || 1;
    const productId = document.getElementById('product-name')?.getAttribute('data-product-id');

    if (!productName || isNaN(productPrice) || !productId) {
        alert("No se ha encontrado información válida del producto.");
        return null;
    }

    const total = quantity * productPrice;
    const productUrl = `https://ac7d-38-43-110-115.ngrok-free.app/product_detail/${productId}`;

    return { productName, productPrice, quantity, total, productId, productUrl };
}

// Función para crear el mensaje de WhatsApp
function createWhatsAppMessage(productDetails, paymentType) {
    let paymentMessage = paymentType === 'credito' ? 'con pago a crédito' : 'con pago al contado';
    return `Hola, estoy interesado en comprar ${productDetails.quantity} unidades del producto "${productDetails.productName}" a un precio de $${productDetails.productPrice} cada una, con un total de $${productDetails.total} ${paymentMessage}. Más información: ${productDetails.productUrl}`;
}

// Función para abrir WhatsApp con el mensaje y la opción de pago seleccionada
function openWhatsAppMessage(message) {
    const whatsappNumber = "51913912136";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    const newWindow = window.open(whatsappUrl, '_blank');

    if (!newWindow) {
        alert("No se pudo abrir WhatsApp. Asegúrate de que las ventanas emergentes no estén bloqueadas.");
    }
}

// Función para manejar la selección de opción de pago
function choosePayment(paymentType) {
    const productDetails = getProductDetails();

    if (!productDetails) return;

    const message = createWhatsAppMessage(productDetails, paymentType);
    openWhatsAppMessage(message);

    closePaymentModal(); // Cierra el modal después de enviar el mensaje
}

// Función para abrir WhatsApp directamente con pago al contado
function openWhatsApp() {
    const productDetails = getProductDetails();

    if (!productDetails) return;

    const message = createWhatsAppMessage(productDetails, 'contado');
    openWhatsAppMessage(message);
}
