import '../styles/globals.css'

function GlobalStyle() {
  return (

    <style global jsx>{`
      
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;700&display=swap');
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
        overflow-y: auto;
        scroll-behavior: smooth;
      }

      ::-webkit-scrollbar {
        width: 10px;
      } 
      
      ::-webkit-scrollbar-thumb {   
        background-color: darkgrey;  
        border-radius: 5px; 
        }

      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */ 
    `}</style>
  );
}

function MyApp({ Component, pageProps }) {

  return <>
    <GlobalStyle />
    <Component {...pageProps} />
  </>
}

export default MyApp
