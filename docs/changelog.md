---
sidebar_position: 2
---

# Changelog

On this page are listed all the changes introduced in Gura specs from version 2.0.0.


### Literal Keys

Literal Keys were introduced in [Keys section][keys-section] to provide portability with other configuration languages ([related Github discussion][discussion-literal-keys]).


### Added a mechanism to make imports optional

Now Gura specs state that implementations must provide a way to disable imports. This changed to avoid errors or security problems on environments without filesystem access or that are sensitive. Check [Imports section][import-section] to learn more.


### Changed behavior with invalid escaped sentences

Added `InvalidEscapedCharacterError` error in [String section][string-section] when used invalid escape sentences ([related Github discussion][discussion-escape-chars]).


[keys-section]: spec#keys
[discussion-literal-keys]: https://github.com/gura-conf/gura/discussions/10
[import-section]: spec#imports
[string-section]: spec#string
[discussion-escape-chars]: https://github.com/gura-conf/gura/discussions/11