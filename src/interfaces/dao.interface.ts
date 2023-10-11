export declare interface Dao {
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
  daoUri: string
}

export type CreateDaoPayload = Omit<Dao, "state" | "daoUri">
