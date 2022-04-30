---
title: Serialization/Deserialization
sidebar_position: 2
description: 'Serialization and deserialization process specifications for Gura parsers development'
keywords: ['Serialization', 'Deserialization', 'Parsers']
---

# Serialization/Deserialization

This page defines the basic concepts for the implementation of a parser that serializes/deserializes text in Gura format. In honor of the simplicity of the language, we will try to make this documentation as easy as possible.


## Basic types

All implementations that parse or output text in Gura format must contemplate the following data types to comply with the language specifications:

- **Null**: defines a unit value. Different programming languages have different ways of representing this value, for example, in Java, Javascript or PHP it is defined with the type null, in Python it is None, in Ruby it is nil, Option in Rust, and so on. Use the corresponding value depending on which language you are implementing your parser in. [Reference][null-reference].
- **Bool**: sets the boolean values that in Gura are defined through the keywords `false` and `true`. [Reference][bool-reference].
- **String**: defines text strings. Regardless of whether they are basic, literal, and/or multiline strings. [Reference][string-reference].
- **Integer**: defines signed integers. [Reference][integer-reference].
- **Float**: defines signed floating-point number. [Reference][float-reference].
- **Array**: defines an ordered collection of Gura elements. [Reference][array-reference].
- **Object**: defines an ordered structure containing keys that uniquely reference a Gura element. Examples of this type of structure in programming languages are objects in Javascript, a dictionary in Python, a HashMap in Java or Rust, a map in C++, etc. Where the key is a String, and the value is a Gura element that is part of this basic data list. [Reference][object-reference].

It is vitally important to understand that the implementation of a parser is a complex task and **will probably involve the use of more complex data structures than the one just mentioned**. 

These structures should be considered internal and act as utilities to perform certain tasks. For example, the official parsers of Python, Javascript, and Rust (which can be found in the [list of implementations][implementations]) have internal structures to map the indentation, import, variables, among other structures that are only of interest to developers but are not part of the specifications that apply to the end-user. These structures can be freely defined by the tool manager(s) and are not subject to any standard by the Gura team.


## Standard errors

All implementations must consider the following errors (all of them are duly entered in the corresponding sections on the [Specs page][specs-page]) during the parsing of Gura text to a representation in the programming language used, to comply with the language specifications:

- **ParseError**: Gura syntax is invalid.
- **VariableNotDefinedError**: a variable is not defined.
- **InvalidIndentationError**: indentation is invalid.
- **DuplicatedVariableError**: a variable is defined more than once.
- **DuplicatedKeyError**: a key is defined more than once.
- **InvalidEscapedCharacterError**: an escape sequences not listed in [String section][string-reference] is used.
- **FileNotFoundError**: an imported file does not exist.
- **DuplicatedImportError**: a file is imported more than once.
- **ImportDisabledError**: an `import` sentence is found in Gura file with the import setting disabled.

For all cases, **it is recommended that the developing tool provides the line** (*1-Based* indexing, like most IDEs or compilers) **and the global position of the text** (*0-Based* indexing, like most IDEs or compilers) where the error occurred. A series of tests (an explanation of this repository is provided below) are provided [here][error-reporting-tests] to check the correct error reporting.

As mentioned above in the *Basic types* section, it could be possible that some internal errors may be used during parsing. However, it is reminded that such errors are not part of the formal language specifications and should not be accessible by end-users through the tool API.


## Testing

A repository containing several tests for validating files with valid Gura format, and all the errors listed above, is made available to developers [here][testing-repository].

We encourage all developers to use the tests provided to corroborate the correct functioning of their tools. And to add some tests they consider important during their development (they could be useful for other Gura projects).


[specs-page]: /docs/spec
[null-reference]: /docs/spec#null
[bool-reference]: /docs/spec#boolean
[string-reference]: /docs/spec#string
[integer-reference]: /docs/spec#integer
[float-reference]: /docs/spec#float
[array-reference]: /docs/spec#array
[object-reference]: /docs/spec#object
[implementations]: https://github.com/gura-conf/gura#library-implementations
[error-reporting-tests]: https://github.com/gura-conf/testing/tree/main/error_reporting
[testing-repository]: https://github.com/gura-conf/testing
