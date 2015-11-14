describe('Home主页', function () {
    var page;

    beforeEach(function () {
        browser.get('/');
    });

    it('欢迎语必须正确', function() {
        expect(element(by.id('title')).getText()).toBe('欢迎光临珠峰网上商城3');
    });

});
