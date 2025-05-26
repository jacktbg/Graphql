// Sidebar.tsx
import styles from "../styles/sidebar.module.css"
import loadingImg from "../../assets/loading.svg"
import failedImg from "../../assets/failed.svg"
import type { item } from "../../types/item"
import { useQuery } from "@apollo/client"
import { GET_CHARACTERS } from "../../graphql/queries"
import { useCharacterStore } from "../../store/useStore"
import { SvgComponent } from "./Icons"
import { useEffect, useRef, useState } from "react"

export const Sidebar: React.FC = () => {
  const [page, setPage] = useState(1)
  const [allCharacters, setAllCharacters] = useState<
    item[]
  >([])
  const [hasMore, setHasMore] = useState(true)
  const sidebarRef = useRef<HTMLElement>(null)

  const { data, loading, error, fetchMore } = useQuery(
    GET_CHARACTERS,
    {
      variables: { page },
      notifyOnNetworkStatusChange: true,
    }
  )

  const setId = useCharacterStore((state) => state.setId)

  // Load initial + append on fetchMore
  useEffect(() => {
    if (data?.characters?.results) {
      setAllCharacters((prev) => [
        ...prev,
        ...data.characters.results,
      ])
      if (!data.characters.info?.next) {
        setHasMore(false)
      }
    }
  }, [data])

  // Infinite scroll
  const handleScroll = () => {
    const el = sidebarRef.current
    if (
      el &&
      hasMore &&
      el.scrollTop + el.clientHeight >=
        el.scrollHeight - 100 &&
      !loading
    ) {
      // Add a 200ms delay before fetching
      setTimeout(() => {
        fetchMore({
          variables: { page: page + 1 },
        })
        setPage((prev) => prev + 1)
      }, 200)
    }
  }

  useEffect(() => {
    const el = sidebarRef.current
    if (el) {
      el.addEventListener("scroll", handleScroll)
      return () =>
        el.removeEventListener("scroll", handleScroll)
    }
  }, [hasMore, loading, page])

  if (error)
    return (
      <aside className={styles.lf}>
        <img src={failedImg} alt="failed" />
      </aside>
    )

  return (
    <aside className={styles.sidebar} ref={sidebarRef}>
      <ul className={styles.ul}>
        {allCharacters.map((character: item) => (
          <li
            className={styles.options}
            key={character.id}
            onClick={() => setId(character.id)}
          >
            <div className={styles.descriptionContainer}>
              <p className={styles.name}>
                {character.name}
              </p>
              <p className={styles.species}>
                {character.species}
              </p>
            </div>
            <div className={styles.iconContainer}>
              <SvgComponent
                width={"20%"}
                color={"var(--lc-text)"}
              />
            </div>
          </li>
        ))}
        {loading && (
          <li className={styles.loading}>
            <img src={loadingImg} alt="loading" />
          </li>
        )}
      </ul>
    </aside>
  )
}
