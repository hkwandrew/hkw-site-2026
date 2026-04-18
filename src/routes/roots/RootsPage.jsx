import RootsScene from './RootsScene'
import useRootsPageTransition from './useRootsPageTransition'

export default function RootsPage() {
  const { sectionRef } = useRootsPageTransition()

  return <RootsScene sceneRef={sectionRef} />
}
