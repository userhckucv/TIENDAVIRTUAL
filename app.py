from flask import Flask, redirect, render_template, request, url_for, session

app = Flask(__name__)
app.secret_key = 'tu_clave_secreta'  # Cambia esto por una clave secreta segura

# Diccionario de ejemplo con algunos productos
products = {
    '1': {'id': 1, 'name': 'Televisor', 'price': 20.00, 'image': 'televisor.png', 'description': 'Televisor de alta definición'},
    '2': {'id': 2, 'name': 'Microondas', 'price': 35.00, 'image': 'microondas.png', 'description': 'Microondas con funciones avanzadas'},
    '3': {'id': 3, 'name': 'Oso de peluche', 'price': 50.00, 'image': 'peluche.png', 'description': 'Oso de peluche suave y tierno'},
    '4': {'id': 4, 'name': 'PS4', 'price': 45.00, 'image': 'ps4.png', 'description': 'Consola de videojuegos PS4'},
}

# Ruta para la página de inicio
@app.route('/')
def index():
    return render_template('index.html', products=products)

# Ruta para la página de detalles del producto
@app.route('/product_detail/<product_id>')
def product_detail(product_id):
    product = products.get(product_id)
    if not product:
        return "Producto no encontrado", 404
    return render_template('product_detail.html', product=product)

# Ruta para mostrar el carrito
@app.route('/cart')
def cart():
    cart = session.get('cart', [])
    total = sum(item['price'] for item in cart)  # Calcula el total del carrito
    return render_template('cart.html', cart=cart, total=total)

# Ruta para la búsqueda de productos
@app.route('/products', methods=['GET'])
def product_list():
    query = request.args.get('query', '').lower()
    filtered_products = [
        product for product in products.values() if query in product['name'].lower()
    ]
    return render_template('products.html', products=filtered_products, query=query)

if __name__ == '__main__':
    app.run(debug=True)
