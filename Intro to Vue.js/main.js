var app = new Vue({
    el: '#app',  // This tells the JS to go to an element with the ID "#app".
    data: {
        product: 'Socks',  // The data for this element, to fill in anything with {{ }}
        description: 'A pair of warm, fuzzy socks',
        image: './assets/vmSocks-green.jpg', // The data can also fill in a v-bind tag
        link: 'http://www.vuemastery.com',
        inStock: false, // You can use booleans for v-if / v-else conditional rendering.
        onSale: true,
        inventory: 0, // Or you can use v-if for more conditional logic.
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        sizes: ["Small", "Medium", "Large"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: './assets/vmSocks-green.jpg'
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: './assets/VmSocks-blue.jpg'
            }
        ],
        cart: 0
    },
    methods: {  // These are functions that can be loaded through Vue
        addToCart: function () {
            this.cart += 1  // "this" references the cart within this element.
        },
        removeFromCart() {
            this.cart -= 1
        },
        updateProduct(variantImage) { // You can use a shorthand instead of declaring anonymous functions. However, not all browsers support this.
            this.image = variantImage
        }
    }
})