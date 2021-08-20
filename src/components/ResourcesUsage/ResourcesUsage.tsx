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
                Use the Gura thumbnail to style your extensions!
            </>
        )
    },
    {
        title: 'Development',
        img: require('../../../static/img/logos-usage/development.png').default,
        description: (
            <>
                You can use the official logo for the design of your tools and websites!
            </>
        )
    },
    {
        title: 'Anywhere!',
        img: require('../../../static/img/logos-usage/blog.png').default,
        description: (
            <>
                Whether it's your blog, your library, or any project you have in mind, you have Gura's resources at hand!
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