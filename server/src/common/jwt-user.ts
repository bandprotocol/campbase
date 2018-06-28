/**
 * User object to encapsulate as JWT
 */
export interface JWTUserInterface {
  readonly id?: number
  readonly country_code: string
  readonly phone_number: string
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
    return new JWTUser(dbUser.id, dbUser.country_code, dbUser.phone_number)
  }

  constructor(
    readonly id: number,
    readonly country_code: string,
    readonly phone_number: string
  ) {}

  get serialized(): JWTUserInterface {
    const { id, country_code, phone_number } = this

    return {
      id,
      country_code,
      phone_number,
    }
  }
}
