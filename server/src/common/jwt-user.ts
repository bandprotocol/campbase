/**
 * User object to encapsulate as JWT
 */
export interface JWTUserInterface {
  readonly country_code: string
  readonly phone_number: string
  readonly email: string
  readonly display_name: string
  readonly profile_image: string
}

export interface DBUserInterface extends JWTUserInterface {
  [propName: string]: any
}

export class JWTUser implements JWTUserInterface {
  /**
   * A factory to initiate instance
   * @param dbUser
   */
  static createFromDBUser(dbUser: DBUserInterface) {
    return new JWTUser(
      dbUser.country_code,
      dbUser.phone_number,
      dbUser.email,
      dbUser.display_name,
      dbUser.profile_image
    )
  }

  constructor(
    readonly country_code: string,
    readonly phone_number: string,
    readonly email: string,
    readonly display_name: string,
    readonly profile_image: string
  ) {}

  get serialized(): JWTUserInterface {
    const {
      country_code,
      phone_number,
      email,
      display_name,
      profile_image,
    } = this

    return {
      country_code,
      phone_number,
      email,
      display_name,
      profile_image,
    }
  }
}
