export type item = {
  id: string
  image: string
  name: string
  species: string
  status: string
  gender: string
  location: {
    name: string
  }
  origin: {
    name: string
  }
  episode: {
    id: string
    name: string
  }
}
