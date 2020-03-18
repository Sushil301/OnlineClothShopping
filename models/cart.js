module.exports=function Cart(oldCart){
    this.items=oldCart.items || {};
    this.totalQty=oldCart.totalQty || 0;
    this.totalPrice=oldCart.totalPrice || 0;
    this.itemprice=oldCart.itemprice || 0;
 
    this.add=function(item,id  ){
        var StoredItem=this.items[id];
        if(!StoredItem){
            StoredItem=this.items[id]={item: item,qty:0 ,price:0};
        }
        StoredItem.qty++;
        this.itemprice = StoredItem.item.price;
        StoredItem.price=StoredItem.item.price * StoredItem.qty;
        this.totalQty++;
        this.totalPrice += StoredItem.item.price;
        console.log(this.itemprice);
        console.log(this.totalPrice);
        
    }
    this.reduceByOne = function(id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;

        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };


    this.removeItem = function(id){
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    }
    this.generateArray = function(){
        var arr=[];
        for(var id in this.items){
            arr.push(this.items[id]);

        }
        return arr;
    };
};

// module.exports = function Cart(oldCart){
//     this.items = oldCart.items || {};
//     this.totalQty = oldCart.totalQty || 0;
//     this.totalPrice = oldCart.totalPrice || 0;

//     this.add = function(item, id){
//         var storeItem = this.items[id];
//         if (!storeItem){
//             storeItem = this.items[id] = {item: item, qty: 0 , price:0};
//         }
//         storeItem.qty++;
//         storeItem.price = storeItem.item.price * storeItem.qty;
//         this.totalQty++;
//         this.totalPrice += storeItem.item.price;
//     };
//     this.generateArray = function(){
//         var arr = [];
//         for (var id in this.items){
//             arr.push(this.items[id]);
//         }
//         return arr;
//     }
// };