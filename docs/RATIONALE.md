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


### Differences with JSON

JSON is and will be the fastest serialization language available. Gura is not meant for fast processing and/or machine-to-machine communication. When a readable, simple and maintainable language is needed Gura becomes an excellent alternative.


### Gura

Gura combines the readability of YAML and a reduced version of its syntax with the (even more simplified) simplicity of TOML. It also brings in some features and characteristics exclusive to this language:

- 📦 Variables: Gura allows you to define variables of any type, even using environment variables, both as a flat value and as values inside a string. So you can compact and reuse the values you require.
- 📑 Imports: Gura defines a way to import different Gura files within the same file in order to modularize the configuration.
- 🚫 Standard errors: Gura defines the *semantic* errors that should be thrown in certain situations. This way you get an implementation-agnostic definition and the developer can get the same type of error regardless of the programming language he/she is using.
- 🥧 Gura is short and simple to learn and use, since it follows the `only one way to do it` Python maxim.
- 🌈 Writing a parser or wrapper for Gura in a new language should be a short and simple as well. 


Gura does not seek to replace the behavior that any programming language already offers in a much flexible and robust way. Therefore, it is limited to explicit static definitions that make it easier to understand both the language and the configuration files.

Gura **will always be focused on simplicity**. Therefore, we are reluctant to support more complex structures. If you are looking for a way to execute code like loops, conditions, functions and so on in a config file, we recommend [Dhall][dhall].


[blog]: https://noyaml.com/
[reddit-post]: https://www.reddit.com/r/programming/comments/iqwbek/stop_adding_support_for_yaml_in_your_products/
[boolean-workaround]: https://stackoverflow.com/questions/53648244/specifying-the-string-value-yes-in-a-yaml-property
[safe-yaml]: https://pyyaml.docsforge.com/master/api/yaml/safe_load/
[yaml-specs]: https://yaml.org/spec/1.2/spec.html
[dotted-keys]: https://toml.io/en/v1.0.0#table
[dhall]: https://dhall-lang.org/#
