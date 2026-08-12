/**
 * @file MDXComponents/index.tsx
 * @description Central MDX component mapping registry providing custom styling wrappers for standard Markdown elements.
 * 
 * Layer: Theme MDX element overrides.
 * Boundary: Controls rendering wrappers for headings, tables, links, images, and admonitions.
 */

import React, {type ComponentProps, type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import MDXCode from '@theme/MDXComponents/Code';
import MDXA from '@theme/MDXComponents/A';
import MDXPre from '@theme/MDXComponents/Pre';
import MDXDetails from '@theme/MDXComponents/Details';
import MDXHeading from '@theme/MDXComponents/Heading';
import MDXUl from '@theme/MDXComponents/Ul';
import MDXLi from '@theme/MDXComponents/Li';
import MDXImg from '@theme/MDXComponents/Img';
import Admonition from '@theme/Admonition';
import Mermaid from '@theme/Mermaid';

import type {MDXComponentsObject} from '@theme/MDXComponents';

/**
 * Extracts plain text recursively from a React node tree for row metadata extraction.
 * 
 * @param {ReactNode} node - React element, array, string, or primitive node.
 * @returns {string} Concatenated plain-text representation of the node tree.
 */
function getNodeText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return '';
  }
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getNodeText).join('');
  }
  if (React.isValidElement(node)) {
    return getNodeText((node.props as any)?.children);
  }
  return '';
}

/**
 * Traverses React element tree of Markdown tables to attach contextual metadata from sibling columns
 * into hidden screen-reader spans within each table cell. This allows search engines and Algolia crawlers
 * to associate isolated column values (such as developer names or model numbers) with their parent row context.
 * 
 * @param {ReactNode} children - Table child elements (<thead>, <tbody>, etc.) passed from MDX parser.
 * @returns {ReactNode} Transformed React element tree containing injected .algolia-search-context spans.
 */
function enhanceTableChildren(children: ReactNode): ReactNode {
  try {
    const childrenArray = React.Children.toArray(children);
    let headers: string[] = [];

    // Extract table column headers from <thead>
    childrenArray.forEach((child) => {
      if (React.isValidElement(child) && child.type === 'thead') {
        const theadChildren = React.Children.toArray((child.props as any)?.children);
        theadChildren.forEach((tr) => {
          if (React.isValidElement(tr) && tr.type === 'tr') {
            const thList = React.Children.toArray((tr.props as any)?.children);
            headers = thList.map((th) => getNodeText(th).trim());
          }
        });
      }
    });

    if (headers.length === 0) {
      return children;
    }

    // Process <tbody> rows to attach cross-column context
    return childrenArray.map((child) => {
      if (!React.isValidElement(child) || child.type !== 'tbody') {
        return child;
      }

      const rows = React.Children.toArray((child.props as any)?.children);
      const enhancedRows = rows.map((tr) => {
        if (!React.isValidElement(tr) || tr.type !== 'tr') {
          return tr;
        }

        const cells = React.Children.toArray((tr.props as any)?.children);
        if (cells.length === 0) {
          return tr;
        }

        // Extract cleaned text representation of each cell in the row
        const cellTexts = cells.map((cell) => getNodeText(cell).trim().replace(/\s+/g, ' '));

        const enhancedCells = cells.map((cell, index) => {
          if (!React.isValidElement(cell) || (cell.type !== 'td' && cell.type !== 'th')) {
            return cell;
          }

          // Build context string from all sibling cells in the same row
          const otherContextParts: string[] = [];
          cellTexts.forEach((text, i) => {
            if (i !== index && text && headers[i]) {
              const cleanHeader = headers[i].replace(/\s*\/\s*/g, '/');
              otherContextParts.push(`${cleanHeader}: ${text}`);
            }
          });

          if (otherContextParts.length === 0) {
            return cell;
          }

          const contextStr = otherContextParts.join(' — ');
          const existingChildren = (cell.props as any)?.children;

          return React.cloneElement(cell, {}, [
            existingChildren,
            <span key="algolia-ctx" className="algolia-search-context sr-only">
              {` (${contextStr})`}
            </span>,
          ]);
        });

        return React.cloneElement(tr, {}, enhancedCells);
      });

      return React.cloneElement(child, {}, enhancedRows);
    });
  } catch (_err) {
    return children;
  }
}

const MDXComponents: MDXComponentsObject = {
  Head,
  details: MDXDetails, // For MD mode support, see https://github.com/facebook/docusaurus/issues/9092#issuecomment-1602902274
  Details: MDXDetails,
  code: MDXCode,
  a: MDXA,
  pre: MDXPre,
  ul: MDXUl,
  li: MDXLi,
  img: MDXImg,
  h1: (props: ComponentProps<'h1'>) => <MDXHeading as="h1" {...props} />,
  h2: (props: ComponentProps<'h2'>) => <MDXHeading as="h2" {...props} />,
  h3: (props: ComponentProps<'h3'>) => <MDXHeading as="h3" {...props} />,
  h4: (props: ComponentProps<'h4'>) => <MDXHeading as="h4" {...props} />,
  h5: (props: ComponentProps<'h5'>) => <MDXHeading as="h5" {...props} />,
  h6: (props: ComponentProps<'h6'>) => <MDXHeading as="h6" {...props} />,
  table: (props: ComponentProps<'table'>) => (
    <div className="table-responsive-fallback">
      <table {...props}>{enhanceTableChildren(props.children)}</table>
    </div>
  ),
  admonition: Admonition,
  mermaid: Mermaid,
};

export default MDXComponents;
