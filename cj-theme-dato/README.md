# @campj/dato

- Quickly setup DatoCMS integration
- If no .env file exists, user will be prompted to enter a Dato API Token and a new .env file will automatically be created

## Plugins this package provides:

- gatsby-source-datocms
- gatsby-transformer-remark

### Options

| Key      |  Type  |       Default Value        |                              Details                              |
| -------- | :----: | :------------------------: | :---------------------------------------------------------------: |
| apiToken | String | process.env.DATO_API_TOKEN | **Required** if you don't define DATO_API_TOKEN in your .env file |

### gatsby-config reference

```javascript
const isProduction = process.env.NODE_ENV === `production`;

{
    resolve: `gatsby-source-datocms`,
    options: {
        apiToken: apiToken (see OPTIONS),
        previewMode: !isProduction,
        disableLiveReload: isProduction
    }
}

```
