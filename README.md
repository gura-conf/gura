<img align="right" src="logos/gura-200.png" alt="Gura logo">

# Gura

Gura is a file format for *configuration files*. Gura is as **flexible as YAML** and **simple and readable like TOML**. Its syntax is clear and powerful, yet familiar for YAML/TOML users:

> This repository contains the in-development version of the Gura specification.
> You can find the released versions at https://jware-solutions.github.io/gura/.

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

Currently, Gura has a [Python implementation](https://github.com/jware-solutions/gura-python-parser) you can install with `pip install gura` and start using today.

```python
import gura

gura_string = """
title: "Gura Example"

person:
    username: "Stephen"
    age: 20

hosts: [
    "alpha",
    "omega"
]
"""

# Transforms in dictionary
parsed_gura = gura.loads(gura_string)

# Access a specific field
print(f"Title -> {parsed_gura['title']}")

# Access object data
person = parsed_gura['person']
print(f"My username is {person['username']}")

# Iterate over structure
for host in parsed_gura['hosts']:
    print(f'Host -> {host}')
```

Javascript/Typescript, Rust and C++ implementations are being currently developed and will be available shortly.


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


## Rationale

Gura was born from the need to have a configuration language that is human readable without falling into the unnecessary complexity of popular formats such as YAML. To read an overview of the issues with such formats, which motivated the creation of this new configuration language please visit the [Rationale section][rationale-section] in the official page.


## Acknowledgements

I want to give my sincere thanks to [Facundo Quiroga][quiroga] and [Ulises Jeremias Cornejo Fandos][cornejo-fandos] for their guidance and valuable opinions during the design and implementation of Gura.


## Licence

Gura is distributed under the terms of the MIT license.

[specs]: ./gura.md
[specs-site]: https://jware-solutions.github.io/gura
[rationale-section]: https://jware-solutions.github.io/gura/#RATIONALE
[gura-python-parser]: https://github.com/jware-solutions/gura-python-parser
[discussions]: https://github.com/jware-solutions/gura/discussions/categories/ideas-rfc
[quiroga]: https://github.com/facundoq
[cornejo-fandos]: https://github.com/ulises-jeremias
