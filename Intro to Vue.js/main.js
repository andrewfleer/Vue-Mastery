var app = new Vue({
    el: '#app',  // This tells the JS to go to an element with the ID "#app".
    data: {
        brand: 'Vue Mastery',
        product: 'Socks',  // The data for this element, to fill in anything with {{ }}
        description: 'A pair of warm, fuzzy socks',
        selectedVariant: 0,
        link: 'http://www.vuemastery.com',
        
        onSale: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        sizes: ["Small", "Medium", "Large"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: './assets/vmSocks-green.jpg',
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: './assets/vmSocks-blue.jpg',
                variantQuantity: 0
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
        updateProduct(index) { // You can use a shorthand instead of declaring anonymous functions. However, not all browsers support this.
            this.selectedVariant = index
            console.log(index)
        }
    },
    computed: {  // These are computed properties.
        // Computed properties are cached, and thus better for performance than methods which have to perform every time they're called.
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inventory() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        inStock() {  // You can use booleans for v-if / v-else conditional rendering.
            return this.variants[this.selectedVariant].variantQuantity > 0
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale!'
            }
            
            return this.brand + ' ' + this.product + ' are not on sale'
        }
    }
})