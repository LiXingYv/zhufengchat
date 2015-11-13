/**
 * ctrlEnterBreakLine: 在textarea回车，默认会换行，使用这个组件，可以通过ctrl+enter来换行，
 * 而enter则触发绑定的行为，在这里就是createMessage这个方法
 */
angular.module('zhufengChat').directive('ctrlEnterBreakLine',function(){
    return function(scope,element,attrs){
        var ctrlDown = false;
        element.bind('keydown',function(event){
            if(event.which == 17){
                ctrlDown = true;
                setTimeout(function(){
                    ctrlDown = false;
                },1000);
            }
            if(event.which === 13){
                if(ctrlDown){
                    element.val(element.val()+'\n');
                }else{
                    scope.$apply(function(){
                        scope.$eval(attrs.ctrlEnterBreakLine);
                    });
                    event.preventDefault();
                }
            }
        });
    }
});