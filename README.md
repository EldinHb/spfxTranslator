# spfxTranslator
Automatically translates your SPFX localization with Azure.

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

| Param            | Type    | Usage                             | Default  | Description                                                                                                                                                  |
|------------------|---------|-----------------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `-force`         | boolean | `-force=false`                    | false    | Force enabled translates all keys </br>even if they already are translated. </br>Force disabled only translates keys </br>which havent been  translated yet. |
| `-path`          | string  | `-path="path/to/your/loc/folder"` |          | Set the path to the </br>loc folder you want to translate. </br>REQUIRED.                                                                                    |
| `-main-file`     | string  | `-main-file="en-us.js"`           | en-us.js | Set the file you want to translate from.                                                                                                                     |
| `-set-azure-key` | string  | `-set-azure-key=YOURKEY`          |          | Must be called when installed to set </br>your Azure Cognitive services </br>subscription key to access their API.                                           |