
/**
 * Detects if the browser is firefox and return true if so
 * 
 */
export function isFirefox(
  ): boolean {
    // keepAlive is not supported in Firefox or Firefox for Android
    return (
      !!navigator.userAgent &&
      navigator.userAgent.toLowerCase().includes('firefox')
    );
}