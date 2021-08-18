import React from 'react'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeSnippet from "../../theme/CodeSnippet";
import styles from '../../pages/index.module.css';
import Link from '@docusaurus/Link';

/** TODO: add docs */
interface Snippet {
    label: string, 
    further: string,
    config: string
}

/** TODO: add docs */
const snippets: Snippet[] = [
    {
        label: 'Strings',
        further: '/docs/spec#string',
        config: `basic: "I'm a string. \"You can quote me\". Name\\tJos\\u00E9\\nLocation\\tSF."

multiline_basic: """
    The quick brown \\
    fox jumps over \\
    the lazy dog."""

literal: 'C:\Users\\nodejs\\templates'

multiline_literal: lines: '''
The first newline is
    trimmed in raw strings.
    All other whitespace
    is preserved.`
    },
    {
        label: 'Numbers',
        further: '/docs/spec#integer',
        config: `# Integers
int1: +99
int2: 1_000 # Separator!

# Different formats
hex: 0xDEADBEEF # Hexadecimal
oct: 0o01234567 # Octal
bin: 0b11010110 # Binary

# Floats
flt1: +1.0
flt2: 3.1415

# Infinity
sf1: inf  # Positive infinity
sf2: +inf # Positive infinity
sf3: -inf # Negative infinity

# Not a number
sf4: nan  # Actual sNaN/qNaN encoding is implementation-specific
sf5: +nan # Same as \`nan\`
sf6: -nan # Valid, actual encoding is implementation-specific`,
    },
    {
        label: 'Objects',
        further: '/docs/spec#object',
        config: `services:
    nginx:
        host: "127.0.0.1"
        port: 80

    apache:
        virtual_host: "10.10.10.4"
        port: 81`
    },
    {
        label: 'Arrays',
        further: '/docs/spec#array',
        config: `numbers: [ 0.1, 0.2, 0.5, 1, 2, 5 ]

# Nested and mixed
numbers_and_strings: [ [ 1, 2 ], ["a", "b", "c"] ]

# Array of objects
tango_singers: [
    user1:
        name: "Carlos"
        surname: "Gardel"
        year_of_birth: 1890,
    user2:
        name: "Aníbal"
        surname: "Troilo"
        year_of_birth: 1914
]`
    },
    {
        label: 'Variables',
        further: '/docs/spec#variables',
        config: `$my_host: "127.0.0.1"
nginx:
    host: $my_host
    port: 8080`
    },
];


const FeaturesReview = () => {
    return (
        <div className="padded-section darker-row">
            <div className="container">
                <div className="row">
                    <div className='col col--6'>
                        {snippets && snippets.length && (
                            <section className={styles.configSnippets}>
                                <Tabs defaultValue={snippets[0].label} values={snippets.map((snippet) => (
                                    { label: snippet.label, value: snippet.label }
                                ))}>
                                    {snippets.map((props, idx) => (
                                        <TabItem key={idx} value={props.label}>
                                            <CodeSnippet className={styles.configSnippet} snippet={props.config} />
                                            <Link className='button button--outline button--secondary'
                                                to={props.further}>
                                                Read more about {props.label.toLowerCase()}
                                            </Link>
                                        </TabItem>
                                    ))}
                                </Tabs>
                            </section>
                        )}
                    </div>
                    
                    <div className={`${styles.pitch} col col--6`}>
                        <h2>Gura is simple and elegant</h2>
                        <p>
                            Gura was born from the need to have a configuration language that is <strong>human readable without falling into the unnecessary complexity</strong> of popular formats such as YAML.
                        </p>
                        <Link className='button button--outline button--primary'
                            to='docs/spec'>
                            Read more the full specs!
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { FeaturesReview }