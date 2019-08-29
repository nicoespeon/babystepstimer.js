/* globals alert */

import { TimerThread } from './timer-thread'
import { BodyBackground } from './body-background'

const twoDigitsFormat = number => ('0' + Math.floor(number)).slice(-2)

/**
 * TODO: Implement Mouse Move (Does that actually make sense for this?)
 * TODO: Close does not really work … (Open an new window, to use it)
 */
class Babysteptimer {
  constructor ({ timerDisplay, timer, stopButton, resetButton, startButton, quitButton }) {
    this.timerDisplay = timerDisplay
    this.stopButton = stopButton
    this.resetButton = resetButton
    this.startButton = startButton
    this.quitButton = quitButton
    this.bodyBackground = new BodyBackground(timer)
    this.secondsInCycle = 120
  }

  initialize () {
    const timerThread = new TimerThread(this, this.bodyBackground)

    this.bodyBackground.setNeutral()
    this.updateStoppedTimer()

    this.startButton.click(() => {
      this.bodyBackground.setNeutral()
      this.updateRunningTimer(0)
      timerThread.start()
    })

    this.stopButton.click(() => {
      this.bodyBackground.setNeutral()
      this.updateStoppedTimer()
      timerThread.stop()
    })

    this.resetButton.click(() => {
      this.bodyBackground.setPassed()
      timerThread.reset()
    })

    this.quitButton.click(() => {
      alert('Please close the window!')
    })
  }

  updateRunningTimer (time) {
    this.timerDisplay.text(this.getRemainingTimeCaption(time))
    this.bodyBackground.applyColor()
    this.stopButton.show()
    this.resetButton.show()
    this.startButton.hide()
  }

  updateStoppedTimer () {
    this.timerDisplay.text(this.getRemainingTimeCaption(0))
    this.bodyBackground.applyColor()
    this.stopButton.hide()
    this.resetButton.hide()
    this.startButton.show()
  }

  getRemainingTimeCaption (elapsedTime) {
    const elapsedSeconds = elapsedTime / 1000
    const remainingSeconds = this.secondsInCycle - elapsedSeconds
    const remainingMinutes = remainingSeconds / 60
    return twoDigitsFormat(remainingMinutes) + ':' + twoDigitsFormat(remainingSeconds - Math.floor(remainingMinutes) * 60)
  }
}

export { Babysteptimer }
