import React from 'react'
import styles from '../HomepageFeatures.module.css';
import stylesResourcesUsage from './ResourcesUsage.module.css'


/** Gura feature structure */
interface UsageExample {
    title: string,
    img: string,
    description: JSX.Element
}

const usageExamplesList: UsageExample[] = [
    {
        title: 'IDE extension',
        img: require('../../../static/img/logos-usage/IDE-extension.png').default,
        description: (
            <>
            {/* TODO: complete */}
                Gura is simple, and its "one way of doing things" philosophy minimizes the possibility of error and its implementation complexity.
            </>
        )
    },
    {
        title: 'Development',
        img: require('../../../static/img/logos-usage/development.png').default,
        description: (
            <>
            {/* TODO: complete */}
                Gura is simple, and its "one way of doing things" philosophy minimizes the possibility of error and its implementation complexity.
            </>
        )
    },
    {
        title: 'Anywhere!',
        img: require('../../../static/img/logos-usage/blog.png').default,
        description: (
            <>
            {/* TODO: complete */}
                Gura is simple, and its "one way of doing things" philosophy minimizes the possibility of error and its implementation complexity.
            </>
        )
    }
];


const ResourcesUsage = () => {
    return (
        <section className={`${styles.features} darker-row`}>
            <div className="container">
                <div className="row">
                    {usageExamplesList.map((example) => (
                        <div key={example.title} className='col col--4'>
                            <div className="text--center">
                                <img className={stylesResourcesUsage['usage-img']} src={example.img} alt={example.title} />
                            </div>
                            <div className="text--center padding-horiz--md">
                                <h3>{example.title}</h3>
                                <p>{example.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export { ResourcesUsage }