


const ItemCtrl = (function(){

    const Item = function(id,name,calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    const data = {
        items : [ 
        {id:0, name:'Steak Dinner', calories: 1200},
        {id:1, name:'Cookie', calories: 400},
        {id:2, name:'Eggs', calories: 1000}
    ],
        currentItem : null,
        totalCalories : 0
    }

    return {
        getItems: function(){
            return data.items;
        },
        logData: function(){
            return data;
        } 
    }
    
})();

const UICtrl = (function(){
    const UISelector = {
        itemList : '#item-list'

    }


    return{
        populateItemList:function(items){
            let html = '';

            items.forEach(function(item){
                html += `<li class="collection-list-item" id="item-${item.id}"><strong>${item.name} :</strong><em>${item.calories} Calories</em><a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a></li>`
            });

            document.querySelector(UISelector.itemList).innerHTML = html;
        }
    }
    
    
})();

const App = (function(ItemCtrl,UICtrl){

    //console.log(ItemCtrl.logData());
    return{
        init: function(){
            //console.log('hai');
            const items = ItemCtrl.getItems();

            UICtrl.populateItemList(items);
            //  
        }
    }
    
    
})(ItemCtrl,UICtrl);

App.init();