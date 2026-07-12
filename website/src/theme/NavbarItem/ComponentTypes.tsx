import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import PwaInstallButton from './custom-PwaInstallButton';
import SupportButton from './custom-SupportButton';

const customComponentTypes = {
  ...ComponentTypes,
  'custom-PwaInstallButton': PwaInstallButton,
  'custom-SupportButton': SupportButton,
};

export default customComponentTypes;
