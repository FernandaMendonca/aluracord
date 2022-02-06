
import React from 'react';

import appConfig from '../../config.json';

export function Title (props) {

  const Tag = props.tag || 'h1';

  return (
    <>
      <Tag> {props.children} </Tag>
      <style jsx>
        {
          `${Tag} {
            color: ${appConfig.theme.colors.neutrals['050']};
            font-size: 24px;
            font-weight: 600;
          }`
        }
      </style>
    </>
  )
}

export default Title;