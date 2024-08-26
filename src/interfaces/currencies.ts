export interface Currency {
  id: number
  title: string
  kind: string
  symbol: string
  native: boolean
  disabled: boolean
  disabled_message?: string
  merchant: Merchant
  platforms?: Platform[]
}

export interface Merchant {
  price: boolean
  pay: boolean
  receive: boolean
}

export interface Platform {
  id: number
  id_name: string
  title: string
  enabled: boolean
}
