export interface GetWhois {
  server: string
  name: string
  idnName: string
  status: string[]
  nameserver: string[]
  ips: string
  created: Date
  changed: Date
  expires: Date
  registered: boolean
  dnssec: string
  whoisserver: string
  contacts: Contacts
  registrar: Registrar
  rawdata: string[]
  network: null
  exception: null
  parsedContacts: boolean
  ask_whois: string
}

export interface Contacts {
  owner: Admin[]
  admin: Admin[]
  tech: Admin[]
}

export interface Admin {
  handle: null
  type: null
  name: null
  organization: string
  email: string
  address: null
  zipcode: null
  city: null
  state: string
  country: string
  phone: null
  fax: null
  created: null
  changed: null
}

export interface Registrar {
  id: string
  name: string
  email: string
  url: string
  phone: string
}
