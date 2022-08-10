export interface Countrie {
  name: string
  topLevelDomain: string[]
  alpha2Code: string
  alpha3Code: string
  callingCodes: string[]
  capital: string
  altSpellings: string[]
  region: string
  subregion: string
  population: number
  latlng: number[]
  demonym: string
  area: number
  gini: number
  timezones: string[]
  borders: string[]
  nativeName: string
  numericCode: string
  currencies: Currency[]
  languages: Language[]
  translations: Translations
  flag: string
  regionalBlocs: RegionalBloc[]
}

interface Currency {
  code: string
  name: string
  symbol: string
}

interface Language {
  iso639_1: string
  iso639_2: string
  name: string
  nativeName: string
}

interface Translations {
  de: string
  es: string
  fr: string
  ja: string
  it: string
  br: string
  pt: string
}

interface RegionalBloc {
  acronym: string
  name: string
  otherAcronyms: string[]
  otherNames: string[]
}
