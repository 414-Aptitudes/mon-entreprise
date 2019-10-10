import { T } from 'Components'
import Distribution from 'Components/Distribution'
import PaySlip from 'Components/PaySlip'
import StackedBarChart from 'Components/StackedBarChart'
import { getRuleFromAnalysis } from 'Engine/rules'
import React, { useRef } from 'react'
import emoji from 'react-easy-emoji'
import { Trans } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
	analysisWithDefaultsSelector,
	usePeriod
} from 'Selectors/analyseSelectors'
import * as Animate from 'Ui/animate'

class ErrorBoundary extends React.Component {
	state = {}
	static getDerivedStateFromError() {
		return {
			error:
				'The SalaryExplanation component triggered an error. This often happens in its subcomponents reducers'
		}
	}
	render() {
		if (this.state.error)
			return <div css="background: red; ">Erreur : {this.state.error}</div>
		return this.props.children
	}
}

export default function SalaryExplanation() {
	const showDistributionFirst = useSelector(
		state => !state.conversationSteps.foldedSteps.length
	)
	const distributionRef = useRef({})
	return (
		<ErrorBoundary>
			<Animate.fromTop key={showDistributionFirst}>
				{showDistributionFirst ? (
					<>
						<RevenueRepatitionSection />
						<DistributionSection />
						<PaySlipSection />
					</>
				) : (
					<>
						<RevenueRepatitionSection />
						<div css="text-align: center">
							<button
								className="ui__ small simple button"
								onClick={() =>
									distributionRef.current.scrollIntoView({
										behavior: 'smooth',
										block: 'start'
									})
								}>
								{emoji('📊')} <T>Voir la répartition des cotisations</T>
							</button>
						</div>
						<PaySlipSection />
						<div ref={distributionRef}>
							<DistributionSection />
						</div>
					</>
				)}
				<br />
				<p className="ui__ notice">
					<Trans i18nKey="payslip.notice">
						Le simulateur vous aide à comprendre votre bulletin de paie, sans
						lui être opposable. Pour plus d&apos;informations, rendez vous
						sur&nbsp;
						<a
							alt="service-public.fr"
							href="https://www.service-public.fr/particuliers/vosdroits/F559">
							service-public.fr
						</a>
						.
					</Trans>
				</p>
				<p className="ui__ notice">
					<Trans i18nKey="payslip.disclaimer">
						Il ne prend pour l'instant pas en compte les accords et conventions
						collectives, ni la myriade d'aides aux entreprises. Trouvez votre
						convention collective{' '}
						<a href="https://socialgouv.github.io/conventions-collectives">
							ici
						</a>
						, et explorez les aides sur&nbsp;
						<a href="https://www.aides-entreprises.fr">aides-entreprises.fr</a>.
					</Trans>
				</p>
			</Animate.fromTop>
		</ErrorBoundary>
	)
}

function RevenueRepatitionSection() {
	const analysis = useSelector(analysisWithDefaultsSelector)
	const getRule = getRuleFromAnalysis(analysis)
	const { t } = useTranslation()

	return (
		<section>
			<h2>Répartition du total chargé</h2>
			<StackedBarChart
				data={[
					{
						...getRule('contrat salarié . rémunération . net après impôt'),
						name: t('Revenu disponible'),
						color: '#4D96A7'
					},
					{ ...getRule('impôt'), name: t('Impôts'), color: '#A74D92' },
					{
						...getRule('contrat salarié . cotisations'),
						color: '#724DA7'
					}
				]}
			/>
		</section>
	)
}

function PaySlipSection() {
	const period = usePeriod()
	return (
		<section>
			<h2>
				<Trans>
					{period === 'mois'
						? 'Fiche de paie mensuelle'
						: 'Détail annuel des cotisations'}
				</Trans>
			</h2>
			<PaySlip />
		</section>
	)
}

const DistributionSection = () => (
	<section>
		<h2>
			<Trans>À quoi servent mes cotisations ?</Trans>
		</h2>
		<Distribution />
	</section>
)
