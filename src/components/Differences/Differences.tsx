import React from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '../../pages/index.module.css';


/** Config language difference section */
interface DifferenceElem {
	/** Title of the section */
	title: string,
	/** Image of the language with which the comparison is being made */
	imageUrl: string,
	/** HTML/string content of the section */
	description: JSX.Element
}

const differences: DifferenceElem[] = [
	{
		title: 'Differences with YAML',
		imageUrl: 'img/differences/yaml.png',
		description: (
			<>
				<p>
					YAML offered a readable alternative to JSON or INI for a configuration file. While TOML was great for basic files because of its simplicity, YAML provided a readable solution when the complexity of the file grew. However, as the <a target='_blank' rel='noopener noreferrer' href='https://noyaml.com/'>NOYAML manifesto</a> argues, we should stop supporting that format. The reason? <a target='_blank' rel='noopener noreferrer' href='https://www.reddit.com/r/programming/comments/iqwbek/stop_adding_support_for_yaml_in_your_products/'>YAML is unnecessarily complex</a>. We highlight main issues with YAML that Gura tries to solve.

					<ul>
						<li>Multiple different ways to define a list and the elements inside it.</li>
						<li>4 (!) ways to define a boolean.</li>
						<li>Boolean automatically inferred from strings (<a target='_blank' rel='noopener noreferrer' href='https://stackoverflow.com/questions/53648244/specifying-the-string-value-yes-in-a-yaml-property'>workarounds</a>).</li>
						<li>Unnecessary unquoted strings that lead to float type inference problems.</li>
						<li>Serious security issues. <a target='_blank' rel='noopener noreferrer' href='https://pyyaml.docsforge.com/master/api/yaml/safe_load/'>Safe YAML</a> attempts to address those, but only those.</li>
						<li><a target='_blank' rel='noopener noreferrer' href='https://yaml.org/spec/1.2/spec.html'>Increadibly long YAML specs</a> for what is supposed to be a simple configuration language?</li>
						<li>Special data types such as <i>Date</i> or <i>Datetime</i> are defined in the spec, but the definition of their semantics is relegated to each specific implementation.</li>
					</ul>
        		</p>
			</>
		),
	},
	{
		title: 'Differences with JSON',
		imageUrl: 'img/differences/json.png',
		description: (
			<>
				<p>
					It's easy, JSON is and will be the fastest serialization language available. Gura is not meant for fast processing and/or machine-to-machine communication. When a readable, simple, and maintainable language is needed Gura becomes an excellent alternative.
				</p>
			</>
		),
	},
	{
		title: 'Differences with TOML',
		imageUrl: 'img/differences/toml.png',
		description: (
			<>
				<p>
					The idea of Gura is not to replace TOML but to complement it when the complexity of the project warrants it. The use of TOML for files such as <i>cargo.toml</i> in the Rust programming language is an excellent example of matching the complexity of the language to that of the domain. However, when the level of nesting increases, TOML is very cumbersome since you must resort to repeating all the parent levels (using Dotted keys) every time you want to define a nested value.

					Furthermore, even TOML falls in some cases into the same complexity as YAML, with features such as:

					<ul>
						<li>Multiple ways to specify keys.</li>
						<li>Empty keys.</li>
						<li>Special data types.</li>
					</ul>
        		</p>
			</>
		),
	},
	{
		title: 'Gura ⭐',
		imageUrl: 'img/differences/gura.png',
		description: (
			<>
				<p>
					Gura combines the readability of YAML and a reduced version of its syntax with the (even more simplified) simplicity of TOML. It also brings in some features and characteristics exclusive to this language:

					<ul>
						<li>📦 Variables: Gura allows you to define variables of any type, even using environment variables, </li>both as a flat value and as values inside a string. So you can compact and reuse the values you require.
						
						<li>📑 Imports: Gura defines a way to import different Gura files within the same file in order to </li>modularize the configuration.

						<li>🚫 Standard errors: Gura defines the semantic errors that should be thrown in certain </li>situations. This way you get an implementation-agnostic definition and the developer can get the same type of error regardless of the programming language he/she is using.

						<li>🥧 Gura is short and simple to learn and use since it follows the only one way to do it Python maxim.</li>

						<li>🌈 Writing a parser or wrapper for Gura in a new language should be a short and simple as well.</li>
					</ul>
        		</p>
			</>
		),
	},
];

interface LanguageComparisonProps {
	difference: DifferenceElem
}


/** Renders a language comparison section */
function LanguageComparison(props: LanguageComparisonProps) {
	const { imageUrl, title, description } = props.difference
	const imgUrl = useBaseUrl(imageUrl);
	return (
		<div className={`col col--6 ${styles.feature}`}>
			{imgUrl && (
				<div className="text--center">
					<img className='padding-vert--md difference-image' src={imgUrl} alt={title} />
				</div>
			)}
			<h3>{title}</h3>
			<p>{description}</p>
		</div>
	);
}


/** A comparison section with other config languages */
export const DifferencesSection = () => (
	<section className={`padded-section ${styles.features}`}>
		<div className="container margin-vert--md">
			<div className="row">
				{differences.map((difference, idx) => (
					<LanguageComparison key={idx} difference={difference} />
				))}
			</div>
		</div>
	</section>
)
