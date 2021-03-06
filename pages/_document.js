import ServerStyleSheets from '@mui/styles/node/ServerStyleSheets';
import Document , {Head, Html, Main, NextScript} from 'next/document'
import React from 'react';



export default class MyDocument extends Document{
render(){
    return(
        <Html lang='en'>
            <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            </Head>
            <body>
                <Main />

               <NextScript/>
            </body>
        </Html>
    );
}

}
MyDocument.getInitialProps = async(ctx) => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>{
       return originalRenderPage({
            enhanceApp:(App) =>(props) => sheets.collect(<App {...props} />),
        });
    };
    const initialProps = await Document.getInitialProps(ctx);
    return{
        ...initialProps,
        styles: [
            ...React.Children.toArray(initialProps.styles), sheets.getStyleElement(),

        ],

    };
}