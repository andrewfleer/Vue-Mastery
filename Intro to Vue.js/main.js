var app = new Vue({
    el: '#app',  // This tells the JS to go to an element with the ID "#app".
    data: {
        product: 'Socks',  // The data for this element, to fill in anything with {{ }}
        description: 'A pair of warm, fuzzy socks',
        image: './assets/vmSocks-green-onWhite.jpg', // The data can also fill in a v-bind tag
        link: 'http://www.vuemastery.com',
        inStock: true, // You can use booleans for v-if / v-else conditional rendering.
        onSale: true,
        inventory: 100 // Or you can use v-if for more conditional logic.
    }
})