import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    ArchiveBoxXMarkIcon,
    ChevronDownIcon,
    PencilIcon,
    Square2StackIcon,
    TrashIcon,
    CurrencyDollarIcon,
    BanknotesIcon,
    CalculatorIcon,
    InformationCircleIcon,
    UserCircleIcon
} from '@heroicons/react/16/solid'

// Map of icon keys to icon components
const iconMap = {
    archive: ArchiveBoxXMarkIcon,
    chevron: ChevronDownIcon,
    pencil: PencilIcon,
    stack: Square2StackIcon,
    trash: TrashIcon,
    currencyDolar: CurrencyDollarIcon,
    bankDolar: BanknotesIcon,
    calculator: CalculatorIcon,
    informationCircle: InformationCircleIcon,
    userClient: UserCircleIcon
}

const MenuAcordeon = ({ title, optionLink }) => {
    return (
        <div className="hidden md:ml-6 md:flex md:space-x-8">
            <Menu as="div" className="relative">
                <MenuButton className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                    {title}
                </MenuButton>
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <MenuItems className="absolute left-full mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <div className="py-1">
                            {optionLink.map((option, index) => {
                                const Icon = iconMap[option.iconKey];
                                return (
                                    <MenuItem key={index}>
                                        {({ active }) => (
                                            <Link
                                                to={option.linkTo}
                                                className={`flex items-center px-4 py-2 text-sm ${active ? 'bg-gray-100' : 'text-gray-700'}`}
                                            >
                                                {Icon && <Icon className="mr-3 h-5 w-5" aria-hidden="true" />}
                                                {option.label}
                                            </Link>
                                        )}
                                    </MenuItem>
                                );
                            })}
                        </div>
                    </MenuItems>
                </Transition>
            </Menu>
        </div>
    )
}

MenuAcordeon.propTypes = {
    title: PropTypes.string.isRequired,
    optionLink: PropTypes.arrayOf(
        PropTypes.shape({
            linkTo: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            iconKey: PropTypes.string, // Add iconKey to prop types
        })
    ).isRequired
}

export default MenuAcordeon