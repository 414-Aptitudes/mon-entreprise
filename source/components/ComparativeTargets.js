import React from 'react'
import {
	flatRulesSelector,
	analysisWithDefaultsSelector
} from 'Selectors/analyseSelectors'
import { connect } from 'react-redux'
import './ComparativeTargets.css'
import withColours from 'Components/utils/withColours'
import { Link } from 'react-router-dom'
import emoji from 'react-easy-emoji'
import { compose } from 'ramda'
import AnimatedTargetValue from './AnimatedTargetValue'
import PeriodSwitch from 'Components/PeriodSwitch'
import { findRuleByDottedName } from 'Engine/rules'
import { formValueSelector } from 'redux-form'
export default compose(
	connect(
		state => ({
			target: findRuleByDottedName(
				flatRulesSelector(state),
				state.simulationConfig?.objectifs[0]
			),
			simulationBranches: state.simulationConfig?.branches,
			analyses: analysisWithDefaultsSelector(state),
			chiffreAffaires: formValueSelector('conversation')(
				state,
				"entreprise . chiffre d'affaires"
			)
		}),
		dispatch => ({
			setSituationBranch: id => dispatch({ type: 'SET_SITUATION_BRANCH', id })
		})
	),
	withColours
)(
	class ComparativeTargets extends React.Component {
		render() {
			let {
				colours,
				analyses,
				target,
				setSituationBranch,
				chiffreAffaires,
				simulationBranches
			} = this.props
			if(!simulationBranches) {
				return null;
			}
			return (
				<div id="comparative-targets">
					<h3>{target.title}</h3>
					<PeriodSwitch />
					<ul>
						{analyses.map((analysis, i) => {
							if (!analysis.targets) return null
							let { nodeValue, dottedName } = analysis.targets[0],
								name = simulationBranches[i].nom

							let microNotApplicable =
								name === 'Micro-entreprise' &&
								analysis.controls?.find(({ test }) =>
									test.includes('base des cotisations > plafond')
								)

							return (
								<li
									style={{
										color: colours.textColour,
										background: `linear-gradient(
											60deg,
											${colours.darkColour} 0%,
											${colours.colour} 100%
										)`
									}}
									className={microNotApplicable ? 'microNotApplicable' : ''}
									key={name}>
									<span className="title">{name}</span>
									{microNotApplicable ? (
										<p id="microNotApplicable">{microNotApplicable.message}</p>
									) : (
										<>
											<span className="figure">
												<span className="value">
													<AnimatedTargetValue value={nodeValue} />
												</span>{' '}
												<Link
													title="Quel est calcul ?"
													style={{ color: this.props.colours.colour }}
													to={'/règle/' + dottedName}
													onClick={() => setSituationBranch(i)}
													className="explanation">
													{emoji('📖')}
												</Link>
											</span>
											<small>
												Soit{' '}
												{Math.round(
													((chiffreAffaires - nodeValue) / +chiffreAffaires) *
														100
												)}{' '}
												% de prélèvements
											</small>
										</>
									)}
								</li>
							)
						})}
					</ul>
				</div>
			)
		}
	}
)
