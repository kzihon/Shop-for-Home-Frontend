interface IUserDetails {
  id: number
  email: string
  firstname: string
  lastname: string
  role: 'ADMIN' | 'CUSTOMER'
}

export default IUserDetails
