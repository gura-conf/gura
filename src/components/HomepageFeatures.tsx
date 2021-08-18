import React from 'react';
import styles from './HomepageFeatures.module.css';

interface Feature {
    img: string,
    title: string,
    description: JSX.Element
}


const FeatureList: Feature[] = [
    {
        title: 'Simple',
        img: require('../../static/img/features/simple.png').default,
        description: (
            <>
                Gura is simple, and its "one way of doing things" philosophy minimizes the possibility of error and its implementation complexity.
            </>
        ),
    },
    {
        title: 'Robust',
        img: require('../../static/img/features/robustness.png').default,
        description: (
            <>
                Gura has no implicit mechanisms that lead to bugs, it is strongly typed and bugs are standardized to make it a robust configuration language.
            </>
        ),
    },
    {
        title: 'Friendly',
        img: require('../../static/img/features/friendly.png').default,
        description: (
            <>
                Gura retains the best aspects of well-known languages such as TOML and YAML to make user adoption a smooth and agile process.
            </>
        ),
    },
];


function Feature(props: Feature) {
    return (
        <div className='col col--4'>
            <div className="text--center">
                <img src={props.img} alt={props.title} />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{props.title}</h3>
                <p>{props.description}</p>
            </div>
        </div>
    );
}

/**
 * Renders list of features
 * @returns Component
 */
export default function HomepageFeatures() {
    return (
        <section className={`${styles.features} darker-row`}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((feature, idx) => (
                        <Feature key={idx} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}
