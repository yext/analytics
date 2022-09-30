/**
 * Information used to associate analytics with a particular user.
 *
 * @public
 */
export interface Visitor {
  /** The ID associated with the user. */
  id: string,
  /**
   * The type of visitor.
   *
   * @example 'YEXT_USER' for Yext Auth
   */
   idMethod?: string
}
