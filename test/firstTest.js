var config = require('../nightwatch.conf.js');

module.exports = {
	'First Test Assert Title': function(browser) {
		browser.url('localhost:8080').waitForElementVisible('body');
		browser.assert.containsText('body', 'Escape');
		browser
			.setValue('input', ['walk left', browser.Keys.ENTER])
			.pause(500)
			.assert.containsText('.window', 'invalid')
			.setValue('input', ['move left', browser.Keys.ENTER])
			.pause(1000)
			.assert.containsText('.window', 'key');
		browser
			.setValue('input', ['move right', browser.Keys.ENTER])
			.pause(500)
			.getAttribute('.img', 'src', function(result) {
				this.assert.equal(result.value, 'http://localhost:8080/client/public/images/bathroom.png');
			});
		browser
			.setValue('input', ['check toilet', browser.Keys.ENTER])
			.pause(500)
			.assert.containsText('.window', 'grabbed');
		browser
			.setValue('input', ['move back', browser.Keys.ENTER])
			.pause(500)
			.setValue('input', ['move back', browser.Keys.ENTER])
			.pause(500)
			.setValue('input', ['move forward', browser.Keys.ENTER])
			.pause(500)
			.getAttribute('.img', 'src', function(result) {
				this.assert.equal(result.value, 'http://localhost:8080/client/public/images/table.png');
			});
		browser
			.setValue('input', ['check table', browser.Keys.ENTER])
			.pause(500)
			.assert.containsText('.window', 'powder');
		browser
			.setValue('input', ['move left', browser.Keys.ENTER])
			.pause(500)
			.getAttribute('.img', 'src', function(result) {
				this.assert.equal(result.value, 'http://localhost:8080/client/public/images/hole.png');
			});
		browser
			.setValue('input', ['check hole', browser.Keys.ENTER])
			.pause(500)
			.setValue('input', ['move back', browser.Keys.ENTER])
			.pause(500)
			.setValue('input', ['move back', browser.Keys.ENTER])
			.pause(500)
			.setValue('input', ['move back', browser.Keys.ENTER])
			.pause(500)
			.setValue('input', ['move left', browser.Keys.ENTER])
			.pause(500)
			.getAttribute('.img', 'src', function(result) {
				this.assert.equal(result.value, 'http://localhost:8080/client/public/images/lab.png');
			});
		browser
			.setValue('input', ['check chair', browser.Keys.ENTER])
			.pause(500)
			.setValue('input', ['check cabinet', browser.Keys.ENTER])
			.pause(500)
			.assert.containsText('.window', 'beaker');
		browser
			.setValue('input', ['move back', browser.Keys.ENTER])
			.pause(500)
			.setValue('input', ['move right', browser.Keys.ENTER])
			.pause(500)
			.setValue('input', ['check sink', browser.Keys.ENTER])
			.pause(500)
			.assert.containsText('.window', 'water');
		browser
			.setValue('input', ['use powder', browser.Keys.ENTER])
			.pause(500)
			.assert.containsText('.window', 'got acid');
		browser
			.setValue('input', ['move back', browser.Keys.ENTER])
			.pause(500)
			.setValue('input', ['move forward', browser.Keys.ENTER])
			.pause(500)
			.getAttribute('.img', 'src', function(result) {
				this.assert.equal(result.value, 'http://localhost:8080/client/public/images/monster.png');
			});
		browser
			.setValue('input', ['use acid', browser.Keys.ENTER])
			.pause(500)
			.getAttribute('.img', 'src', function(result) {
				this.assert.equal(result.value, 'http://localhost:8080/client/public/images/exit.png');
			});
		browser
			.setValue('input', ['move forward', browser.Keys.ENTER])
			.pause(500)
			.getAttribute('.img', 'src', function(result) {
				this.assert.equal(result.value, 'http://localhost:8080/client/public/images/win.png');
			});
		browser
			.elements('css selector', '.window div', function(result) {
				this.assert.equal(result.value.length, 11);
			})
			.end();
	}
};
