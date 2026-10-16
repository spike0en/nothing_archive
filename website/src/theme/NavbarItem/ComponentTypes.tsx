import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import PwaInstallButton from './custom-PwaInstallButton';
import SupportButton from './custom-SupportButton';
import CursorToggle from './custom-CursorToggle';

const customComponentTypes = {
  ...ComponentTypes,
  'custom-PwaInstallButton': PwaInstallButton,
  'custom-SupportButton': SupportButton,
  'custom-CursorToggle': CursorToggle,
};

export default customComponentTypes;
