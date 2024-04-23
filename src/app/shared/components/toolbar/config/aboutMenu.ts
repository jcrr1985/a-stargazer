import { NeosMenuItem } from '../../menu/menu.component';

export const aboutMenu: NeosMenuItem[] = [
  {
    labelTranslateKey: 'neosWiki',
    callback: () => {
      window.open(
        'https://workspace.ebu.ch/x/gQYNB',
        '_blank',
        'noopener, noreferrer'
      );
    },
  },
];
