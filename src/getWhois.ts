interface Whois {
  domain: string
  sld: string
  tld: string
  valid: boolean
  available: boolean
  created_at: string
  updated_at: string
  expires_at: string
  registrar: string
  whois: string
}

const getWhois = async (domain: string): Promise<Whois | undefined> => {
  try {
    const whois = await fetch(
      `https://domain-checker7.p.rapidapi.com/whois?domain=${domain}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '0a901a0565msh04fdbe1940dcf12p1bf25ajsn3eb95bcf8d21',
          'X-RapidAPI-Host': 'domain-checker7.p.rapidapi.com'
        }
      }
    )
    return await whois.json()
  } catch (error) {
    console.error(error)
  }

  return undefined
}

export default getWhois
