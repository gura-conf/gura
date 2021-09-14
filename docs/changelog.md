---
sidebar_position: 2
---

# Changelog

On this page are listed all the changes introduced in Gura specs from version 2.0.0.


### Literal Keys

Literal Keys were introduced in [Keys section][keys-section] to provide portability with other configuration languages ([related Github discussion][discussion-literal-keys]).

### Changed behavior with invalid escaped sentences

Added `InvalidEscapedCharacterError` error in [String section][string-section] when used invalid escape sentences ([related Github discussion][discussion-escape-chars]).


[keys-section]: spec#keys
[discussion-literal-keys]: https://github.com/gura-conf/gura/discussions/10
[string-section]: spec#string
[discussion-escape-chars]: https://github.com/gura-conf/gura/discussions/11