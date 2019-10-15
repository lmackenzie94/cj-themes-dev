import React from 'react';
import { getFonts } from 'utils/fonts';
const { families } = getFonts(`./static/fonts`);

export default class HTML extends React.Component {
  render() {
    return (
      <html
        {...this.props.htmlAttributes}
        lang={`en`}
        style={{ width: `100%`, padding: 0, margin: 0 }}
      >
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <style
            type="text/css"
            dangerouslySetInnerHTML={{
              __html: `${families
                .map(
                  ({ name, data, weight }) =>
                    `@font-face{font-family:'${name}'; src:${data
                      .map(
                        ({ url, extension }) =>
                          `url('${url}') format('${extension}')`
                      )
                      .join(
                        `,`
                      )}; font-weight: ${weight}; font-style:normal; font-display:swap;}`
                )
                .join(``)}`
            }}
          />
          {this.props.headComponents}
        </head>
        <body
          {...this.props.bodyAttributes}
          style={{ width: `100%`, padding: 0, margin: 0 }}
        >
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}
