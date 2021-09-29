import { HttpRequesterService } from '../services/HttpRequesterService';
import { BeaconPayload } from '../models/BeaconPayload';
import fetch from 'cross-fetch';

/**
 * Responsible for making web requests
 */
export class HttpRequester implements HttpRequesterService {
  beacon(url: string, body: BeaconPayload): boolean {
    const data = JSON.stringify(body);

    const isNode = typeof(window) === 'undefined';
    if(isNode) {
     fetch(url, { method: 'POST', body: data });
     return true;
    }

    const isBeaconSupported = !!window.navigator?.sendBeacon;
    if (isBeaconSupported) {
      return window.navigator.sendBeacon(url, data);
    }

    return this._beaconPolyfill(url, data);
  }

  // Navigator.sendBeacon polyfill
  // Combination of the compact Financial Times polyfill:
  // https://github.com/Financial-Times/polyfill-library/blob/master/polyfills/navigator/sendBeacon/polyfill.js
  // with the async-by-default behavior of Miguel Mota's polyfill:
  // https://github.com/miguelmota/Navigator.sendBeacon/blob/master/sendbeacon.js
  _beaconPolyfill(url: string, data: string) : boolean {
    const event = window.event?.type;
    const sync = event === 'unload' || event === 'beforeunload';
    const xhr = ('XMLHttpRequest' in window) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('POST', url, !sync);
    xhr.setRequestHeader('Accept', '*/*');
    xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    xhr.send(data);
    return true;
  }
};