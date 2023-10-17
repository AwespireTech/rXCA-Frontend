import { Dao } from "./interfaces/dao.interface"

export const API_URL = "https://rxca.imlab.app/api/dao"

export const networkOptions = ["Mainnet"]

export const defaultNetwork = networkOptions[0]

export const frameworkOptions = ["Custom"]

export const defaultFramework = frameworkOptions[0]

export const testDao: Dao = {
  address: "0x1234567890123456789012345678901234567890",
  state: 0,
  network: "mainnet",
  name: "Test DAO",
  description: "This is a test DAO",
  framework: "Custom",
  membersUri: "members uri",
  proposalsUri: "proposals uri",
  issuersUri: "issuers uri",
  contractsRegUri: "contracts reg uri",
  managerAddress: "manager address",
  governanceDocument: "governance document",
  daoUri: "xxx"
}
