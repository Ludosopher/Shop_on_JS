const search = {
    data(){
        return {
            userSearch: ''
        }
    },
    template:

    `<form action="#" class="header__form">
         <a href="#" class="browse">Browse</a>
         <input type="text" placeholder="Search for Item..." maxlength="50" v-model="userSearch">
         <button type="submit" @click="$parent.$refs.products.filter(userSearch)"><a href="#" class="fas fa-search"></a></button>
     </form>`
};

export default search;
