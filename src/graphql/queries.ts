import { gql } from "@apollo/client"

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        next
      }
      results {
        id
        name
        species
      }
    }
  }
`
export const GET_CHARACTER = gql`
  query GetCharacter($characterId: ID!) {
    character(id: $characterId) {
      image
      name
      species
      status
      gender
      location {
        name
      }
      origin {
        name
      }
      episode {
        id
        name
      }
    }
  }
`
