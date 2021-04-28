# Gura

Gura is a file format for *configuration files*. Gura is as **flexible as YAML** and **simple and readable like TOML**. Its syntax is clear and powerful, yet familiar for YAML/TOML users:

````yaml
# This is a comment in a Gura configuration file.
# Define a variable named `title` with string value "Gura Example"
title: "Gura Example"

# Define an object with fields `username` and `age`
# with string and integer values, respectively
# Indentation is used to indicate nesting
person:
    username: "Stephen"
    age: 20

# Define a list of values
# Line breaks are OK when inside arrays
hosts: [
    "alpha",
    "omega"
]

# Variables can be defined and referenced to avoid repetition
$foreground: "#FFAH84"
color-scheme:
    editor: $foreground
    ui:     $foreground

````
The file extension for Gura is `ura`. We recommend the filename `config.ura` for main configuration files.

To learn more about Gura, you can read the [Official Gura Documentation][specs].

Currently, Gura has a [Python implementation](https://github.com/jware-solutions/gura-python-parser) you can install with `pip install gura` and start using today. Rust and C++ implementations are being currently developed and will be available shortly.

## Index

- [Implementations](#implementations)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [Rationale](#rationale)
	- [Differences with YAML](#differences-with-yaml)
	- [Differences with TOML](#differences-with-toml)
	- [Differences with JSON](#differences-with-json)
	- [Gura's own stuff](#guras-own-stuff)
- [Licence](#licence)


## Library Implementations

Below is the list of implementations available for Gura. If you have an implementation of your own that you want to make known simply create a new issue and it will be added here.

- Python: [gura-python-parser (official)][gura-python-parser]


## Contributing

All help is more than welcome. You can:

- Write an RFC via our [GitHub Discussions][discussions] if you feel there is a bug in Gura or a missing feature.
- Contribute to some of the implementations, or write your own in the programming language of your choice! In the latter case don't forget to make an issue letting us know that your implementation is available so we can add it to the [Implementations](#implementations) list.
<!-- - Contribute to the official website project -->



## Rationale

Gura was born from the need to have a configuration language that is human readable without falling into the unnecessary complexity of popular formats such as YAML. The following is an overview of the issues with such formats, which motivated the creation of this new configuration language.

### Differences with YAML

When I started using YAML I was fascinated: it offered a readable alternative to JSON or INI for a configuration file. While TOML was great for basic files because of its simplicity, it was YAML that provided a readable solution when the nesting levels grew.
However, a while back I came across [a blog][blog] urging to stop supporting that format. The reason? YAML was unnecessarily complex. After reading it in full, there was no choice but to admit the reality: he was right ([and the community seemed to agree][reddit-post]). Here are a few clear points that were for me the most influential in thinking through the fundamentals of Gura:

- Why do we need 4 ways to define a boolean? And why are they automatically inferred from a string? (WTF!?)
- Considering the previous point, the implicit mechanism behind it only generates problems that require [workarounds][boolean-workaround] to make it work as one naturally expects.
- Why do we need 5 ways to define a string?
- There were serious security issues. Such is the point that [safe alternatives][safe-yaml] have been implemented to be able to use the language without problems.
- Why do we need [pages and pages][yaml-specs] of technical specifications for what is supposed to be a simple configuration language? **In my opinion** the formats should be simple, **a developer should focus on the technical problems of his work**, and not on the implicit implementation of the different secondary components such as configuration files.
- Why do we need several different ways to define a list? And why several different ways to specify the elements inside it?
- Why do we need **special data types** when ultimately that is delegated to each specific implementation? Types like *Date* or *Datetime* are simple strings interpreted in a specific way in each programming language in which they are used, in my opinion **they should not be part of the abstract specifications of the configuration language**.

All the previous points lead to a difficult implementation in any programming language, it is enough to see the repositories of the different languages to realize that carrying out a YAML parser is a complicated task.

The main essence of Gura lies in simplicity: **there is only one way to do things**. Boolean values can only be defined with `true` and `false`, strings must be enclosed in quotes (although there are several types of quotes for specific purposes), lists and their elements are defined in one, and only one, way; and special data types are completely eliminated and only primitive data types (such as integers, floats, strings, booleans, etc), lists and objects (the latter the same as YAML, so that it is familiar to new users) are valid.


### Differences with TOML

The idea of Gura is not to replace TOML, but to complement it when the complexity of the project warrants it. The use of TOML for files like `cargo.toml` for everyday use in the Rust programming language seems excellent to me, since no more is needed. However, when the levels of information start to increase TOML is limited to represent them since it must resort to repeating all the parent levels (using [Dotted keys][dotted-keys]) of information every time you want to define a nested value.

Even being a simple language, in some cases it falls into to the same complexity as YAML: 

- Why do you need two ways to specify a `key`? And who needs an empty `key`?
- Special data types...
- Various ways to add separators to a number.


### Differences with JSON

JSON is and will be the fastest serialization language available. Gura does not have that approach, it simply aims to satisfy another kind of demand. When a fast processing and/or machine-to-machine communication format is required JSON is unbeatable, when a readable, simple and maintainable language is needed Gura becomes an excellent alternative.


### Gura's own stuff

Gura not only combines the readability of YAML and a reduced version of its syntax with the (even more simplified) simplicity of TOML. But it also adds some extra functionality exclusive to this language:

- 📦 Variables: Gura allows you to define variables of any type, even using environment variables, both as a flat value and as values inside a string. So you can compact and reuse the values you require.
- 📑 Import: Gura defines a way to import different Gura files within the same file in order to modularize the configuration.
- 🚫 Standard errors: Gura defines the *semantic* errors that should be thrown in certain situations. This way you get an implementation-agnostic definition and the developer can get the same type of error regardless of the programming language he/she is using.
- 🌟 It is simple: thanks to the simplicity of Gura, developing a parser and processing Gura format is a quick and easy task.

The idea of Gura **will always be focused on simplicity**. That's why we are reluctant to support more complex structures that should not be part of a configuration language. If you are looking for a way to execute code like loops, conditions, functions and so on we recommend [Dhall][dhall], **Gura does not and will never seek to replace the behavior that any programming language already offers in a robust way**. That's why we only focus on explicit static definitions that make it easier to understand not only the language, but more importantly, your own configuration file itself.


## Acknowledgements

I want to give my sincere thanks to [Facundo Quiroga][quiroga] and [Ulises Jeremias Cornejo Fandos][cornejo-fandos] for being there to solve some doubts, guide me in the implementation and give their valuable opinions during the development of this language.


## Licence

Gura is distributed under the terms of the MIT license.

[blog]: https://noyaml.com/
[specs]: ./gura.md
[specs-site]: https://jware-solutions.github.io/gura
[boolean-workaround]: https://stackoverflow.com/questions/53648244/specifying-the-string-value-yes-in-a-yaml-property
[safe-yaml]: https://pyyaml.docsforge.com/master/api/yaml/safe_load/
[yaml-specs]: https://yaml.org/spec/1.2/spec.html
[reddit-post]: https://www.reddit.com/r/programming/comments/iqwbek/stop_adding_support_for_yaml_in_your_products/
[dotted-keys]: https://toml.io/en/v1.0.0#table
[dhall]: https://dhall-lang.org/#
[gura-python-parser]: https://github.com/jware-solutions/gura-python-parser
[discussions]: https://github.com/jware-solutions/gura/discussions/categories/ideas-rfc
[quiroga]: https://github.com/facundoq
[cornejo-fandos]: https://github.com/ulises-jeremias
