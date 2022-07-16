app.component('product-display', {
   props: {
       premium: {
           type: Boolean,
           required: true
       }
   },
   template:

       `<div class="product-display">
       <div class="product-container">
           <div class="product-image">
               <img v-if="inStock" :src="image">
               <img v-else class=out-of-stock-img :src="image">
           </div>
           <div class="product-info">

               <h1 v-if="onSale == true">{{onSaleja}} </h1>
               <h1 v-else>{{ title }}</h1>
               <p v-if="inventory > 10">In Stock</p>
               <p v-else-if="inventory <= 10 && inventory > 0">In Stock</p>
               <p v-else>Out of Stock</p>
               <p>Shipping: {{shipping}}</p>
               <product-details :details="details"></product-details>
            
               <div v-for="(variant,index) in variants" :key="variant.id" @mouseover="updateVariant(index)" class="color-circle" :style=" {backgroundColor:variant.color } "></div>
               <button class=" button " :disabled='!inStock' :class="{disabledButton: !instock}" @click="addToCart ">Add to Cart</button>
           </div>

       </div>
   </div>`,
   
   data() {
       return {
           product: 'Shoes',
           brand: 'SE331',
           // image: './assets/images/socks_green.jpg',
           // inStock: true,
           inventory: 100,
           details: ['50% cotton', '30% wool', '20% polyester'],
           variants: [
               { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
               { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
           ],
           cart: 0,
           SelectedVariant: 0,
           onSale: true

       }
   },
   methods: {
       addToCart() {
           this.cart += 1
       },
       updateImage(variantImage) {
           this.image = variantImage
       },
       updateVariant(index) {
           this.SelectedVariant = index;
       },

   },
   computed: {

       title() {
           return this.brand + ' ' + this.product
       },

       image() {
           return this.variants[this.SelectedVariant].image
       },
       inStock() {
           return this.variants[this.SelectedVariant].quantity
       },
       onSaleja() {
           return this.brand + ' is on sale ' + this.product
       },
       shipping() {
        if (this.premium) {
            return 'Free'
        }
        return 30
    }

   }

})