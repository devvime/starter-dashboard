import $ from 'jquery'
import axios from 'axios'
import { dev, apiURL, apiDevURL, token } from '../../environment/environment'

export const serializeForm = (target) => {
  return $(`#${target}`).serializeArray().reduce(function (obj, item) {
    obj[item.name] = item.value
    return obj
  }, {})
}

export const api = axios.create({
  baseURL: dev ? apiDevURL : apiURL,
  headers: { 'Authorization': 'Bearer ' + token }
})

export const welcome = () => {
  let response = ''
  const hours = new Date().getHours()
  if (hours >= 6 && hours <= 12) {
    response = 'Good morning'
  } else if (hours > 12 && hours < 18) {
    response = 'Good afternoon'
  } else if (hours >= 18 || hours < 6) {
    response = 'Goodnight'
  }
  return response
}