# @campj/json

- Quickly setup JSON integration

## Plugins this package provides:

- gatsby-transformer-json
- gatsby-source-filesystem

### Options

| Key         |  Type  | Default Value |                         Details                          |
| ----------- | :----: | :-----------: | :------------------------------------------------------: |
| langs       | Array  |    ['en']     |   A blank .json file will be created for each language   |
| contentPath | String |    'data'     | Path of the directory where your .json files should live |

### gatsby-config reference

```javascript
{
    resolve: `gatsby-source-filesystem`,
    options: {
        name: `data`,
        path: contentPath (see OPTIONS),
        langs: langs (see OPTIONS),
        ignore: [`**/\.*`] // ignore files starting with a dot
    }
}
```
