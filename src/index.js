import jquery from 'jquery'

import { Babysteptimer } from './babystepstimer'

const $ = jquery
const timerDisplay = $('#timeleft')
const timer = $('#timer')
const quitButton = $('#quit')
const startButton = $('#start')
const stopButton = $('#stop')
const resetButton = $('#reset')

/* eslint-disable no-new */
new Babysteptimer({ timerDisplay, timer, stopButton, resetButton, startButton, quitButton })
