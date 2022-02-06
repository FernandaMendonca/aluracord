import React from 'react';

import { Box, Button, Text, Image } from '@skynexui/components';

import appConfig from '../../config.json';
import { ProfileModal } from '../components/ProfileModal'

export function MessageList(props) {

  let { messages, profileHovered } = props;

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: '16px',
      }}
    >
      {messages.map((message) => {

        return (
          <>
            {profileHovered && <ProfileModal message={message} />}
            <Text
              key={message.id}
              tag="li"
              styleSheet={{
                borderRadius: '5px',
                padding: '6px',
                marginBottom: '12px',

                hover: {
                  backgroundColor: appConfig.theme.colors.neutrals[700],
                }
              }}
            >
              <Box
                styleSheet={{
                  alignItems: 'center',
                  display: 'flex',
                  marginBottom: '8px',
                  width: '100%',
                }}
              >

                <Button
                  //fix
                  styleSheet={{
                    position: 'absolute',
                    left: '90%'
                  }}
                  variant="secondary"
                  label='X'
                  size="xs"
                  rounded='full'
                  colorVariant="light"
                  onClick={() => { props.handleDeleteMessage(message.id) }}
                />

                <Image
                  styleSheet={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'inline-block',
                    cursor: 'pointer',
                    transition: 'transform .2s',
                    hover: {
                      transform: 'scale(2)',
                    },
                  }}
                  src={`https://github.com/${message.from}.png`}
                  onClick={() => props.handleProfileModal(message.from)}
                  alt="Profile Picture"
                />
                <Text
                  styleSheet={{
                    display: 'inline-block',
                    marginHorizontal: '8px',
                  }}
                  tag="strong">
                  {message.from}
                </Text>
                <Text
                  styleSheet={{
                    fontSize: '10px',
                    marginLeft: '8px',
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag="span"
                >
                  {message.date}
                </Text>
              </Box>

              {message.text.startsWith(":sticker:") ?
                <Image
                  styleSheet={{
                    marginHorizontal: '10px',
                    maxWidth: '150px'
                  }}
                  src={message.text.replace(":sticker:", '')} alt="sticker" /> :
                <Text
                  styleSheet={{
                    fontSize: '16px',
                    color: appConfig.theme.colors.neutrals[200],
                    marginLeft: '10px',
                  }}>
                  {message.text}
                </Text>
              }

            </Text>
          </>
        )
      })}

    </Box>
  );
}

export default MessageList;
