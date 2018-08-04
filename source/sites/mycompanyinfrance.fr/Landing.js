/* @flow */

import withColours from 'Components/utils/withColours'
import React from 'react'
import emoji from 'react-easy-emoji'
import { Link } from 'react-router-dom'
import { config } from 'react-spring'
import * as Animate from 'Ui/animate'
import './Landing.css'
import marianneSvg from './marianne.svg'
import urssafSvg from './urssaf.svg'

const Landing = ({ colours: { colour } }) => (
	<>
		<section className="landing__header" style={{ backgroundColor: colour }}>
			<div className="landing__banner">
				<img alt="logo marianne" src={marianneSvg} />
				<img alt="logo urssaf" src={urssafSvg} />
			</div>
			<header>
				<Animate.fromBottom delay={500} config={config.slow}>
					<h1>Start your business in France.</h1>
					<Link
						className="ui__ inverted-button cta"
						to="/register"
						alt="the first step to create a company">
						Take the step by step guide
					</Link>
				</Animate.fromBottom>
			</header>
		</section>
		<section className="ui__ container landing-explanation">
			<h2>1. Create your company {emoji('🏗️')}</h2>
			<ul>
				<li>Find the legal status that suits you in one minute.</li>
				<li>Choose the best location for your enterprise.</li>
				<li>
					Complete the different steps up to the registration of your company.
				</li>
			</ul>

			<h2>2. Simulate costs and social benefits {emoji('💶')} </h2>
			<ul>
				<li>Discover French social security. </li>
				<li>Find out about benefits and what is covered. </li>
				<li>Simulate the contribution amount for all policy types. </li>
				<li>Navigate between the different sections of a pay slip.</li>
			</ul>
			<h2>3. Hire your first employee {emoji('🤝')}</h2>
			<ul>
				<li>See the hiring procedures in France. </li>
				<li>
					Learn the basics of french labour law. Write an employment contract.{' '}
				</li>
				<li>Know the different tools for editing a compliant payslip.</li>
			</ul>
		</section>
		<section className="landing__nav" />
	</>
)

export default withColours(Landing)
