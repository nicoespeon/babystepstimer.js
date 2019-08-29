/* globals Audio, alert */

const BACKGROUND_COLOR_NEUTRAL = '#ffffff'
const BACKGROUND_COLOR_FAILED = '#ffcccc'
const BACKGROUND_COLOR_PASSED = '#ccffcc'
let bodyBackgroundColor = BACKGROUND_COLOR_NEUTRAL

const SECONDS_IN_CYCLE = 120

const twoDigitsFormat = number => ('0' + Math.floor(number)).slice(-2)

/**
 * TODO: Implement Mouse Move (Does that actually make sense for this?)
 * TODO: Close does not really work … (Open an new window, to use it)
 */
class Babysteptimer {
  constructor ({ timerDisplay, timer, stopButton, resetButton, startButton, quitButton }) {
    this.timerDisplay = timerDisplay
    this.timer = timer
    this.stopButton = stopButton
    this.resetButton = resetButton
    this.startButton = startButton
    this.quitButton = quitButton
  }

  initialize () {
    this.updateTimer(0, BACKGROUND_COLOR_NEUTRAL)
    this.quitButton.click(() => {
      alert('Please close the window!')
    })

    const timerThread = new TimerThread(this)
    this.startButton.click(() => {
      this.updateTimer(0, BACKGROUND_COLOR_NEUTRAL, true)
      timerThread.start()
    })
    this.stopButton.click(() => {
      timerThread.stop()
      this.updateTimer(0, BACKGROUND_COLOR_NEUTRAL, false)
    })
    this.resetButton.click(() => {
      timerThread.reset()
      bodyBackgroundColor = BACKGROUND_COLOR_PASSED
    })
  }

  updateTimer (time, color, running) {
    this.timerDisplay.text(this.getRemainingTimeCaption(time))
    this.timer.css('background-color', color)
    if (running) {
      this.stopButton.show()
      this.resetButton.show()
      this.startButton.hide()
    } else {
      this.stopButton.hide()
      this.resetButton.hide()
      this.startButton.show()
    }
  }

  getRemainingTimeCaption (elapsedTime) {
    const elapsedSeconds = elapsedTime / 1000
    const remainingSeconds = SECONDS_IN_CYCLE - elapsedSeconds
    const remainingMinutes = remainingSeconds / 60
    return twoDigitsFormat(remainingMinutes) + ':' + twoDigitsFormat(remainingSeconds - Math.floor(remainingMinutes) * 60)
  }

  playSound (name) {
    new Audio('./sounds/' + name + '.wav').play()
  }
}

let lastRemainingTime

/**
 * TODO: Maybe use requestAnimationFrame
 */
class TimerThread {
  constructor (timer) {
    this.timer = timer
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
      if (elapsedTime >= SECONDS_IN_CYCLE * 1000 + 980) {
        this.currentCycleStartTime = Date.now()
        elapsedTime = Date.now() - this.currentCycleStartTime
      }
      if (elapsedTime >= 5000 && elapsedTime < 6000 && BACKGROUND_COLOR_NEUTRAL !== bodyBackgroundColor) {
        bodyBackgroundColor = BACKGROUND_COLOR_NEUTRAL
      }

      let remainingTime = this.timer.getRemainingTimeCaption(elapsedTime)
      if (remainingTime !== lastRemainingTime) {
        if (remainingTime === '00:10') {
          this.timer.playSound('struck')
        } else if (remainingTime === '00:00') {
          this.timer.playSound('shipsbell')
          bodyBackgroundColor = BACKGROUND_COLOR_FAILED
        }
        this.timer.updateTimer(elapsedTime, bodyBackgroundColor, true)
        lastRemainingTime = remainingTime
      }
    }, 10)
  }
}

export { Babysteptimer }
