/**
 * @file ComponentTypes.tsx
 * @description Theme override extending Docusaurus navbar component registry 
 * to register custom PWA install and Support navbar buttons.
 * 
 * Layer: Navigation theme component registry overrides.
 * Boundary: Merges custom components into @theme-original/NavbarItem/ComponentTypes.
 */

import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import PwaInstallButton from './custom-PwaInstallButton';
import SupportButton from './custom-SupportButton';

const customComponentTypes = {
  ...ComponentTypes,
  'custom-PwaInstallButton': PwaInstallButton,
  'custom-SupportButton': SupportButton,
};

export default customComponentTypes;
