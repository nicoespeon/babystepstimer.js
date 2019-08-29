/* globals Audio, alert */

import { TimerThread } from './timer-thread'
import { BodyBackground } from './body-background'

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
    this.bodyBackground = new BodyBackground()
  }

  initialize () {
    this.bodyBackground.setNeutral()
    this.updateStoppedTimer()
    this.quitButton.click(() => {
      alert('Please close the window!')
    })

    const timerThread = new TimerThread(this, this.bodyBackground)
    this.startButton.click(() => {
      this.bodyBackground.setNeutral()
      this.updateRunningTimer(0)
      timerThread.start()
    })
    this.stopButton.click(() => {
      timerThread.stop()
      this.bodyBackground.setNeutral()
      this.updateStoppedTimer()
    })
    this.resetButton.click(() => {
      timerThread.reset()
      this.bodyBackground.setPassed()
    })
  }

  updateRunningTimer (time) {
    this.timerDisplay.text(this.getRemainingTimeCaption(time))
    this.timer.css('background-color', this.bodyBackground.color)
    this.stopButton.show()
    this.resetButton.show()
    this.startButton.hide()
  }

  updateStoppedTimer () {
    this.timerDisplay.text(this.getRemainingTimeCaption(0))
    this.timer.css('background-color', this.bodyBackground.color)
    this.stopButton.hide()
    this.resetButton.hide()
    this.startButton.show()
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

export { Babysteptimer }
