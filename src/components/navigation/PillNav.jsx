import styled from 'styled-components'
import PillButton from '../ui/PillButton'

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  gap: 1px;
  background: ${({ theme }) => theme.colors.orange.dark};
  border-radius: 9999px;
  padding: 0;
  position: fixed;
  top: 40px;
  right: 40px;
  z-index: 100;
`

const tabs = [
  { id: 'about', label: 'ABOUT' },
  { id: 'services', label: 'SERVICES' },
  { id: 'work', label: 'WORK' },
]

export default function PillNav({ activeView, onNavigate }) {
  return (
    <NavBar role="tablist" aria-label="Main navigation">
      {tabs.map((tab) => (
        <PillButton
          key={tab.id}
          variant={activeView === tab.id ? 'nav-active' : 'nav-inactive'}
          onClick={() => onNavigate(tab.id)}
          role="tab"
          aria-selected={activeView === tab.id}
        >
          {tab.label}
        </PillButton>
      ))}
    </NavBar>
  )
}
