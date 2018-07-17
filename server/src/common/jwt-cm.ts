import { DBCommunityManagers } from 'spec/db'

/**
 * CM object to encapsulate as JWT
 */
export interface JWTCommunityManagerInterface {
  readonly id: number
  readonly username: string
  readonly email: string
}

export class JWTCommunityManager implements JWTCommunityManagerInterface {
  /**
   * A factory to initiate instance
   * @param dbCommunityManager
   */
  static createFromDBCommunityManager(dbCommunityManager: DBCommunityManagers) {
    return new JWTCommunityManager(
      dbCommunityManager.id,
      dbCommunityManager.username,
      dbCommunityManager.email
    )
  }

  static readonly type = 'cm'

  constructor(
    readonly id: number,
    readonly username: string,
    readonly email: string
  ) {}

  get serialized(): JWTCommunityManagerInterface & { type } {
    const { id, username, email } = this

    return {
      id,
      username,
      email,
      type: JWTCommunityManager.type,
    }
  }
}
