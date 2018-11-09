/* @flow */
import { React, T } from 'Components'
import { compose } from 'ramda'
import emoji from 'react-easy-emoji'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import selectors from 'Selectors/progressSelectors'
import companySvg from '../../images/company.svg'
import estimateSvg from '../../images/estimate.svg'
import hiringSvg from '../../images/hiring.svg'
import './Navigation.css'
import NavOpener from './NavOpener'
import SideBar from './SideBar'
import type { TFunction } from 'react-i18next'

const Progress = ({ percent }) => (
	<div className="progress">
		<div
			className="bar"
			style={{
				width: `${percent}%`
			}}
		/>
	</div>
)
type Props = {
	companyProgress: number,
	estimationProgress: number,
	hiringProgress: number,
	companyStatusChoice: string,
	t: TFunction
}
const StepsHeader = ({
	companyProgress,
	t,
	estimationProgress,
	hiringProgress,
	companyStatusChoice
}: Props) => (
	<SideBar>
		<div className="navigation__container">
			<nav className="navigation">
				<ul>
					<li>
						<NavOpener
							to="/company"
							exact={false}
							title={
								<>
									<T>Votre entreprise</T>
									<img
										style={{ height: '2.5rem', marginBottom: '-0.8rem' }}
										src={companySvg}
									/>
									<Progress percent={companyProgress} />
								</>
							}>
							<ul>
								<li>
									<NavOpener title={t('Créez votre entreprise')}>
										<ul>
											<li>
												<NavOpener
													to="/company/legal-status"
													title={t('Guide du statut juridique')}>
													<ul>
														<li>
															<NavLink to="/company/legal-status/number-of-associates">
																<T>Nombre d'associés</T>
															</NavLink>
														</li>
														<li>
															<NavLink to="/company/legal-status/director-status">
																<T>Status du dirigeant</T>
															</NavLink>
														</li>
														<li>
															<NavLink to="/company/legal-status/liability">
																<T>Responsabilité</T>
															</NavLink>
														</li>
														<li>
															<NavLink to="/company/legal-status/minority-director">
																<T>Gérant majoritaire ou minoritaire</T>
															</NavLink>
														</li>
														<li>
															<NavLink to="/company/legal-status/micro-enterprise">
																<T>Micro-entreprise ou EI</T>
															</NavLink>
														</li>
														<li>
															<NavLink to="/company/legal-status/list">
																<T>Liste des status</T>
															</NavLink>
														</li>
													</ul>
												</NavOpener>
											</li>
											<li>
												{/* Todo remove when no choice */}
												<NavOpener
													to={
														companyStatusChoice
															? `/company/create-${companyStatusChoice}`
															: null
													}
													title={t('Démarches de création')}>
													<ul>
														<li>
															<NavLink to="/company/create-micro-enterprise">
																<T>Micro-entreprise</T>
															</NavLink>
														</li>
														<li>
															<NavLink to="/company/create-EI">EI</NavLink>
														</li>
														<li>
															<NavLink to="/company/create-EIRL">EIRL</NavLink>
														</li>
														<li>
															<NavLink to="/company/create-EURL">EURL</NavLink>
														</li>
														<li>
															<NavLink to="/company/create-SA">SA</NavLink>
														</li>
														<li>
															<NavLink to="/company/create-SARL">SARL</NavLink>
														</li>
														<li>
															<NavLink to="/company/create-SAS">SAS</NavLink>
														</li>
														<li>
															<NavLink to="/company/create-SASU">SASU</NavLink>
														</li>
														<li>
															<NavLink to="/company/create-SNC">SNC</NavLink>
														</li>
													</ul>
												</NavOpener>
											</li>
											<li>
												<NavLink to="/company/after-registration">
													<T k="entreprise.tâches.ensuite">Après la création</T>
												</NavLink>
											</li>
										</ul>
									</NavOpener>
								</li>
								<li>
									<NavLink to="/company/find">
										<T k="trouver.titre">Trouver mon entreprise</T>
									</NavLink>
								</li>
							</ul>
						</NavOpener>
					</li>
					<li>
						<NavLink exact to="/social-security">
							<T>Protection sociale</T>
							<img
								style={{ height: '2.5rem', marginBottom: '-0.8rem' }}
								src={estimateSvg}
							/>
							{estimationProgress === 100 && emoji('🌞')}
							<Progress percent={estimationProgress} />
						</NavLink>
					</li>
					<li>
						<NavLink to="/hiring-process">
							<T>Embauche</T>
							<img
								style={{ height: '2.5rem', marginBottom: '-0.8rem' }}
								src={hiringSvg}
							/>
							{hiringProgress === 100 && emoji('🌞')}
							<Progress percent={hiringProgress} />
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	</SideBar>
)

export default compose(
	withRouter,
	translate(),
	connect(
		state => ({
			...selectors(state),
			companyStatusChoice: state.inFranceApp.companyStatusChoice
		}),
		{}
	)
)(StepsHeader)
