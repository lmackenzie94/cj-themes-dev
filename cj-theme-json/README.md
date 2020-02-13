# @campj/json

- Quickly setup JSON integration

### Plugins this package provides:

- gatsby-transformer-json
- gatsby-source-filesystem

### Options

| Key       |  Type   | Default Value |                           Details                           |
| --------- | :-----: | :-----------: | :---------------------------------------------------------: |
| langs     |  Array  |    ['en']     |    A blank .json file will be created for each language     |
| dataPath  | String  |  'src/data'   |  Path of the directory where your .json files should live   |
| imagePath | String  |   'src/img'   |  Path of the directory where your image files should live   |
| useData   | Boolean |     true      | Set to false if you don't want a data folder to be created  |
| useImage  | Boolean |     true      | Set to false if you don't want a image folder to be created |

### gatsby-config reference

```javascript
{
    resolve: `gatsby-source-filesystem`,
    options: {
        name: `data`,
        path: dataPath (see OPTIONS),
        ignore: [`**/\.*`] // ignore files starting with a dot
    }
},
{
    resolve: `gatsby-source-filesystem`,
    options: {
        name: `image`,
        path: imagePath (see OPTIONS),
        ignore: [`**/\.*`] // ignore files starting with a dot
    }
}
```
