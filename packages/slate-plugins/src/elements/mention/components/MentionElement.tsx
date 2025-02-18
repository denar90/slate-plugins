import * as React from 'react';
import { classNamesFunction, styled } from '@uifabric/utilities';
import { useFocused, useSelected } from 'slate-react';
import { getHandler } from '../../../common/utils';
import {
  MentionElementProps,
  MentionElementStyleProps,
  MentionElementStyles,
} from '../types';
import { getMentionElementStyles } from './MentionElement.styles';

const getClassNames = classNamesFunction<
  MentionElementStyleProps,
  MentionElementStyles
>();

/**
 *   MentionElement with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */
export const MentionElementBase = ({
  attributes,
  children,
  element,
  prefix,
  className,
  styles,
  as: Tag = 'span',
  onClick,
}: MentionElementProps) => {
  const selected = useSelected();
  const focused = useFocused();

  const classNames = getClassNames(styles, {
    className,
    // Other style props
    selected,
    focused,
  });

  return (
    <Tag
      {...attributes}
      data-slate-value={element.value}
      className={classNames.root}
      contentEditable={false}
      onClick={getHandler(onClick, { value: element.value })}
    >
      {prefix}
      {element.value}
      {children}
    </Tag>
  );
};

/**
 * MentionElement
 */
export const MentionElement = styled<
  MentionElementProps,
  MentionElementStyleProps,
  MentionElementStyles
>(MentionElementBase, getMentionElementStyles, undefined, {
  scope: 'MentionElement',
});
