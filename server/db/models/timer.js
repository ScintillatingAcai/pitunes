
var Timer = function(onFireCB, onCompleteCB, timeIncrement, totalTime) {
  this.startDate = null; //will be a Date object set by this.start()
  this.stopDate = null; //will be a Date object set by this.start()

  this.timeIncrement = timeIncrement || 5000;
  this.timer = null;
  this.okayToFire = true;

  this.start = function() {
    if (this.timer) this.stop();
    this.okayToFire = true;
    this.startDate = new Date();
    this.stopDate = this.startDate.getTime() + totalTime * 1000; //convert from seconds to milliseconds

    setTimeout(this.fire.bind(this,onFireCB), timeIncrement);
  };

  this.fire = function(callback) {
    if (this.okayToFire) {
      var dateNow = new Date();
      console.log('timer fired at duration (sec): ', (dateNow - this.startDate) / 1000);

      callback((dateNow - this.startDate) / 1000);

      var increment;
      var nextCallback;

      if ( this.stopDate - dateNow > this.timeIncrement / 1000) {
        increment = this.timeIncrement;
        nextCallback = onFireCB;
        console.log('fire normal increment: ',increment);
      }
      else {
        increment = Math.max(this.stopDate - dateNow, 0);
        nextCallback = onCompleteCB;
        console.log('fire short increment: ',increment);
      }
      if (this.stopDate > dateNow) {
        this.timer = setTimeout(this.fire.bind(this, nextCallback), increment);
      } else {
        onCompleteCB();
        this.stop();
      }
    }
  };

  this.stop = function() {
    this.okayToFire = false;
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
  };
};

module.exports = Timer;