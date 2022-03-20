---
sidebar_position: 4
---

# Tokenization

One of the advantages of Gura is the standardization of all its parts. It was already explained in previous sections which data types and which errors must be supported to comply with the language specifications.

However, it still remains to define a standardized schema that decomposes all parts of a document written in the Gura format. The process of extracting these parts from a document is called [tokenization][tokenization-wiki].

Establishing the basic structures of the language allows the development of Gura text generation tools that are useful, for example, for editing a document automatically. Without these definitions, tools that allow modifying a document must make their own interpretations since the language has no first-class notion of how comments, indentation, line breaks, etc. can be parsed; which leads to unwanted deletion of some parts of the document if the developer did not take them into account.




[tokenization-wiki]: https://en.wikipedia.org/wiki/Lexical_analysis
