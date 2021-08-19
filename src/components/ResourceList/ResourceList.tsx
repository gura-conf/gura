import React from "react";
import stylesIndex from "../../pages/index.module.css";
import stylesResource from "./ResourceList.module.css";


/** Link to download a resource */
type ResourceLink = {
	description: string,
	link: string
}

/** Resource */
interface Resource {
	img: string,
	title: string,
	links: ResourceLink[]
}

const resourceList: Resource[] = [
	{
		title: 'Official logo',
		img: require('../../../static/img/logos/gura-200.png').default,
		links: [
			{ description: '200 x 200', link: '/static/img/logos/gura-200.png' },
			{ description: '500 x 500', link: '/static/img/logos/gura-500.png' }
		]
	},
	{
		title: 'Official thumbnail',
		img: require('../../../static/img/logos/gura-thumbnail.png').default,
		links: [
			{ description: '500 x 500', link: '/static/img/logos/gura-thumbnail.png' },
		]
	},
];

/** Renders a resource section with download buttons */
function Resource(props: Resource) {
	const lastLinkIdx = props.links.length - 1
	return (
		<div className='col'>
			<img className={stylesResource['logo-img']} src={props.img} alt={props.title} />
			<div className={`padding-horiz--md ${stylesResource['download-buttons-div']}`}>
				{props.links.map((resourceLink, idx) => {
					const marginClass = idx < lastLinkIdx ? 'margin-bottom--md' : ''
					return (
						<div key={resourceLink.description} className="row">
							<div className='col col--6 col--offset-3'>
								<div className={stylesIndex.buttons}>
									<a
										className={`button button--secondary button--md ${marginClass}`}
										href={resourceLink.link}
										target='_blank'
										rel='noreferrer noopener'
										title={`Download ${props.title} (${resourceLink.description})`}
									>
										{resourceLink.description}
									</a>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	);
}

/**
 * Renders list of resources
 * @returns Component
 */
const ResourceList = () => (
	<section>
		<div className="container">
			<div className="row text--center">
				{resourceList.map((feature) => (
					<Resource key={feature.title} {...feature} />
				))}
			</div>
		</div>
	</section>
)

export { ResourceList }
