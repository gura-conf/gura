import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import { FeaturesReview} from '../components/FeaturesReview/FeaturesReview'
import { DifferencesSection } from '../components/Differences/Differences';
import CodeSnippet from '../theme/CodeSnippet';


const HeaderWithCodeSnippet = () => {
    const { siteConfig } = useDocusaurusContext();

    const snippetContent = `# This is a comment in a Gura configuration file.
# Define a variable named \`title\` with string value "Gura Example"
title: "Gura Example"

# Define an object with fields \`username\` and \`age\`
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
color_scheme:
    editor: $foreground
    ui: $foreground`

    return (
        <header className={`hero ${styles.mainBanner}`}>
            <div className="container">
                <div className="row">
                    <div className='col col--6'>
                        <h1 className="hero__title">{siteConfig.title}</h1>
                        <p className="hero__subtitle">
                            Gura is a file format for configuration files. Gura is as <b>readable as YAML</b> and <b>simple as TOML</b>. Its syntax is clear and powerful, yet familiar for YAML/TOML users.
                        </p>
                        <div className="row">
                            <div className='col col--3'>
                                <div className={styles.buttons}>
                                    <Link
                                        className="button button--primary button--lg"
                                        to="/docs/gura">
                                        Get started
                                    </Link>
                                </div>
                            </div>
                            <div id='find-library-col' className='col col--3'>
                                <div className={styles.buttons}>
                                    <Link
                                        className="button button--secondary button--lg margin-left--md"
                                        to="https://github.com/gura-conf/gura#library-implementations">
                                        Find a library
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id='main-snippet-col' className='col col--6'>
                        <CodeSnippet className={styles.configSnippet} snippet={snippetContent} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default function Home() {
    const title = 'Gura | Configuration language'
    return (
        <Layout
            description="The new configuration language. Readable as YAML, simple as TOML."
            keywords={["Gura", "configuration language", "simple", "easy", "yaml", "toml", "json"]}>

            <Head>
                <title>{title}</title>
                <meta
                    property="og:title"
                    content={title}
                />
                <meta
                    property="twitter:title"
                    content={title}
                />
            </Head>

            <HeaderWithCodeSnippet />

            <main>
                <FeaturesReview />

                <DifferencesSection/>

                <HomepageFeatures />
            </main>
        </Layout>
    );
}
