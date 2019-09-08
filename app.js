


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
        addItem : function(name,calories){
            let ID;
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id +1;
            }else{
                ID = 0;
            }
            //console.log(name,calories);
        },
        logData: function(){
            return data;
        } 
    }
    
})();

const UICtrl = (function(){
    const UISelectors = {
        itemList : '#item-list',
        addBtn : '.add-btn',
        itemNameInput : '#item-name',
        itemCaloriesInput: '#item-calories'


    }


    return{
        populateItemList:function(items){
            let html = '';

            items.forEach(function(item){
                html += `<li class="collection-list-item" id="item-${item.id}"><strong>${item.name} :</strong><em>${item.calories} Calories</em><a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a></li>`
            });

            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput :function(){
            return{
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories : document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },

        getSelectors : function(){
            return UISelectors;
        }
    }
    
    
})();

const App = (function(ItemCtrl,UICtrl){

    const loadEventListeners = function(){

        const UISelectors = UICtrl.getSelectors();

        document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);

        //document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);

    } 

    const itemAddSubmit = function(e){

        //console.log('add');
        const input = UICtrl.getItemInput();

        //console.log(input);
        if(input.name !== '' && input.calories !== ''){

            const newItem = ItemCtrl.addItem(input.name,input.calories);
             
        }

        e.preventDefault(); 
    }

    

    //console.log(ItemCtrl.logData());
    return{
        init: function(){
            //console.log('hai');
            const items = ItemCtrl.getItems();

            UICtrl.populateItemList(items);

            loadEventListeners();
            //  
        }
    }
    
    
})(ItemCtrl,UICtrl);

App.init();