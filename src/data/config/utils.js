/* eslint-disable no-useless-escape */

const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)

export const uniqueId = () => {
  let time = new Date().getTime()
  return `${time}${s4()}${s4()}${s4()}`
}

export const log = (...arg) => {
  if (process.env.NODE_ENV !== 'production')
    console.log(...arg)
}

export const isEmail = email => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

export const checkDevice = {
  screen_orientation: function () {
    if (window.matchMedia("(orientation:landscape)").matches) {
      return 'landscape'
    } else {
      return 'portrait'
    }
  },
  screen_type: function () {
    if (window.innerWidth <= 480) {
      return 'xs'
    } else if (window.innerWidth <= 768) {
      return 'sm'
    } else if (window.innerWidth <= 992) {
      return 'md'
    } else if (window.innerWidth <= 1200) {
      return 'lg'
    } else if (window.innerWidth <= 1600) {
      return 'hd'
    } else if (window.innerWidth <= 2560) {
      return 'fhd'
    } else {
      return 'uhd'
    }
  },
  deviceStatus: function () {
    return (
      {
        screen_width: window.innerWidth,
        screen_height: window.innerHeight,
        screen_orientation: this.screen_orientation(),
        screen_type: this.screen_type()
      }
    )
  }
}