import styles from "../styles/content.module.css"
import { useQuery } from "@apollo/client"
import type { item } from "../../types/item"
import { useCharacterStore } from "../../store/useStore"
import { GET_CHARACTER } from "../../graphql/queries"

const fieldInformation: {
  label: string
  key: keyof item
}[] = [
  { label: "Name", key: "name" },
  { label: "Species", key: "species" },
  { label: "Status", key: "status" },
  { label: "Gender", key: "gender" },
  { label: "Location", key: "location" },
  { label: "Origin", key: "origin" },
]

export const Content: React.FC = () => {
  const id = useCharacterStore((state) => state.id)

  const { loading, error, data } = useQuery(GET_CHARACTER, {
    variables: { characterId: id },
    skip: !id,
  })

  if (!id) {
    return <main className={styles.main}></main>
  }

  if (loading) {
    return <main className={styles.main}></main>
  }

  if (error) {
    return <main className={styles.main}></main>
  }

  const character: item = data.character
  const first5Episodes = data.character.episode.slice(0, 5)
  return (
    <main className={styles.main}>
      <section className={styles.information}>
        <h2 className={styles.information__title}>
          General Information
        </h2>
        {fieldInformation.map(({ label, key }) => (
          <div
            key={key}
            className={styles.information__description}
          >
            <h3 className={styles.description__title}>
              {label}
            </h3>
            <p className={styles.description__value}>
              {typeof character[key] === "object"
                ? character[key]?.name
                : character[key]}
            </p>
          </div>
        ))}
      </section>
      <section className={styles.episodes}>
        <div className={styles.episodes__description}>
          <h2 className={styles.episodes__title}>
            Episodes
          </h2>
          {first5Episodes.map((ep: any) => (
            <div key={ep.id} className={styles.episode}>
              <h3 className={styles.episode__name}>
                {ep.name}
              </h3>
            </div>
          ))}
        </div>
        <div className={styles.character__image}>
          <img
            src={character.image}
            alt={character.name}
            className={styles.image}
          />
        </div>
      </section>
    </main>
  )
}
