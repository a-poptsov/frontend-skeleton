(function () {
  'use strict';

  describe('Dialog service', function () {

    beforeEach(module('example'));

    it('should have Alert service defined', inject(function (Alert) {
      expect(Alert).toBeDefined();
    }));

    it('should have Confirm service defined', inject(function (Confirm) {
      expect(Confirm).toBeDefined();
    }));
  });
})();
