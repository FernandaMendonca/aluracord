import React from 'react';

import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { useRouter } from 'next/router'

import appConfig from '../config.json';
import { Title } from '../src/components/Title'


export default function HomePage() {

  const [username, setUsername] = React.useState("FernandaMendonca");
  const router = useRouter();

  const submit = () => {
    router.push(`/chat?username=${username}`);
  }

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(90deg, rgba(4,102,200,1) 0%, rgba(0,18,51,1) 100%)',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.primary['200'],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}

            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2">Boas vindas de volta! {username || ""}</Title>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals['300'] }}>
              {appConfig.name} - nao tem tema
            </Text>

            <TextField
              type='text'
              value={username}
              onChange={function (event) {
                const val = event.target.value;
                setUsername(val);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals['200'],
                  mainColor: appConfig.theme.colors.neutrals['900'],
                  mainColorHighlight: appConfig.theme.colors.primary['900'],
                  backgroundColor: appConfig.theme.colors.neutrals['800'],
                },
              }}
            />

            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary['500'],
                mainColorLight: appConfig.theme.colors.primary['500'],
                mainColorStrong: appConfig.theme.colors.primary['600'],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.primary['500'],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals['999'],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            {username &&
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                src={`https://github.com/${username}.png`}
                alt="Profile Picture"
              />
            }
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals['200'],
                backgroundColor: appConfig.theme.colors.neutrals['900'],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
