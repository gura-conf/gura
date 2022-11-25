---
sidebar_position: 2
---

# Changelog

On this page are listed all the changes introduced in Gura specs (version 2.0.0).


## From 1.0.0 ➞ 2.0.0


### Literal Keys

Literal Keys were introduced in [Keys section][keys-section] to provide portability with other configuration languages ([related Github discussion][discussion-literal-keys]).


### Variables support all basic types

[Booleans][boolean-section], `empty` and [null][null-section] values can now also be assigned as the value of a [variable][variables-section]. This change was introduced because it adds value to the language without sacrificing simplicity.


### Added a mechanism to make imports optional

Now Gura specs state that implementations must provide a way to disable imports. This change avoids errors or security problems on environments without filesystem access or that are sensitive. It has been proposed that such variables be disabled by default in the [Developers documentation][developers-tool-parameters]. Check the [Imports section][import-section] to learn more.


### Added a mechanism to make ENV vars optional

For security reasons, it is possible to disable environment variables in Gura files in this new version. It has been proposed that such variables be disabled by default in the [Developers documentation][developers-tool-parameters]. Check the [Variables section][variables-section] to learn more.


### Changed behavior with invalid escaped sentences

Added `InvalidEscapedCharacterError` error in [String section][string-section] when used invalid escape sentences ([related Github discussion][discussion-escape-chars]).


### New *Developer* section

Added a new [Developers section][developers-section] listing some useful conventions, standards, tools and recommendations for developers working on a new parser, emitter or tokenizer for Gura.


[keys-section]: spec#keys
[boolean-section]: spec#boolean
[null-section]: spec#null
[discussion-literal-keys]: https://github.com/gura-conf/gura/discussions/10
[import-section]: spec#imports
[variables-section]: spec#variables
[string-section]: spec#string
[discussion-escape-chars]: https://github.com/gura-conf/gura/discussions/11
[developers-section]: Developers/introduction
[developers-tool-parameters]: Developers/parsing#tool-parameters
