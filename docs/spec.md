---
sidebar_position: 3
---

# Specs

* Gura is case-sensitive.
* A Gura file must be a valid UTF-8 encoded Unicode document.
* Whitespace means tab (U+0009) or space (U+0020).
* Newline means LF (U+000A) or CRLF (U+000D U+000A).


## Comment

A hash symbol marks the rest of the line as a comment, except when inside a
string.

```yaml
# This is a full-line comment
key: "value"  # This is a comment at the end of a line
another: "# This is not a comment"
```

Control characters other than tab (U+0000 to U+0008, U+000A to U+001F, U+007F) are not permitted in comments.


## Key/Value Pair

The primary building block of a Gura document is the key/value pair.

Keys are on the left of the colon and values are on the right. Whitespace is ignored around key names and values. The key, colon, and value must be on the same line (though some values can be broken over multiple lines).

```yaml
key: "value"
```

Values must have one of the following types.

- [Null](#null)
- [String](#string)
- [Integer](#integer)
- [Float](#float)
- [Boolean](#boolean)
- [Object](#object)
- [Array](#array)

Unspecified values are invalid.

```yaml
key: # INVALID
```

There must be a newline (or EOF) after a key/value pair.

```
first: "Carlitos" last: "Gardel" # INVALID
```


## Keys

In Gura there is only one way to define keys. A key may only contain ASCII letters and underscores (`A-Za-z0-9_`). Dashes are not allowed to keep a simple and consistent key naming convention. Note that keys are allowed to be composed of only ASCII digits, e.g. `1234`, but are always interpreted as strings.

```yaml
key: "value"
some_key: "value"
some-key: "value"  # INVALID
1234: "value"
```

A key must be non-empty.

```yaml
: "no key name"  # INVALID
```

Defining a key multiple times is invalid and it must raise a `DuplicatedKeyError` error.

```yaml
# DO NOT DO THIS
name: "Carlos"
name: "Anibal"
```

**Literal keys**

Gura was created with simplicity, maintainability, and **portability** in mind. In a production environment, you will likely have to work with different tools that handle different configuration languages. To make Gura compatible with other configuration schemes, *Literal Keys* are provided, these are defined between grave accents \` (U+0060 GRAVE ACCENT) and can contain any valid UTF-8 character.

If the \` character is required within a Literal Key, it must be escaped. Any character from the list in the [String section](#string) can be escaped inside Literal Keys too. If any other character that has not been previously mentioned is escaped, `InvalidEscapedCharacterError` must be raised, exactly as if it were a string.

```yaml
`a/literal.key!`: "Some value"
`Escaped\`char\tWithTabs`: true
`\invalid`: false  # INVALID: \i is not a valid escape sentence
```

:::caution

The purpose of the Literal Keys is solely to provide compatibility with other configuration languages. **It is recommended to avoid them unless strictly necessary**, in order to maintain a clean and standardized configuration.

:::


## Null

The absence of value can be represented by the `null` value:

```yaml
none_value: null
```


## String

There are four ways to express strings: basic, multi-line basic, literal, and multi-line literal. All strings must contain only valid UTF-8 characters.

Unlike YAML, unquoted strings are not allowed.

**Basic strings** are surrounded by quotation marks (`"`). Any Unicode character may be used except those that must be escaped: quotation mark, backslash, and the control characters other than tab (U+0000 to U+0008, U+000A to U+001F, U+007F).

```yaml
str: "I'm a string. \"You can quote me\". Name\tJos\u00E9\nLocation\tSF."
```

For convenience, some popular characters have a compact escape sequence.

```
\b         - backspace                  (U+0008)
\t         - tab                        (U+0009)
\n         - linefeed                   (U+000A)
\f         - form feed                  (U+000C)
\r         - carriage return            (U+000D)
\"         - quote                      (U+0022)
\\         - backslash                  (U+005C)
\$         - dollar sign (variables)    (U+0024)
\uXXXX     - unicode                    (U+XXXX)
\UXXXXXXXX - unicode                    (U+XXXXXXXX)
```

Any Unicode character may be escaped with the `\uXXXX` or `\UXXXXXXXX` forms. The escape codes must be valid Unicode [scalar values](https://unicode.org/glossary/#unicode_scalar_value).

All other escape sequences not listed above are not valid and must raise `InvalidEscapedCharacterError`.

Sometimes you need to express passages of text (e.g. translation files) or would like to break up a very long string into multiple lines. Gura makes this easy.

**Multi-line basic strings** are surrounded by three quotation marks on each side and allow newlines. A newline immediately following the opening delimiter will be trimmed. All other whitespace and newline characters remain intact.

```yaml
str1: """
Roses are red
Violets are blue"""
```

Gura parsers should feel free to normalize newline to whatever makes sense for their platform.

```yaml
# On a Unix system, the above multi-line string will most likely be the same as:
str2: "Roses are red\nViolets are blue"

# On a Windows system, it will most likely be equivalent to:
str3: "Roses are red\r\nViolets are blue"
```

For writing long strings without introducing extraneous whitespace, use a "line ending backslash". When the last non-whitespace character on a line is an unescaped `\`, it will be trimmed along with all whitespace (including newlines) up to the next non-whitespace character or closing delimiter. All of the escape sequences that are valid for basic strings are also valid for multi-line basic strings.

```yaml
# The following strings are byte-for-byte equivalent:
str1: "The quick brown fox jumps over the lazy dog."

str2: """
The quick brown \


  fox jumps over \
    the lazy dog."""

str3: """\
       The quick brown \
       fox jumps over \
       the lazy dog.\
       """
```

Any Unicode character may be used except those that must be escaped: backslash and the control characters other than tab, line feed, and carriage return (U+0000 to U+0008, U+000B, U+000C, U+000E to U+001F, U+007F).

You can write a quotation mark, or two adjacent quotation marks, anywhere inside a multi-line basic string. They can also be written just inside the delimiters.

```yaml
str4: """Here are two quotation marks: "". Simple enough."""
# str5: """Here are three quotation marks: """."""  # INVALID
str5: """Here are three quotation marks: ""\"."""
str6: """Here are fifteen quotation marks: ""\"""\"""\"""\"""\"."""
```

Unlike TOML, it is invalid to use three quotation marks inside a multi-line string:

```yaml
# "This," she said, "is just a pointless statement."
str7: """"This," she said, "is just a pointless statement.""""  # INVALID
```

If you're a frequent specifier of Windows paths or regular expressions, then having to escape backslashes quickly becomes tedious and error-prone. To help, Gura supports literal strings which do not allow escaping at all.

**Literal strings** are surrounded by single quotes. Like basic strings, they must appear on a single line:

```yaml
# What you see is what you get.
winpath: 'C:\Users\nodejs\templates'
winpath2: '\\ServerX\admin$\system32\'
quoted: 'John "Dog lover" Wick'
regex: '<\i\c*\s*>'
```

Since there is no escaping, there is no way to write a single quote inside a literal string enclosed by single quotes. Luckily, Gura supports a multi-line version of literal strings that solves this problem.

**Multi-line literal strings** are surrounded by three single quotes on each side and allow newlines. Like literal strings, there is no escaping whatsoever. A newline immediately following the opening delimiter will be trimmed. All other content between the delimiters is interpreted as-is without modification.

```yaml
regex2: '''I [dw]on't need \d{2} apples'''
lines: '''
The first newline is
trimmed in raw strings.
   All other whitespace
   is preserved.
'''
```

You can write 1 or 2 single quotes anywhere within a multi-line literal string, but sequences of three or more single quotes are not permitted.

```yaml
quot15: '''Here are fifteen quotation marks: """""""""""""""'''

# apos15: '''Here are fifteen apostrophes: ''''''''''''''''''  # INVALID
apos15: "Here are fifteen apostrophes: '''''''''''''''"

# 'That,' she said, 'is still pointless.'
str: ''''That,' she said, 'is still pointless.''''
```

Control characters other than tab are not permitted in a literal string. Thus, for binary data, it is recommended that you use Base64 or another suitable ASCII or UTF-8 encoding. The handling of that encoding will be application-specific.


## Integer

Integers are whole numbers. Positive numbers may be prefixed with a plus sign. Negative numbers are prefixed with a minus sign.

```yaml
int1: +99
int2: 42
int3: 0
int4: -17
```

For large numbers, you may use underscores between digits to enhance readability. Each underscore must be surrounded by at least one digit on each side.

```yaml
int5: 1_000
int6: 5_349_221
int7: 53_49_221  # Indian number system grouping
```

Leading zeros are not allowed. Integer values `-0` and `+0` are valid and identical to an unprefixed zero. Non-negative integer values may also be expressed in hexadecimal, octal, or binary. In these formats, leading `+` is not allowed and leading zeros are allowed (after the prefix). Hex values are case-insensitive. Underscores are allowed between digits (but not between the prefix and the value).

```yaml
# Hexadecimal with prefix `0x`
hex1: 0xDEADBEEF
hex2: 0xdeadbeef
hex3: 0xdead_beef

# Octal with prefix `0o`
oct1: 0o01234567
oct2: 0o755 # useful for Unix file permissions

# Binary with prefix `0b`
bin1: 0b11010110
```

Arbitrary 64-bit signed integers (from −2^63 to 2^63−1) should be accepted and handled losslessly. If an integer cannot be represented losslessly, an error must be thrown.


## Float

Floats should be implemented as IEEE 754 binary64 values.

A float consists of an integer part (which follows the same rules as decimal integer values) followed by a fractional part and/or an exponent part. If both a fractional part and exponent part are present, the fractional part must precede the exponent part.

```yaml
# Fractional
flt1: +1.0
flt2: 3.1415
flt3: -0.01

# Exponent
flt4: 5e+22
flt5: 1e06
flt6: -2E-2

# Both
flt7: 6.626e-34
```

A fractional part is a decimal point followed by one or more digits.

An exponent part is an E (upper or lower case) followed by an integer part (which follows the same rules as decimal integer values but may include leading zeros).

The decimal point, if used, must be surrounded by at least one digit on each side.

```yaml
# INVALID FLOATS
invalid_float_1: .7
invalid_float_2: 7.
invalid_float_3: 3.e+20
```

Similar to integers, you may use underscores to enhance readability.

```yaml
flt8: 224_617.445_991_228
```

Float values `-0.0` and `+0.0` are valid and should map according to IEEE 754.

Special float values can also be expressed. They are always lowercase.

```yaml
# Infinity
sf1: inf  # Positive infinity
sf2: +inf # Positive infinity
sf3: -inf # Negative infinity

# Not a number
sf4: nan  # Actual sNaN/qNaN encoding is implementation-specific
sf5: +nan # Same as `nan`
sf6: -nan # Valid, actual encoding is implementation-specific
```


## Boolean

Booleans are just the tokens you're used to. Always lowercase.

```yaml
bool1: true
bool2: false
```


## Object

Like YAML, objects have a header (key), a colon and underneath each of their attributes, which must begin in an indented block. This indentation must be respected throughout the entire Gura file and each indentation level must be represented by 4 (four) spaces (U+0020). Unlike YAML, tabs (U+0009) are not allowed to define indentation blocks in order to standardize language formatting and provide users with a convenient way to maintain documents.


```yaml
services:
    nginx:
        host: "127.0.0.1"
        port: 80
  
    apache:
        virtual_host: "10.10.10.4"
        port: 81
```

The equivalent JSON would be:

```json
{
  "services": {
    "nginx": {
      "host": "127.0.0.1",
      "port": 80
    },
    "apache": {
      "virtual_host": "10.10.10.4",
      "port": 81
    }
  }
}
```

**Some considerations about the indentation**

A space (U+0020) or a tab (U+0009) can be used on useless lines like comments o empty lines (lines composed of whitespaces and new lines) but only. In case a tab is found as an indentation character, an `InvalidIndentationError` must be raised.

Also, as mentioned previously, the indentation levels must be divisible by 4, otherwise an `InvalidIndentationError` error must be raised:

```yaml
# INVALID as second level has block of 8 spaces as indentation
services:
    nginx:
            host: "127.0.0.1"
            port: 80

# INVALID as 2 spaces are used as indentation block
user:
  name: "Gura"
```

Finally, as empty values are not allowed, the following case considers any value below `name` as an internal block. As the indentation length between parent and child blocks is the same an `InvalidIndentationError` exception will be thrown:

```yaml
user:
    name: # INVALID
    surname: "Troilo"
```

**Empty objects**

While the idea is that the configuration of a system is valid, complete, and static information, there may be situations where the information is empty. Assume the following case in JSON:

```json
{
  "empty_object": {}
}
```

To maintain compatibility with existing languages with support for empty objects such as JSON or YAML, Gura provides the `empty` keyword to cover these scenarios. The above example could be represented in Gura as follows:

```yaml
empty_object: empty
```

In this way, an explicit and clear syntax is provided to cover these rare cases, without losing the portability of the configuration to and from other languages.


## Array

Arrays are square brackets with values inside. Whitespace is ignored. Elements are separated by commas. Arrays can contain values of the same data types as allowed in key/value pairs. Values of different types may be mixed.

```yaml
integers: [ 1, 2, 3 ]
colors: [ "red", "yellow", "green" ]
nested_arrays_of_ints: [ [ 1, 2 ], [3, 4, 5] ]
nested_mixed_array: [ [ 1, 2 ], ["a", "b", "c"] ]

# Mixed-type arrays are allowed
numbers: [ 0.1, 0.2, 0.5, 1, 2, 5 ]
tango_singers: [
    user1:
        name: "Carlos"
        surname: "Gardel"
        year_of_birth: 1890,

    user2:
        name: "Aníbal"
        surname: "Troilo"
        year_of_birth: 1914
]
```

Arrays can span multiple lines. A terminating comma (also called a trailing comma) is permitted after the last value of the array. Any number of newlines and comments may precede values, commas, and the closing bracket. Indentation between array values and commas is treated as whitespace and ignored.

```yaml
integers2: [
    1, 2, 3
]

integers3: [
    1,
    2, # This is ok
]
```

Since the comma is the only valid element separator for an array, it is recommended to add a line between elements that are objects or multiple key/values to improve legibility:

```yaml
# It is valid but a little hard to read
singers: [
    name: "Andrea"
    surname: "Bocelli"
    gender: "Opera",
    name: "Jimi"
    surname: "Hendrix"
    gender: "Rock"
]

# Much better!
singers: [
    name: "Andrea"
    surname: "Bocelli"
    gender: "Opera",

    name: "Jimi"
    surname: "Hendrix"
    gender: "Rock"
]
```


## Variables

You can define variables. They start with a `$` sign, a name and a colon. A variable name has to respect the same regex as keys and only strings, numbers or other variable are allowed as values. If any of another kind of value type is used a parsing error must be raised.

```yaml
$my_string_var: "127.0.0.1"
$my_integer_var: 8080

nginx:
    host: $my_string_var
    port: $my_integer_var

$invalid_var: null # INVALID null is not allowed as variable value
$invalid_var2: true # INVALID booleans are not allowed as variable value
$invalid_var3: [ 1, 2, 3 ] # INVALID complex types such as arrays or objects are not allowed as variable value
```

Variables can not be used as key.

```yaml
$hostkey: "host"
nginx:
    $hostkey : 4 # INVALID
```

Variables must be specified before they are used, in source code order. Redefining variables must raise a `DuplicatedVariableError` error, even when defined in different files (see [imports](#imports)). 

Variables can be used in *Basic strings* and *Multi-line basic strings*:

```yaml
$name: "Gura"
key: "$name is cool"
key_2: """Config languages using variables:
    - $name"""
```

Environment variables can be accessed using `$` sign too.

```yaml
service:
    postgres:
        environment:
            user: $DB_USER
            password: $DB_PASS

# You can store its value in a variable too
$my_path: $PATH

# You can replace environment variables like normal ones. After all, environment variables are normal variables defined before parsing.
$PATH: "Another value"
```

When a variable is used Gura looks for the definition in the current file and the imported ones. If it is not defined, checks for available environment variables, if it is not, it must raise a `VariableNotDefinedError` error.

To use `$` in string just use literal or escape them:


```yaml
basic: "I won \$500 dollars!"
basic_multiline: """I won \$500 dollars!"""
literal: 'I won $500 dollars!'
literal_multiline: '''I won $500 dollars!'''
```


## Imports

You can import one or more Gura files using an `import` statement. The effect of importing a file is the same as replacing the import by the file's contents. Therefore, all the keys and variables defined on them will be available in the file which is importing.

Imports must occur at the beginning of the file and there must be no blanks in front of the `import` statement. Must be only one whitespace between the `import` and file name. The file name must be between single quotation marks (") and there won't be special character escaping. Importing a non-existing file must raise a `FileNotFoundError` error.

```yaml
import "another_file.ura" # Good
  import "another_file.ura" # INVALID: there are blanks before import
import   "another_file.ura" # INVALID: there are more than one whitespace between import and file name

some_key: "Some value"

import "another_file.ura" # INVALID: is not at the beginning of the file
```

<!-- TODO: analyze require vs include https://www.w3schools.com/PHP/php_includes.asp -->

A file can only be imported once. Re-importing a file must raise a `DuplicatedImportError` error.


**one.ura**:

```yaml
life: 42
```

**two.ura**:

```yaml
import "one.ura"

$my_var: true
```

**three.ura**:

```yaml
$name: "Elisa"
```

**main.ura**:

```yaml
import "two.ura"
import "/absolute/path/to/three.ura"  # You can use absolute path too

# life, $my_var and $name are available here
my_name: $name

# life: "some value" # This WILL NOT work as it is defined in one.ura which is included in two.ura
```

You can use variables inside import sentences!

```yaml
$common_path: "/extremely/long/path/to/some/useful/directory"

import "$common_path/one.ura"
import "$common_path/two.ura"
```
