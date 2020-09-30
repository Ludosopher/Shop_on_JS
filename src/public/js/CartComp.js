const cartItem = {
    data(){
        return {
            inputQuant: '',
            checked: true,
            deletedItems: [],
            prod: {},
        }
    },
    props: ['cartItem', 'img', 'quantity'],
    template:
        `       
                <section class="inCart__content">
                    <div class="inCart__content_imgText">
                        <a href="single_page.html" class="inCart__content_imgText_img">
                            <img :src="img" alt="good">
                        </a>
                        <div class="inCart__content_imgText_text">
                            <h4><a href="#">{{cartItem.product_name}}</a></h4>
                            <div class="colorSize-inCart">
                                <p class="blackText-inCart">
                                    Color:
                                    <span class="grayText-inCart">Red</span>
                                </p>
                            </div>
                            <div class="colorSize-inCart">
                                <p class="blackText-inCart">
                                    Size:
                                    <span class="grayText-inCart">XII</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="inCart__content_char">
                        <div class="inCart__content_char_price">
                            {{cartItem.price}}$
                        </div>
                        <div class="inCart__content_char_quantity">
                            <input type="text" :placeholder="quantity" v-model="inputQuant" @input="accountingQuantity(cartItem)">
                        </div>
                        <div class="inCart__content_char_shipping">
                            FREE
                        </div>
                        <div class="inCart__content_char_subtotal">
                            {{cartItem.quantity*cartItem.price}}$
                        </div>
                        <div class="inCart__content_char_action">
                            <img class="deleteItem" src="img/delete_dagger.png" alt="delete" @click="accountingAction(cartItem)">
                        </div>
                    </div>
                </section> `,

    methods: {

        accountingAction(item) {
            this.$parent.$parent.deleteJson(`/api/cart/${item.id_product}`)
                .then(data => {
                    if (data.result === 1) {
                        this.$parent.cartItems.splice(this.$parent.cartItems.indexOf(item), 1);
                    }
                });
        },

        accountingQuantity(item) {
            this.$parent.$parent.putJson(`/api/cart/${item.id_product}`, {quantity: -this.quantity})
                .then(data => {
                    this.$parent.$parent.putJson(`/api/cart/${item.id_product}`, {quantity: +this.inputQuant});
                    item.quantity = +this.inputQuant;
                });
        },
    }

};

const cart = {
    components: { cartItem },
    data(){
      return {
          cartItems: [],
      }
    },
    methods: {
        // clearCart() {
        //     console.log(this.i);
        //     if (this.cartItems[this.i]) {
        //         this.$parent.deleteJson(`/api/cart/${this.cartItems[this.i].id_product}`)
        //             .then(data => {
        //                 if (data.result === 1) {
        //                     this.i++;
        //                     this.clearCart();
        //                 }
        //             });
        //     } else {
        //         this.cartItems = [];
        //     }
        // },

        // clearCart() {
        //     for (let j = 0; j = this.cartItems.length-1; j++) {
        //         this.$parent.deleteJson(`/api/cart/${this.cartItems[j].id_product}`)
        //             .then(data => {
        //                 console.log(data);
        //                 if (data.result === 1) {
        //                     console.log(j);
        //                 }
        //             });
        //     }
        //     this.cartItems = [];
        // }

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
            <div class="cartBlock">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <cart-item class="inCart__content"
                v-for="item of cartItems" 
                :key="item.id_product"
                :id ="item.id_product"
                :cart-item="item" 
                :img="item.img"
                :quantity = "item.quantity">
                </cart-item>
            </div>
            <div class="twoButtons container">
                <div href="" class="twoButtons__button">
                    CLEAR SHOPPING CART
                </div>
                <a href="product.html" class="twoButtons__button">
                    CONTINUE SHOPPING
                </a>
            </div>
        </div>`
};

export default cart;


