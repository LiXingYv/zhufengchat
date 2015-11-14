//http://www.jb51.net/article/58230.htm
//http://blog.jobbole.com/54936/

(function() {
    describe('HomeCtrl', function(){
        var $scope ;
        beforeEach(module('shopApp'));
        beforeEach(inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();
            $controller('HomeCtrl', {$scope: $scope});
        }));

        it('正确的欢迎语', inject(function() {
            expect($scope.title = '欢迎光临珠峰网上商城').toBeTruthy();
        }));
    });

    /**
     *
     *   <say-hello></say-hello>
     * 测试脚本里首先注入$compile与$rootScope两个服务,一个用来编译html,一个用来创建作用域用,注意这里的_,默认ng里注入的服务前后加上_时,最后会被ng处理掉的,这两个服务保存在内部的两个变量里,方便下面的测试用例能调用到
     * $compile方法传入原指令html,然后在返回的函数里传入$rootScope,这样就完成了作用域与视图的绑定,最后调用$rootScope.$digest来触发所有监听,保证视图里的模型内容得到更新
     * 然后获取当前指令对应元素的html内容与期望值进行对比.
     */
    describe("测试指令是否OK", function() {
        var $compile;
        var $rootScope;
        var $httpBackend;
        //加载包含指令的模块
        beforeEach(module('shopApp'));
        //保存$rootScope 和 $compile 的引用以便在所有的测试用途中都能使用
        beforeEach(inject(function(_$compile_, _$rootScope_,_$httpBackend_){
            //找服务注入的时候名称会掉下划线_
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            $httpBackend.when('POST', '/users/validate').respond({username:'张三'});
        }));
        it('指令里的内容是否进行了正确的替换', function() {
            $httpBackend.flush();
            //编译包含指令的HTMl块
            var element = $compile("<say-hello></say-hello>")($rootScope);
            //使用$rootScope触发所有的监听
            $rootScope.$digest();
            // Check that the compiled element contains the templated content
            //检查编译后的内容是否包含正确的内容
            expect(element.html()).toContain("hello");
        });
    });

    /**
     *
     var app = angular.module('myApp', []);
     app.filter('interpolate', ['version', function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
        }]);
     上面的代码先配置过滤器模块,然后定义一个version值,因为interpolate依赖这个服务,
     最后用inject注入interpolate过滤器,注意这里的过滤器后面得加上Filter后缀,
     最后传入文本内容到过滤器函数里执行,与期望值进行对比.
     */
    describe('测试过滤器', function() {
        beforeEach(module('shopApp'));
        var bigger;
        beforeEach(inject(function($filter) {
            bigger = $filter('bigger');
        }));
        it('变大', function() {
            expect(bigger('original')).toEqual('originalbigger');
        });
    });

    describe('http请求测试', function(){
        var scope, $httpBackend;
        //我们使用这个模块注入我们的依赖
        beforeEach(angular.mock.module('shopApp'));

        //模拟控制器
        beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_){
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', 'Users/users.json').respond([{id: 1, name: 'Bob'}, {id:2, name: 'Jane'}],{method: 'get', isArray:true});
            $httpBackend.when('POST', '/users/validate').respond({username:'张三'});
            //创建一个空的作用域
            scope = $rootScope.$new();
            //声明控制器并注入一个空的控制器
            $controller('HomeCtrl', {$scope: scope});
        }))

        // tests start here
        it('欢迎信息是否相等', function(){
            expect(scope.title).toBe('欢迎光临珠峰网上商城');
        });

        it('should fetch list of users', function(){
            $httpBackend.flush();
            expect(scope.users.length).toBe(2);
           expect(scope.users[0].name).toBe('Bob');
        });
    });

})();
