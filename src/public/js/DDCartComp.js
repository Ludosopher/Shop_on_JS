const ddcartItem = {
    data(){
        return {
        }
    },
    props: ['cartItem', 'img'],
    template:
        `       
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                            <p class="product-single-price">{{cartItem.price}}₽ за единицу</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}$</p>
                        <button class="del-btn" @click="accountingAction(cartItem)">&times;</button>
                    </div>
                </div> `,

    methods: {

        accountingAction(item) {
            this.$parent.$parent.deleteJson(`/api/cart/${item.id_product}`)
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.$parent.cartItems.splice(this.$parent.cartItems.indexOf(item), 1);
                        }
                    }
                });
        },
    }

};

const ddcart = {
    components: { ddcartItem },
    data(){
      return {
          cartItems: [],
          showCart: false,
      }
    },

    mounted(){
        this.$parent.getJson('/api/cart')
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
    },

    template:

         `<div>
            <button type="button" class="ddcart-button" @click="showCart = !showCart"><img class="header__cart" src="img/cart.svg" alt="cart"></button>
            <div class="cart-block" v-show="showCart">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <ddcart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                :img="item.img">
                </ddcart-item>
            </div>
        </div>`,

    methods: {
        addProduct(product){
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1});
                find.quantity++;
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
    }
};

export default ddcart;


