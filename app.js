


const ItemCtrl = (function(){

    const Item = function(id,name,calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    const data = {
        item : [ 
        {id:0, name:'Steak Dinner', calories: 1200},
        {id:1, name:'Cookie', calories: 400},
        {id:2, name:'Eggs', calories: 1000}
    ],
        currentItem : null,
        totalCalories : 0
    }

    return {
        logData: function(){
            return data;
        }
    }
    
})();

const UICtrl = (function(){
    
})();

const App = (function(ItemCtrl,UICtrl){

    //console.log(ItemCtrl.logData());
    return{
        init: function(){
            console.log('hai');

        }
    }
    
    
})(ItemCtrl,UICtrl);

App.init();