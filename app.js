


const ItemCtrl = (function(){

    const Item = function(id,name,calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    const data = {
        items : [ 
        // {id:0, name:'Steak Dinner', calories: 1200},
        // {id:1, name:'Cookie', calories: 400},
        // {id:2, name:'Eggs', calories: 1000}
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

            calories = parseInt(calories);

            newItem = new Item(ID,name,calories);
   
            data.items.push(newItem);

            return newItem;
            //console.log(name,calories);
        },
        getItemById: function(id){
            let found = null;

            data.items.forEach(function(item){
                if(item.id === id){
                    found = item;
                }
            });
            return found;

        },
        setCurrentItem: function(item){
            data.currentItem = item;
 
        },
        getCurrentItem: function(){
            return data.currentItem;
        },
        getTotalCalories: function(){
            let total = 0;

            data.items.forEach(function(item){
                total += item.calories;
            });
            
            data.totalCalories = total;

            return data.totalCalories;

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
        updateBtn : '.update-btn',
        deleteBtn : '.delete-btn',
        backBtn : '.back-btn',
        itemNameInput : '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'


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
        },
        addListItem : function(item){

            const li = document.createElement('li');
            li.className = 'collection-item';

            li.id = `item-${item.id}`;

            li.innerHTML = `<strong>${item.name} :</strong><em>${item.calories} Calories</em><a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;

             document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li)
            
        },
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;

        },

        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();

        },
        clearEditState: function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';

        },
        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';

        }
    }
    
     
})();

const App = (function(ItemCtrl,UICtrl){

    const loadEventListeners = function(){

        const UISelectors = UICtrl.getSelectors();

        document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);

        document.querySelector(UISelectors.itemList).addEventListener('click',itemUpdateSubmit);

    } 

    const itemAddSubmit = function(e){

        //console.log('add');
        const input = UICtrl.getItemInput();

        //console.log(input);
        if(input.name !== '' && input.calories !== ''){

            const newItem = ItemCtrl.addItem(input.name,input.calories);

            UICtrl.addListItem(newItem);

            const totalCalories = ItemCtrl.getTotalCalories();

            UICtrl.showTotalCalories(totalCalories);

            UICtrl.clearInput();
     
        }

        e.preventDefault(); 
    }

    const itemUpdateSubmit = function(e){
        
        if(e.target.classList.contains('edit-item')){
            // console.log('test');
            const listId = e.target.parentElement.parentElement.id;

            console.log(listId);

            const listIdArr = listId.split('-');

            const id = parseInt(listIdArr[1]);

            const itemToEdit = ItemCtrl.getItemById(id);

            ItemCtrl.setCurrentItem(itemToEdit);

            UICtrl.addItemToForm();


            console.log(itemToEdit);
        }

        e.preventDefault();
    }

    

    //console.log(ItemCtrl.logData());
    return{
        init: function(){
            UICtrl.clearEditState();
            
            const items = ItemCtrl.getItems();

            UICtrl.populateItemList(items);

            // const totalCalories = ItemCtrl.getTotalCalories();

            // UICtrl.showTotalCalories(totalCalories);


            loadEventListeners();
              
        }
    }
    
    
})(ItemCtrl,UICtrl);

App.init();