
var Timer = function(callback, timeIncrement, totalTime) {
  this.startDate = null; //will be a Date object set by this.start()
  this.stopDate = null; //will be a Date object set by this.start()

  this.timeIncrement = timeIncrement || 5000;
  this.timer = null;
  this.okayToFire = true;

  this.start = function() {
    this.okayToFire = true;
    if (this.timer) this.stop();
    this.startDate = new Date();
    this.stopDate = this.startDate + totalTime * 1000; //convert from seconds to milliseconds

    this.fire();
  };

  this.fire = function() {
    if (this.okayToFire) {
      if (callback === 'function') callback();
      console.log('timer fired with duration (sec): ', (new Date() - this.startDate) / 1000);
      var increment = Math.min(this.timeIncrement, this.stopDate - new Date(), 0);
      this.timer = setTimeout(this.fire.bind(this), increment);
    }
  };

  this.stop = function() {
    this.okayToFire = false;
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
  };
};

module.exports = Timer;