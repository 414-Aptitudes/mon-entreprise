import R from 'ramda'
import React, { Component } from 'react'
import classNames from 'classnames'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'

import './Results.css'
import {clearDict} from 'Engine/traverse'
import {encodeRuleName} from 'Engine/rules'
import {getObjectives} from 'Engine/generateQuestions'
import RuleValueVignette from './rule/RuleValueVignette'

@withRouter
@connect(
	state => ({
		analysedSituation: state.analysedSituation,
		conversationStarted: !R.isEmpty(state.form),
		conversationFirstAnswer: R.path(['form', 'conversation', 'values'])(state),
		situationGate: state.situationGate
	})
)
export default class Results extends Component {
	componentDidMount(){
		setTimeout(() =>
			this.props.setElementHeight(this.el.offsetHeight)
		, 1)
	}
	render() {
		let {
			analysedSituation,
			conversationStarted,
			conversationFirstAnswer: showResults,
			situationGate,
			location
		} = this.props

		let explanation = R.has('root', analysedSituation) && clearDict() && getObjectives(situationGate, analysedSituation.root, analysedSituation.parsedRules)

		if (!explanation) return null

		let onRulePage = R.contains('/regle/')(location.pathname)
		return (
			<section ref={el => this.el = el} id="results" className={classNames({show: showResults})}>
				{onRulePage && conversationStarted ?
					<div id ="results-actions">
						<Link id="toSimulation" to={"/simu/" + encodeRuleName(analysedSituation.root.name)}>
							<i className="fa fa-arrow-circle-left" aria-hidden="true"></i>Reprendre la simulation
						</Link>
					</div>
					: <div id="results-titles">
						<h2><i className="fa fa-calculator" aria-hidden="true"></i>{explanation.length == 1 ? 'Votre résultat' : 'Vos résultats'}<span>·</span><small>Cliquez pour comprendre chaque calcul</small></h2>
					</div>
				}
				<ul>
					{explanation.map( rule => <li key={rule.nom}>
						<RuleValueVignette {...rule} conversationStarted={conversationStarted} />
					</li>)}
				</ul>
			</section>
		)
	}
}
