export declare interface Dao {
  id: number
  address: string
  network: string
  name: string
  description: string
  framework: string
  membersUri: string
  proposalsUri: string
  issuersUri: string
  contractsRegUri?: string
  managerAddress?: string
  governanceDocument?: string
  state: number
  tokenId: number
  creator: string
}

export default Dao

export type GetDaosReponse = Dao[]
export type GetDaosParams = {
  search?: string
  creator?: string
  state?: string
}

export type CreateDaoPayload = Omit<Dao, "id" | "state" | "tokenId">
export type CreateDaoResponse = Dao
export const DaoExistsError = "DAO already exists"

export type DeleteDaoResponse = "OK"

export type ValidateDaoPayload = {
  validate: boolean
  opHash?: string
}

export type RevokeDaoPayload = {
  opHash: string
}
