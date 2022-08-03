import { COOKIE_PARAM } from '../models';
import { COOKIE_REMOVAL_VALUE } from '../models/constants';

/**
 * CookieManager will manager conversion tracking cookies
 *
 * @public
 */
export class CookieManager {
  /**
   * Takes the window and document
   * @param _outerWindow - typically the window object or a mock
   * @param _outerDocument - typically teh document object or a mock
   */
  constructor(private _outerWindow: Window = window, private _outerDocument: Document = document) {
  }
  /**
   * Gets the existing YFPC ID, or sets a new one if it doesn't already exist.
   * You should only call this method if doing so complies with your GDPR/CCPA compliance requirements.
   *
   * @public
   */
  setAndGetYextCookie(): string {
    let cookieValue = this.fetchCookie();
    if (!cookieValue) {
      cookieValue = CookieManager.generateRandomCookie().toString();
    }
    this.setCookieAndRemoveOldCookies(cookieValue);
    return cookieValue;
  }

  /**
   */
  private static generateRandomCookie(): number {
    return Math.floor(Math.random() * new Date().getTime());
  }

  /**
   * Retrieves the identifier stored as a cookie on the user's browser, if present. Otherwise
   * returns empty. This is accomplished by attempting to set a cookie at domains in order of
   * increasing specificity (e.g. ".com", then ".example.com", then ".subdomain.example.com"), and
   * the first one that we can set a cookie in is the root domain. Check if we already have a cookie
   * in the root domain and if not, check if a cookie exists without a domain, for legacy reasons.
   *
   */
  private fetchCookie(): string {
    let cookieValue = '';
    const checkDomain = (domain: string) => {
      if (this.canSetCookieWithDomain(domain)) {
        const removedValue = this.removeCookieByDomain(domain);
        if (removedValue) {
          // We found and removed a value, so put it back
          cookieValue = removedValue;
          this.setCookie(cookieValue, domain);
        }
        // Exit the loop once we've reached root domain (the first domain where we can set a cookie)
        return true;
      }
    };

    this.forEachDomainIncreasingSpecificity(checkDomain);
    // If no cookie was present in the root domain, check for a cookie that doesn't have a domain
    // specified (by passing an empty string to checkDomain, indicating no domain).
    if (!cookieValue) checkDomain('');
    return cookieValue;
  }

  /**
   * Runs a function on each possible domain in order of increasing specificity (e.g. .com,
   * .example.com, .full.example.com). Note that empty string, indicating unset domain, is iterated
   * through at the end. A truthy return value indicates to break out of the loop.
   *
   * @param func - A function to call on each possible domain
   */
  private forEachDomainIncreasingSpecificity(func: (a: string) => boolean|undefined): void {
    let exitedLoop = false;
    const domainParts = this._outerDocument.location.hostname.split('.').reverse();
    let currDomain = '';

    for (let i = 0; i < domainParts.length; i++) {
      currDomain = '.' + domainParts[i] + currDomain;
      if (func(currDomain)) {
        exitedLoop = true;
        break;
      }
    }
    if (!exitedLoop) func('');
  }

  /**
   * Removes a COOKIE_PARAM cookie by domain, then returns its value if successful and empty string
   * otherwise.
   *
   * @param cookieDomain - The domain to remove the cookie from
   */
  private removeCookieByDomain(cookieDomain: string): string {
    const prevRemainingCookies = this.persistentCookies();
    this.clearCookie(cookieDomain);
    const remainingCookies = this.persistentCookies();

    if (remainingCookies.length < prevRemainingCookies.length) {
      return CookieManager.listDifference(prevRemainingCookies, remainingCookies)[0] || '';
    }
    return '';
  }

  /**
   * Returns the list difference between a superlist and sublist, accounting for number of
   * occurrences.
   *
   * @param superlist - The full array
   * @param sublist - The subarray
   */
  private static listDifference(superlist: string[] , sublist: string[]): string[] {
    const superlistCopy = Array.from(superlist);
    for (let i = 0; i < sublist.length; i++) {
      const index = superlistCopy.indexOf(sublist[i]);
      if (index !== -1) {
        superlistCopy.splice(index, 1);
      }
    }
    return superlistCopy;
  }

  /**
   * Retrieves a list of values of cookies with the name of COOKIE_PARAM that are present and not
   * set to be removed (i.e. having the specific value this script uses to indicate a removed
   * cookie).
   *
   */
  private persistentCookies(): string[] {
    return this.allCookies().filter(
      val => val !== COOKIE_REMOVAL_VALUE);
  }

  /**
   * Retrieves a list of values of cookies with the name of COOKIE_PARAM that are present.
   *
   */
  private allCookies(): string[] {
    const arr: string[] = [];
    this.forEachCookieNameValue((name, value) => {
      if (name === COOKIE_PARAM) {
        arr.push(value);
      }
    });
    return arr;
  }

