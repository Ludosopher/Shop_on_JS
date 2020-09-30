const product = {
    props: ['product', 'cartItems', 'img'],

    methods: {
    },
    

    template: `
        <div class="card">
            <div class="picture">
                <img :src="img" alt="">
                <div class="dimmer"></div>
                <div class="buttonAdd" @click="$root.$refs.ddcart.addProduct(product)">
                    <img src="img/btn_cart.png" alt="cart">Add to&nbsp;Cart
                </div>
            </div>
            <div class="nameAndPrice">
                <a href="#" @click="addSingle(product)"><h3>{{product.product_name}}</h3></a>
                <p>{{product.price}}$</p>
            </div>
        </div>
        `
};

const products = {
    components: { product },
    data(){
        return {
            products: [],
            filtered: [],
            cartItems: [],
        }
    },
    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson('/api/products')
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.$parent.getJson('/api/cart')
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
    },

    template: `
        <div class="productCards">
            <product v-for="item of filtered" :key="item.id_product" :img="item.img" :product="item" :cart-items="cartItems"></product>
        </div>
     `
};

export default products;