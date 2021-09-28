---
title: Serialization/Deserialization
sidebar_position: 2
---

# Serialization/Deserialization

This page defines the basic concepts for the implementation of a parser that serializes/deserializes text in Gura format. In honor of the simplicity of the language, we will try to make this documentation as easy as possible.


## Basic types

All implementations that parse or output text in Gura format must contemplate the following data types to comply with the language specifications:

- Null: defines a unit value. Different programming languages have different ways of representing this value, for example, in Java, Javascript or PHP it is defined with the type null, in Python it is None, in Ruby it is nil, Option in Rust, and so on. Use the corresponding value depending on which language you are implementing your parser in. [Reference][null-reference].
- Bool: sets the boolean values that in Gura are defined through the keywords `false` and `true`. [Reference][bool-reference].
- String: defines text strings. Regardless of whether they are basic, literal, and/or multiline strings.[Reference][string-reference].
- Integer: defines signed integers. [Reference][integer-reference].
- Float: defines signed floating-point number. [Reference][float-reference].
- Array: defines an ordered collection of Gura elements. [Reference][array-reference].
- Object: defines an ordered structure containing keys that uniquely [reference][] a Gura element. Examples of this type of structure in programming languages are objects in Javascript, a dictionary in Python, a HashMap in Java or Rust, a map in C++, etc. Where the key is a String, and the value is a Gura element that is part of this basic data list. [Reference][object-reference].

It is vitally important to understand that the implementation of a parser is a complex task and **will probably involve the use of more complex data structures than the one just mentioned**. 

These structures should be considered internal and act as utilities to perform certain tasks. For example, the official parsers of Python, Javascript, and Rust (which can be found in the [list of implementations][implementations]) have internal structures to map the indentation, import, variables, among other structures that are only of interest to developers but are not part of the specifications that apply to the end-user. These structures can be freely defined by the tool manager(s) and are not subject to any standard by the Gura team

## Standard errors


## Testing


[null-reference]: http://localhost:3000/docs/next/spec#null
[bool-reference]: http://localhost:3000/docs/next/spec#boolean
[string-reference]: http://localhost:3000/docs/next/spec#string
[integer-reference]: http://localhost:3000/docs/next/spec#integer
[float-reference]: http://localhost:3000/docs/next/spec#float
[array-reference]: http://localhost:3000/docs/next/spec#array
[object-reference]: http://localhost:3000/docs/next/spec#object
[implementations]: https://github.com/gura-conf/gura#library-implementations