  /**
   * Runs nameValueFunc on each cookie's key and value (after trimming), only if the key and value
   * are both truthy.
   *
   * @param nameValueFunc - A function to run on each cookie key-value pair
   */
  private forEachCookieNameValue(nameValueFunc: (a: string, b: string) => void): void {
    this._outerDocument.cookie.split(';').forEach((cookie) => {
      const keyValue = cookie.split('='),
        key = keyValue[0],
        value = keyValue[1];

      if (key && value) {
        nameValueFunc(key.trim(), value.trim());
      }
    });
  }

  /**
   * Stores a tracking cookie on the user's browser with the given value in the root domain, and
   * removes first party cookies from all other domains (which may be present for legacy reasons).
   *
   * @param cookieValue - The value to set as the first party cookie
   */
  private setCookieAndRemoveOldCookies(cookieValue: string): void {
    let rootDomainReached = false;
    const totalCookies = this.allCookies().length;
    let numCookiesEncountered = 0;

    // Iterate until we find the topmost domain (the root domain), where we set the cookie,
    // then continue iterating, just deleting any cookies we find afterwards.
    this.forEachDomainIncreasingSpecificity(domain => {
      if (rootDomainReached) {
        if (this.removeCookieByDomain(domain)) numCookiesEncountered++;
      } else {
        if (this.canSetCookieWithDomain(domain)) {
          // In root domain, so set cookie
          if (this.removeCookieByDomain(domain)) numCookiesEncountered++;
          this.setCookie(cookieValue, domain);
          rootDomainReached = true;
        }
      }

      if (numCookiesEncountered >= totalCookies && rootDomainReached) {
        // Break if we've already encountered every cookie and we already set one in root domain
        return true;
      }
    });
  }

  /**
   * Returns whether we are able to set a cookie (formatted like the actual cookie for tracking)
   * at a specified domain or not. Preserves existing cookies in the same domain (but not their
   * expiration dates).
   *
   * @param domain - The value for the cookie's domain attribute
   */
  private canSetCookieWithDomain(domain: string): boolean {
    const lostCookie = this.removeCookieByDomain(domain);
    const existingCookies = this.allCookies();
    this.setCookie(COOKIE_REMOVAL_VALUE, domain);
    const newCookies = this.allCookies();
    if (existingCookies.length < newCookies.length) {
      // Cookie was successfully saved, so wipe it and put back the old cookie if there was one
      if (lostCookie) {
        this.setCookie(lostCookie, domain);
      } else {
        this.clearCookie(domain);
      }
      return true;
    }
    return false;
  }

  /**
   * Stores a cookie on the user's browser with the given value and domain, with name COOKIE_PARAM.
   *
   * @param cookieValue - The value to set as the first party cookie
   * @param cookieDomain - The domain in which to set the cookie
   */
  private setCookie(cookieValue: string, cookieDomain: string): void {
    this._outerDocument.cookie = this.formatCookie(
      COOKIE_PARAM,
      cookieValue,
      cookieDomain);
  }

  /**
   * Creates a formatted cookie string given a key, value, domain, and, optionally, a path.
   * `Expires` is set to ensure the cookie is persistent, `Samesite=None` so the value can be
   * included in cross-site requests,`Domain` defaults to root domain (if possible) to enable
   * tracking across subdomains, and `Secure` is required when using
   * `Samesite=None`: https://www.chromestatus.com/feature/5633521622188032
   *
   * @param cookieName - The name of the cookie
   * @param cookieValue - The value of the cookie
   * @param domain - The domain to set the cookie for
   * @param path - The path to set the cookie for
   */
  private formatCookie(cookieName: string, cookieValue: string, domain: string, path = '/'): string {
    let cookieString = cookieName + '=' + cookieValue;
    const now = new Date();
    now.setTime(now.getTime() + 90 * 24 * 60 * 60 * 1000);
    cookieString += ';path=' + path;
    cookieString += ';expires=' + now.toUTCString();
    if (domain) cookieString += ';domain=' + domain;
    cookieString += ';samesite=None;';
    if (this._outerWindow.location.protocol === 'https:') {
      cookieString += ' Secure ';
    }
    return cookieString;
  }


  /**
   * Sets a cookie with name COOKIE_PARAM to make it expire immediately.
   *
   * @param cookieDomain - The domain of the cookie to clear
   * @param cookiePath - The path of the cookie to be deleted (defaults to '/')
   */
  private clearCookie(cookieDomain = '', cookiePath = '/'): void {
    const epoch = new Date(0);
    let cookieString = COOKIE_PARAM + '=' + COOKIE_REMOVAL_VALUE;
    cookieString += ';path=' + cookiePath;
    cookieString += ';expires=' + epoch.toUTCString();
    if (cookieDomain) cookieString += ';domain=' + cookieDomain + ';';
    cookieString += ';samesite=None;';
    if (this._outerWindow.location.protocol === 'https:') {
      cookieString += ' Secure ';
    }
    this._outerDocument.cookie = cookieString;
  }
}