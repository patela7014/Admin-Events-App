import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'Teams',
        icon: 'bx-user',
        subItems: [
            {
                id: 3,
                label: 'New Team',
                link: '/teams/new',
                parentId: 2
            },
            {
                id: 4,
                label: 'Teams',
                link: '/teams',
                parentId: 2
            },
        ]
    },

];

