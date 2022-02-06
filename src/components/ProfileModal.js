import React from 'react';

import { Box, Button, Text, Image } from '@skynexui/components';

import appConfig from '../../config.json';

export function ProfileModal(props) {

  const { message } = props;

  return( <Box
    styleSheet={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 1,
    }}
  >
    <Box
      styleSheet={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: appConfig.theme.colors.neutrals[800],
        width: '25%',
        height: '350px',
        boxShadow: '5px 5px 5px black',
        borderRadius: '10px',
      }}
    >
      <Button
        styleSheet={{
          alignSelf: 'flex-end',
          justifyContent: 'center',
          margin: '15px',
        }}
        variant="primary"
        label='X'
        rounded='full'
        colorVariant="light"
        onClick={() => { alert('falta uma função aqui')}}
      />

      <Image
        styleSheet={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          display: 'inline-block',
          cursor: 'pointer'
        }}
        src={`https://github.com/${message.from}.png`}
        alt="Profile Picture"
      />
      <Box
        styleSheet={{
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '30px 0',
        }}
      >
        <Text
          styleSheet={{
            fontSize: '12px',
            color: 'white',
            margin: '10px 0'
          }}
        >
          {message.from}
        </Text>
        <Text
          styleSheet={{
            fontSize: '12px',
            color: 'white',
            margin: '10px 0'
          }}
        >
          {message.from}
        </Text>
        <Text
          styleSheet={{
            fontSize: '12px',
            color: 'white',
            margin: '10px 0'
          }}
        >
          {message.from}
        </Text>
      </Box>

      <a href={`https://github.com/${message.from}`}>
        <Button
          iconName="github"
          label="Go to github"
          variant="tertiary"
          colorVariant="light"
          styleSheet={{
            marginBottom: '15px'
          }}
        />
      </a>

    </Box>

  </Box>);
}

export default ProfileModal;
