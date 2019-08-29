/**
 * TODO: Maybe use requestAnimationFrame
 */
class TimerThread {
  constructor (timer, bodyBackground) {
    this.timer = timer
    this.bodyBackground = bodyBackground
    this.timerRunning = false
  }

  start () {
    if (this.timerRunning) return
    this.timerRunning = true
    this.run()
  }

  stop () {
    this.timerRunning = false
  }

  reset () {
    this.currentCycleStartTime = Date.now()
  }

  run () {
    this.reset()
    this.interval = window.setInterval(() => {
      if (!this.timerRunning) return

      let elapsedTime = Date.now() - this.currentCycleStartTime
      if (elapsedTime >= this.timer.secondsInCycle * 1000 + 980) {
        this.currentCycleStartTime = Date.now()
        elapsedTime = Date.now() - this.currentCycleStartTime
      }
      if (elapsedTime >= 5000 && elapsedTime < 6000 && !this.bodyBackground.isNeutral()) {
        this.bodyBackground.setNeutral()
      }

      if (this.timer.getRemainingTimeCaption(elapsedTime) !== this.lastRemainingTime) {
        if (this.timer.getRemainingTimeCaption(elapsedTime) === '00:10') {
          this.timer.playSound('struck')
        } else if (this.timer.getRemainingTimeCaption(elapsedTime) === '00:00') {
          this.timer.playSound('shipsbell')
          this.bodyBackground.setFailed()
        }
        this.timer.updateRunningTimer(elapsedTime)
        this.lastRemainingTime = this.timer.getRemainingTimeCaption(elapsedTime)
      }
    }, 10)
  }
}

export { TimerThread }
