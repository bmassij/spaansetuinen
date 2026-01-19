// Auto-generated navigation data for Spaanse Tuin & Zo
// Gebruik exact de labels, hrefs en volgorde zoals in components/Navbar.tsx

export type NavNode = LinkItem | DropdownItem | MegaItem;

export interface NavItemBase {
  id: string;
  label: string;
}

export interface LinkItem extends NavItemBase {
  type: 'link';
  href: string;
}

export interface DropdownItem extends NavItemBase {
  type: 'dropdown';
  href?: string;
  children: LinkItem[];
}

export interface MegaColumn {
  title: string;
  items: LinkItem[];
}

export interface MegaItem extends NavItemBase {
  type: 'mega';
  columns: MegaColumn[];
}

export const NAV_DATA: NavNode[] = [
  {
    type: 'link',
    id: 'home',
    label: 'Home',
    href: '/',
  },
  {
    type: 'mega',
    id: 'assortiment-bomen',
    label: 'Assortiment bomen',
    columns: [
      {
        title: 'Palmbomen',
        items: [
          { type: 'link', id: 'trachycarpus-fortunei', label: 'Trachycarpus Fortunei', href: '/bomen/trachycarpus-fortunei' },
          { type: 'link', id: 'yucca-rostrata', label: 'Yucca Rostrata', href: '/bomen/yucca-rostrata' },
        ],
      },
      {
        title: 'Vijgenbomen',
        items: [
          { type: 'link', id: 'ficus-carica', label: 'Ficus Carica', href: '/bomen/ficus-carica' },
        ],
      },
      {
        title: 'Olijfbomen',
        items: [
          { type: 'link', id: 'olea-europea', label: 'Olea Europea', href: '/bomen/olea-europea' },
          { type: 'link', id: 'olea-europea-bonsai-doble', label: 'Olea Europea Bonsai / Bonsai doble', href: '/bomen/olea-europea' },
          { type: 'link', id: 'olea-europea-copa', label: 'Olea Europea Copa', href: '/bomen/olea-europea' },
          { type: 'link', id: 'olea-europea-hoija-blanca', label: 'Olea Europea Hoija Blanca', href: '/bomen/olea-europea' },
          { type: 'link', id: 'olea-europea-piel-joven', label: 'Olea Europea Piel Joven', href: '/bomen/olea-europea' },
          { type: 'link', id: 'olea-europea-piel-vieja', label: 'Olea Europea Piel Vieja', href: '/bomen/olea-europea' },
          { type: 'link', id: 'olea-europea-bonsai-ramif', label: 'Olea Europea Bonsai Ramif', href: '/bomen/olea-europea' },
          { type: 'link', id: 'olea-europea-pata-bola', label: 'Olea Europea Pata Bola', href: '/bomen/olea-europea' },
          { type: 'link', id: 'olea-europea-tubo', label: 'Olea Europea Tubo', href: '/bomen/olea-europea' },
          { type: 'link', id: 'olea-europea-plato', label: 'Olea Europea Plato', href: '/bomen/olea-europea' },
          { type: 'link', id: 'olea-europea-lechin', label: 'Olea Europea Lechin', href: '/bomen/olea-europea' },
          { type: 'link', id: 'olea-europea-multi-bola-multi-plato', label: 'Olea Europea Multi Bola / Multi Plato', href: '/bomen/olea-europea' },
          { type: 'link', id: 'olea-europea-tarrina', label: 'Olea Europea Tarrina', href: '/bomen/olea-europea' },
          { type: 'link', id: 'olea-europea-andalusia', label: 'Olea Europea Andalusia', href: '/bomen/olea-europea' },
          { type: 'link', id: 'olea-europea-pon-pon', label: 'Olea Europea Pon Pon', href: '/bomen/olea-europea' },
        ],
      },
      {
        title: 'Druivenranken',
        items: [
          { type: 'link', id: 'vitis-vinifera', label: 'Vitis Vinifera', href: '/bomen/vitis-vinifera' },
        ],
      },
    ],
  },
  {
    type: 'dropdown',
    id: 'bloembakken',
    label: 'Bloembakken',
    href: '/bloembakken',
    children: [
      { type: 'link', id: 'bloembakken-op-maat', label: 'Bloembakken op maat', href: '/bloembakken-op-maat' },
    ],
  },
  {
    type: 'dropdown',
    id: 'potgrond-en-voeding',
    label: 'Potgrond en Voeding',
    children: [
      { type: 'link', id: 'mediterrane-potgrond', label: 'Mediterrane potgrond', href: '/mediterrane-potgrond' },
      { type: 'link', id: 'mediterrane-voeding', label: 'Mediterrane voeding', href: '/mediterrane-voeding' },
      { type: 'link', id: 'hydrokorrels', label: 'Hydrokorrels', href: '/hydrokorrels' },
      { type: 'link', id: 'boomschors', label: 'Boomschors', href: '/boomschors' },
    ],
  },
  { type: 'link', id: 'plant-en-voedingstips', label: 'Plant- en voedingstips', href: '/plant-en-voedingstips' },
  { type: 'link', id: 'onze-service', label: 'Onze service', href: '/bezorgen' },
  { type: 'link', id: 'verhuur', label: 'Verhuur', href: '/verhuur' },
  { type: 'link', id: 'impressie', label: 'Impressie', href: '/impressie' },
];
