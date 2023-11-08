import { GlobeAltIcon } from '@heroicons/react/24/solid'

function Header() {
  return (
    <header className="flex items-center h-16 shadow-md py-2 px-10">
      <GlobeAltIcon className="h-6 w-6 mr-2" />
      <h1 className="text-xl font-medium">Fabulous Map - Firebase Quests application </h1>
    </header>
  )
}

export default Header
