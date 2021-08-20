import React from "react";
import Layout from "@theme/Layout";
import { ResourcesUsage } from '../components/ResourcesUsage/ResourcesUsage'
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import { ResourceList } from '../components/ResourceList/ResourceList'


export default function ResourcesPage() {
	const { siteConfig } = useDocusaurusContext();
	const pageTitle = `${siteConfig.title} Official branding`

	return (
		<Layout title={pageTitle}>
			<header className={`hero ${styles.mainBanner}`}>
				<div className="container">
					<div className="row">
						<div className='col col--6'>
							<h1 className="hero__title">{pageTitle}</h1>
							<p className="hero__subtitle">
								If you are developing your own tool for Gura management, be it a parser, an IDE extension or just want to mention the language, you are free to use our official logos.
							</p>
						</div>
						<div id='main-snippet-col' className='col col--6'>
							<ResourceList />
						</div>
					</div>
				</div>
			</header>

			<main>
				<ResourcesUsage />
			</main>
		</Layout>
	);
}
