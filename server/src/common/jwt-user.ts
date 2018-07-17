import { DBUsers } from 'spec/db'

/**
 * User object to encapsulate as JWT
 */
export interface JWTUserInterface {
  readonly id?: number
  readonly country_code: string
  readonly phone_number: string
}

export class JWTUser implements JWTUserInterface {
  /**
   * A factory to initiate instance
   * @param dbUser
   */
  static createFromDBUser(dbUser: DBUsers) {
    return new JWTUser(dbUser.id, dbUser.country_code, dbUser.phone_number)
  }

  static readonly type = 'user'

  constructor(
    readonly id: number,
    readonly country_code: string,
    readonly phone_number: string
  ) {}

  get serialized(): JWTUserInterface & { type } {
    const { id, country_code, phone_number } = this

    return {
      id,
      country_code,
      phone_number,
      type: JWTUser.type,
    }
  }
}
