# spfxTranslator
Translate your SPFX localization with Azure Cognitive services.

## installation
`npm i -g https://github.com/EldinHb/spfxTranslator`

## usage
### setup
After installation you need to setup your key first.

`spfxTranslator -set-azure-key=YOURSUBSCRIPTIONKEY`

### translate
You can translate an entire folder by providing the path to the folder with your localizations.

`spfxTranslator -path="path/to/your/loc/folder"`

### parameters

| Param            | Type    | Default  | Description                                                                                                                                                  |
|------------------|---------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `-force`         | boolean | false    | Force enabled translates all keys even if they already are translated. </br>Force disabled only translates keys </br>which havent been  translated yet. |
| `-path`          | string  |           | Set the path to the </br>loc folder you want to translate. </br>REQUIRED.                                                                                    |
| `-main-file`     | string  |  en-us.js | Set the file you want to translate from.                                                                                                                     |
| `-set-azure-key` | string  |          | Must be called when installed to set </br>your Azure Cognitive services </br>subscription key to access their API.                                           |
