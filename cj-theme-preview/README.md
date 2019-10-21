# @campj/preview

- Quickly create & configure a Heroku app that will provide a live preview for DatoCMS
- Creates a \_redirects file in the 'static' folder
- Creates a Procfile that instructs Heroku on how to run the app
- Creates a netlify.toml with DATO_API_TOKEN (move to @campj/dato ????)

### Options

| Key           |  Type  |       Default Value        |                                            Details                                             |
| ------------- | :----: | :------------------------: | :--------------------------------------------------------------------------------------------: |
| herokuAppName | String |                            | Can't contain spaces or capital letters <br> If ommitted, terminal will prompt user for a name |
| previewSlug   | String |         'preview'          |                               Used to redirect to the Heroku app                               |
| datoAPIToken  | String | process.env.DATO_API_TOKEN |                   **Required** if DATO_API_TOKEN is not defined in .env file                   |
