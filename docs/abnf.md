---
sidebar_position: 4
---

# ABNF grammar

This document describes Gura's syntax, using the ABNF format (defined in RFC 5234 -- https://www.ietf.org/rfc/rfc5234.txt).

All valid Gura documents will match this description, however certain invalid documents would need to be rejected as per the semantics described in the supporting text description.

It is possible to try this grammar interactively, using [instaparse](http://instaparse.mojombo.com/). To do so, in the lower right, click on Options and change `:input-format` to `:abnf`. Then paste this entire ABNF document into the grammar entry box (above the options). Then you can type or paste a sample Gura document into the beige box on the left.

```abnf
;; Overall Structure
gura = expression *( newline expression )

expression =  ws [ comment ]
expression =/ ws variable-definition ws [ comment ]
expression =/ import ws [ comment ]
expression =/ object

;; Variables
dollar-sign =  %x24  ; $
var-val = string / float / integer / other-variable
keyval-var = unquoted-key keyval-sep var-val
variable-definition = dollar-sign keyval-var ws [ comment ]
other-variable = ws dollar-sign unquoted-key ws [ comment]

;; Imports
import-keyword = %x69 %x6D %x70 %x6F %x72 %x74 ; "import"
import = import-keyword wschar basic-string

;; Objects
object = ws unquoted-key keyval-sep ws [comment] newline object
object =/ keyval-with-spaces *( newline object )


;; Whitespace
ws = *wschar
wschar =  %x20  ; Space
wschar =/ %x09  ; Horizontal tab


;; Newline
newline =  %x0A     ; LF
newline =/ %x0D.0A  ; CRLF


;; Comment
comment-start-symbol = %x23 ; #
non-ascii = %x80-D7FF / %xE000-10FFFF
non-eol = %x09 / %x20-7F / non-ascii
comment = comment-start-symbol *non-eol


;; Key-Value pairs
keyval-with-spaces = ws keyval ws [ comment ]
keyval = unquoted-key keyval-sep val
unquoted-key = 1*( ALPHA / DIGIT / %x2D / %x5F ) ; A-Z / a-z / 0-9 / - / _
keyval-sep = ws %x3A ws ; ':' Colon


;; Values
val = null / string / boolean / array / float / integer / other-variable / empty


;; Null
null = %x6E.75.6C.6C ; null


;; Empty
empty = %x65.6D.70.74.79 ; empty


;; String
string = ml-basic-string / basic-string / ml-literal-string / literal-string


;; Basic String
basic-string = quotation-mark *basic-char quotation-mark

quotation-mark = %x22            ; "

basic-char = basic-unescaped / escaped
basic-unescaped = wschar / %x21 / %x23-5B / %x5D-7E / non-ascii
escaped = escape escape-seq-char

escape = %x5C                   ; \
escape-seq-char =  %x22         ; "    quotation mark  U+0022
escape-seq-char =/ %x5C         ; \    reverse solidus U+005C
escape-seq-char =/ %x62         ; b    backspace       U+0008
escape-seq-char =/ %x66         ; f    form feed       U+000C
escape-seq-char =/ %x6E         ; n    line feed       U+000A
escape-seq-char =/ %x72         ; r    carriage return U+000D
escape-seq-char =/ %x74         ; t    tab             U+0009
escape-seq-char =/ %x75 4HEXDIG ; uXXXX                U+XXXX
escape-seq-char =/ %x55 8HEXDIG ; UXXXXXXXX            U+XXXXXXXX


;; Multiline Basic String
ml-basic-string = ml-basic-string-delim [ newline ] ml-basic-body
                  ml-basic-string-delim
ml-basic-string-delim = 3quotation-mark
ml-basic-body = *mlb-content *( mlb-quotes 1*mlb-content ) [ mlb-quotes ]

mlb-content = mlb-char / newline / mlb-escaped-nl
mlb-char = mlb-unescaped / escaped
mlb-quotes = 1*2quotation-mark
mlb-unescaped = wschar / %x21 / %x23-5B / %x5D-7E / non-ascii
mlb-escaped-nl = escape ws newline *( wschar / newline )


;; Literal String
literal-string = apostrophe *literal-char apostrophe
apostrophe = %x27 ; ' apostrophe
literal-char = %x09 / %x20-26 / %x28-7E / non-ascii


;; Multiline Literal String
ml-literal-string = ml-literal-string-delim [ newline ] ml-literal-body
                    ml-literal-string-delim
ml-literal-string-delim = 3apostrophe
ml-literal-body = *mll-content *( mll-quotes 1*mll-content ) [ mll-quotes ]

mll-content = mll-char / newline
mll-char = %x09 / %x20-26 / %x28-7E / non-ascii
mll-quotes = 1*2apostrophe


;; Integer
integer = dec-int / hex-int / oct-int / bin-int

minus = %x2D                       ; -
plus = %x2B                        ; +
underscore = %x5F                  ; _
digit1-9 = %x31-39                 ; 1-9
digit0-7 = %x30-37                 ; 0-7
digit0-1 = %x30-31                 ; 0-1

hex-prefix = %x30.78               ; 0x
oct-prefix = %x30.6F               ; 0o
bin-prefix = %x30.62               ; 0b

dec-int = [ minus / plus ] unsigned-dec-int
unsigned-dec-int = DIGIT / digit1-9 1*( DIGIT / underscore DIGIT )

hex-int = hex-prefix HEXDIG *( HEXDIG / underscore HEXDIG )
oct-int = oct-prefix digit0-7 *( digit0-7 / underscore digit0-7 )
bin-int = bin-prefix digit0-1 *( digit0-1 / underscore digit0-1 )


;; Float
float = float-int-part ( exp / frac [ exp ] )
float =/ special-float

float-int-part = dec-int
frac = decimal-point zero-prefixable-int
decimal-point = %x2E               ; .
zero-prefixable-int = DIGIT *( DIGIT / underscore DIGIT )

exp = "e" float-exp-part
float-exp-part = [ minus / plus ] zero-prefixable-int

special-float = [ minus / plus ] ( inf / nan )
inf = %x69.6E.66  ; inf
nan = %x6E.61.6E  ; nan


;; Boolean
boolean = true / false

true    = %x74.72.75.65     ; true
false   = %x66.61.6C.73.65  ; false


;; Array
array = array-open [ array-values ] ws-comment-newline array-close

array-open =  %x5B ; [
array-close = %x5D ; ]

array-values =  ws-comment-newline val-object ws-comment-newline array-sep array-values
array-values =/ ws-comment-newline val-object ws-comment-newline [ array-sep ]

val-object = ( val / object )

array-sep = %x2C  ; , Comma

ws-comment-newline = *( wschar / [ comment ] newline )


;; Built-in ABNF terms, reproduced here for clarity
ALPHA = %x41-5A / %x61-7A ; A-Z / a-z
DIGIT = %x30-39 ; 0-9
HEXDIG = DIGIT / "A" / "B" / "C" / "D" / "E" / "F"
```