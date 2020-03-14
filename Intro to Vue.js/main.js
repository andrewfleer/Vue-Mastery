Vue.component('product',{
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
        <!-- The {{ }} are expressions. They pull settings from the javascript.-->
        <div class="product-image">
            <img v-bind:src="image" v-bind:alt="description" />  <!-- v-bind: dynamically binds an attribute to an expression -->
                                                                <!-- a shorthand method is to just use the colon. <img :src="image"> -->
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1> <!-- This is now a computed property -->
            <p v-if="inventory > 10">In Stock</p>  <!-- Conditional Rendering -->
            <p v-else-if="inventory<= 10 && inventory > 0">Almost sold out!</p>
            <p v-else
            :class="{ lineThrough : !inStock}">Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>
            <p >{{ sale }}</p>
            <p v-show="inStock">Buy Today!</p> <!-- v-show also conditionally shows thing. v-if adds and removes elements from the DOM.-->
                                            <!-- v-show just hides/unhides through CSS. Better for performance.-->
            <p>{{ description }}</p> <!-- This is a plain, boring, regular property-->

            <p>
            <product-details :details="details"></product-details>                   
            </p>

            <p>
                <strong>Sizes</strong>
                <ul>
                    <li v-for="size in sizes">{{ size }}</li>
                </ul>
            </p>

            <strong>Colors</strong>
            <!-- The style binding let's us change CSS styles dynamically. 
                Here we're changing the background color of the div, based on the variant configs-->
            <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box" 
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)"> <!-- How to render a list of object. Always a good idea to use the key binding. -->
                
            </div>

            <div>
                <a v-bind:href="link">Link to Vue Mastery!</a>
            </div>

            <div>

                <!-- Here we did class binding. This is a way to dynamically add a CSS class to an element.-->
                <button v-on:click="addToCart" 
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock }">Add to Cart</button> <!-- This is a cool way for Vue to read from the DOM-->
                <button @click="removeFromCart">Remove from Cart</button> <!-- the @ is shorthand for v-on -->


            </div>
        </div>
    </div>
    `,
    data() {
        return { 
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
            ]
        }
    },
    methods: {  // These are functions that can be loaded through Vue
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
         removeFromCart() {
             this.$emit('remove-from-cart')
         },
        updateProduct(index) { // You can use a shorthand instead of declaring anonymous functions. However, not all browsers support this.
            this.selectedVariant = index // "this" references the cart within this element.
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
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    }
})

Vue.component('product-details', {
    props: {
      details: {
        type: Array,
        required: true
      }
    },
    template: `
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
    `
  })

var app = new Vue({
    el: '#app',  // This tells the JS to go to an element with the ID "#app".
    data: {
        premium: true,
        cart: []
    },
    methods: {
        addToCart(id) {
            this.cart.push(id)
        },
        removeFromCart(id) {
            this.cart.pop(id)
        }
    }
})