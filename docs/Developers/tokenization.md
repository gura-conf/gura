---
sidebar_position: 4
description: 'Tokenization process specifications for Gura tokenizers development'
keywords: ['Tokenization', 'Tokenizers', 'Edition', 'Gura manipulation']
---

# Tokenization


## Introduction

One of the advantages of Gura is the standardization of all its parts. It was already explained in previous sections which data types and which errors must be supported to comply with the language specifications.

However, it still remains to define a standardized schema that decomposes all parts of a document written in the Gura format. The process of extracting these parts from a document is called [tokenization][tokenization-wiki].

Establishing the basic structures of the language allows the development of Gura text generation tools that are useful, for example, for editing a document automatically. Without these definitions, tools that allow modifying a document must make their own interpretations since the language has no first-class notion of how comments, indentation, line breaks, etc. can be parsed; which leads to unwanted deletion of some parts of the document if the developer did not take them into account.

This document will specify all the structures to be considered in a document written in the Gura format. This list of components is conformed by the basic types supported by Gura that, for the sake of simplicity, will only be listed and not explained (you can check the [*Basic types* section][parsing-section] to obtain information for each one).

- **Null**
- **Bool**
- **String**
- **Integer**
- **Float**
- **Array**
- **Object**


## Tokenization structures

But remember that the tokenization process must also include other technical aspects that are not part of the serialization/deserialization process. Instead, it must include components of the tokenized document that allow its manipulation while respecting the original structure. To do so, the following structs are introduced:

- **Comment**: defines a comment. This, by definition, starts with the character `#` (U+0023) and all characters up to the end of the line are considered part of the comment. [Reference][comment-reference].
- **Variables**: indicates the definition of a variable with its name and value. [Reference][variables-reference].
- **Import**: defines the import sentence, should only indicate the file being imported, without verifying that it exists or is a valid Gura file, since these considerations are part of the parsing process. [Reference][imports-reference].
- **Space**: defines the use of space/s, either tabs (U+0009) or spaces (U+0020), which are useful when comments are found within the same line as another structure. The structure must contain the number of occurrences and must distinguish between tabs and spaces.
- **Line** break: refers to the occurrence of LF (U+000A) or CRLF (U+000D U+000A).
- **Trailing comma**: defines the presence of a comma in the last element of an array.

Note that some structures do not need to be considered. Such as the indentation, which is always 4 for each internal level within an object. If an object contains one element, the indentation is 4 blanks (U+0020). If inside that object, there is another object with a key/value, the latter will be preceded by 8 blanks, and so on. In the case of commas, the same thing happens: commas are mandatory within an array to separate elements, so knowing the different structs that compose an array is enough to know how many commas must be considered. Trailing commas only need to be taken into account since they are optional and should be respected during the tokenization process in case the original document contains them.

It is also important to clarify that **the order of the parsed elements must be preserved** to avoid breaking the original structure during the manipulation of a Gura document.


## Examples

Consider the following Gura document:

```yaml
# A comment
name: "Gura config lang"

properties:
    robust: true
    random_ar: [
        "Simple    ",

        'easy',
        4
    ]

# Another comment
inline_array: [1, 2.4, null,]
```

The tokenizer should generate the following structure:

```
Array([
    Comment(" A comment"),
    Object({
        "name": String("Gura config lang")
    }),
    BreakLine(),
    Object({
        "properties": Object({
            "robust": Bool(true),
            "random_ar": Array(
                [
                    String("Simple    "),
                    BreakLine(),
                    String("easy"),
                    Integer(4)
                ]
            )
        })
    }),
    BreakLine(),
    Comment(" Another comment"),
    Object({
        "inline_array": Array([
            Integer(1),
            Float(2.4),
            Null,
            TrailingComma()
        ])
    })
])
```

Another example to consider could be the following, where variables and import statements are used:

```yaml
import "some-file.ura"  #Some import. This comment doesn't have trailing left space!

	# Comment with a Tab at beginning of the line
$a_variable: "Some value"

key: $a_variable
```

It should produce the following result during tokenization:

```
Array([
	Import("some-file.ura"),
	Space(2),
	Comment("Some import. This comment doesn't have trailing left space!"),
	BreakLine(),
	Tab(1),
	Comment(" Comment with a Tab at beginning of the line"),
	Variable("a_variable"),
	Object({
		"key": Variable("a_variable")
	})
])
```


### About spaces in arrays

Note that, in the previous example, line breaks are only explicitly specified when arrays explicitly span multiple lines. In case of `inline_array`, it does not contain any `BreakLine` elements, but the array named `random_ar` does. Although the presence of objects in an array necessarily involves line breaks, to keep rules the simplest as possible, we choose to maintain redundancy and explicitly preserve the line break during tokenization.

To summarize, whenever line breaks appear **within an array**, they must be considered in the tokenization result. Consider the following example:

```yaml
array_objects: [
    person_1:
        name: 'Elvis',
    person_2:
        name: 'Jack',
]
```

The result of the tokenization would be:

```
Array([
    Array([
        BreakLine(),
        Object({
            "person_1": Object({
                "name": String("Elvis")
            })
        }),
        BreakLine(),
        Object({
            "person_2": Object({
                "name": String("Jack")
            })
        }),
        BreakLine()
    ])
])
```

Even the final line break is considered since Gura would allow closing the array where the user wants it.


## Important considerations

There are some important considerations:
- Unlike serialization/deserialization process, the initial structure cannot be an object since tokenization also considers elements that are not key/value pairs. That is why it consists of an array.
- With the exception of line breaks within an array as [explained above](#about-spaces-in-arrays), only explicitly empty lines are considered as `BreakLine`, it should not be clarified after each element since the Gura definition does not allow the declaration of multiple key/value elements on the same line.
- Trailing spaces at the beginning and end of both comments and strings must be considered.
- Blanks on empty lines, whether tabs (U+0009) or spaces (U+0020), can be discarded as they do not contribute anything to the Gura structure.
- The definition of a variable does not need to contain the `$` character since it is part of the formal definition of a variable.
- The value of the variable does not need to be computed since the evaluation is done during the parsing process.
- In order not to increase the complexity of the tokenization procedure, the standard space between the `:` and the value of a key/value pair is always 1, you may choose to keep a record with the `Space` structure if you wish, but it is not necessary.


[parsing-section]: /docs/Developers/parsing#basic-types
[comment-reference]: /docs/spec#comment
[variables-reference]: /docs/spec#variables
[imports-reference]: /docs/spec#imports
[tokenization-wiki]: https://en.wikipedia.org/wiki/Lexical_analysis
