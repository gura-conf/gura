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

YAML  offered a readable alternative to JSON or INI for a configuration file. While TOML was great for basic files because of its simplicity,  YAML provided a readable solution when the complexity of the file grew. However, as [the NOYAML manifesto][blog] argues, we should stop supporting that format. The reason? [YAML is unnecessarily complex][reddit-post]). We highlight main issues with YAML that Gura tries to solve.

- Multiple different ways to define a list and the elements inside it
- 5 (!) ways to define a string
- 4 (!) ways to define a boolean
- Boolean automatically inferred from strings ([workarounds][boolean-workaround])
- Serious security issues. [Safe YAML][safe-yaml] attempts to address those, but only those.
- [Increadibly long YAML specs][yaml-specs] for what is supposed to be a simple configuration language? 
- Special data types such as like *Date* or *Datetime* are defined in the spec, but the definition of their semantics is relegated to each specific implementation.  

All the previous points lead to a difficult implementation in any programming language, it is enough to see the repositories of the different languages to realize that carrying out a YAML parser is a complicated task.


### Differences with TOML

The idea of Gura is not to replace TOML, but to complement it when the complexity of the project warrants it. The use of TOML for files such as  `cargo.toml` in the Rust programming language is an excellent example of matching the complexity of the language to that of the domain. However, when the level of nesting increases, TOML is very cumbersome since you must resort to repeating all the parent levels (using [Dotted keys][dotted-keys]) every time you want to define a nested value.

Furthermore, even TOML falls in some cases into the same complexity as YAML, with features such as:

- Multiple ways to specify keys
- Empty keys
- Special data types
- Various ways to add separators to a number.


### Differences with JSON

JSON is and will be the fastest serialization language available. Gura is not meant for fast processing and/or machine-to-machine communication. is required JSON is unbeatable, when a readable, simple and maintainable language is needed Gura becomes an excellent alternative.


### Gura

Gura combines the readability of YAML and a reduced version of its syntax with the (even more simplified) simplicity of TOML. It also brings in some features and characteristics exclusive to this language:

- 📦 Variables: Gura allows you to define variables of any type, even using environment variables, both as a flat value and as values inside a string. So you can compact and reuse the values you require.
- 📑 Imports: Gura defines a way to import different Gura files within the same file in order to modularize the configuration.
- 🚫 Standard errors: Gura defines the *semantic* errors that should be thrown in certain situations. This way you get an implementation-agnostic definition and the developer can get the same type of error regardless of the programming language he/she is using.
- 🥧 Gura is short and simple to learn and use, since it follows the `only one way to do it` Python maxim.
- 🌈 Writing a parser or wrapper for Gura in a new language should be a short and simple as well. 


Gura does not seek to replace the behavior that any programming language already offers in a much flexible and robust way. Therefore, it is limited to explicit static definitions that make it easier to understand both the language and the configuration files.

Gura **will always be focused on simplicity**. Therefore, we are reluctant to support more complex structures. If you are looking for a way to execute code like loops, conditions, functions and so on in a config file, we recommend [Dhall][dhall].


## Acknowledgements

I want to give my sincere thanks to [Facundo Quiroga][quiroga] and [Ulises Jeremias Cornejo Fandos][cornejo-fandos] for their guidance and valuable opinions during the design and implementation of Gura.


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
