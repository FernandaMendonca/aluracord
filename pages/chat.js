import React from 'react';

import { Box, TextField, Button } from '@skynexui/components';
import LinearProgress from '@mui/material/LinearProgress';
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/router'

import appConfig from '../config.json';
import { StickerButton } from '../src/components/StickerButton'
import { MessageList } from '../src/components/MessageList'
import { Header } from '../src/components/Header'

// add loading
// add mouseover na foto de perfil
// add outros botoes
// add tema

export default function chat() {

  const router = useRouter();
  const currentUser = router.query.username ? router.query.username : "FernandaMendonca";

  const [message, setMessage] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);
  const [profileHovered, setProfileHovered] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // const url = process.env.SUPABASE_URL;
  // const key = process.env.SUPABASE_KEY;

  const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzUwODc2NiwiZXhwIjoxOTU5MDg0NzY2fQ.dz67jKkM832L6-Z6B2qX-mah1_a96qbBcO0cOBStGNc'
  const url = 'https://broaakurjlrjwklpnbrf.supabase.co'

  const supabase = createClient(url, key);

  const handleNewMessage = (newMessage) => {
    const textMessage = {
      from: currentUser,
      text: newMessage,
      date: new Date().toLocaleDateString(),
    };

    supabase
      .from('messages')
      .insert([
        textMessage
      ])
      .then(() => {
      });

    setMessage('');
  }

  const getMessages = () => {
    supabase
      .from('messages')
      .select('*')
      .then(({ data }) => {
        setMessageList(data);
      })

  }

  const listenRealTimeMessages = (handleNewMessage) => {
    return supabase
      .from('messages')
      .on('INSERT', (response) => {
        handleNewMessage(response.new);
      })
      .on('DELETE', () => {
        getMessages();
      })
      .subscribe();
  }

  const handleDeleteMessage = (idMessage) => {

    supabase
      .from('messages')
      .delete()
      .match({ id: idMessage })
      .then(({ data }) => {
        console.log('REMOVE message:>>', data)
      })
  }

  React.useEffect(() => {
    setLoading(true)
    supabase
      .from('messages')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        setMessageList(data)
      });

    const subscription = listenRealTimeMessages((newMessage) => {

      setMessageList((currentValue) => {
        return [
          newMessage,
          ...currentValue,
        ]
      });
    });
    setLoading(false)
    return () => {
      subscription.unsubscribe();
    }
  }, []);

  const handleProfileModal = () => {
    setProfileHovered(true)
  }

  //fix
  if (loading) return <LinearProgress variant="buffer" valueBuffer={buffer} />


  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        color: appConfig.theme.colors.neutrals['000'],
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />

        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >
          <MessageList
            messages={messageList}
            handleDeleteMessage={(idMessage) => { handleDeleteMessage(idMessage) }}
            handleProfileModal={() => { handleProfileModal() }}
            profileHovered={profileHovered}
          />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: appConfig.theme.colors.neutrals[800],
            }}
          >
            <TextField
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              value={message}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNewMessage(message);
                }

              }}
              onChange={(event) => {
                const val = event.target.value;
                setMessage(val);
              }
              }
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Box
              styleSheet={{
                margin: '5px 15px 0 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>

              <Button
                onClick={() => console.log(message)}
                type='button'
                iconName='folder'
                styleSheet={{
                  margin: '5px'
                }}
              />

              <StickerButton
                onStickerClick={(sticker) => {
                  handleNewMessage(`:sticker:${sticker}`);
                }}
              />

              <Button
                type='submit'
                iconName='arrowRight'
                onClick={(e) => {
                  e.preventDefault();
                  handleNewMessage(message);
                }}
                styleSheet={{
                  margin: '5px',
                  hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                }}
              />

            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

