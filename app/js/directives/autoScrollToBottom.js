/**
 * autoScrollToBottom：当消息很多出现滚动条时，该组件使得滚动条能随着消息的增加自动滚动到底部；
 * scrollTop: 设置 <div> 元素中滚动条的垂直偏移：
 * scrollHeight:获取给定对象的滚动高度
 */
angular.module('zhufengChat').directive('autoScrollToBottom',function(){
    return {
        link: function(scope, element, attrs) {
            scope.$watch(
                function() {
                    return element.children().length;
                },
                function() {
                    element.animate({
                        scrollTop: element.prop('scrollHeight')
                    }, 1000);
                }
            );
        }
    };
});