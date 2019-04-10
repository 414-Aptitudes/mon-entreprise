import { T } from 'Components'
import withSitePaths from 'Components/utils/withSitePaths'
import React from 'react'
import emoji from 'react-easy-emoji'
import { Link } from 'react-router-dom'
import animate from 'Ui/animate'

const SchemeChoice = withSitePaths(({ sitePaths }) => (
	<animate.fromBottom>
		<h1>
			<T>Quel régime souhaitez-vous explorer ?</T>
		</h1>
		<p style={{ display: 'flex', flexWrap: 'wrap' }}>
			<Link
				to={sitePaths.sécuritéSociale['assimilé-salarié']}
				className="ui__ button-choice"
				style={{ textAlign: 'center', flex: 1, margin: '0.5rem' }}>
				{emoji('☂')}
				<br />
				<T>Assimilé salarié</T>
				<br />
				<small>
					<T>SAS, SASU ou SARL minoritaires</T>
				</small>
			</Link>
			<Link
				to={sitePaths.sécuritéSociale.indépendant}
				className="ui__ button-choice"
				style={{ textAlign: 'center', flex: 1, margin: '0.5rem' }}>
				{emoji('👩‍🔧')}
				<br />
				<T>Indépendant</T>
				<br />
				<small>
					<T>EI, EURL, SARL ou SARL majoritaires</T>
				</small>
			</Link>
			<Link
				to={sitePaths.sécuritéSociale['auto-entrepreneur']}
				className="ui__ button-choice"
				style={{ textAlign: 'center', flex: 1, margin: '0.5rem' }}>
				{emoji('🚶‍♂️')}
				<br />
				Auto-entrepreneur <br />
			</Link>
		</p>
		<p>
			<Link
				className={
					'ui__ button-choice' +
					(!process.env.DEMO ? ' button-choice--soon' : '')
				}
				to={sitePaths.sécuritéSociale.comparaison}
				style={{ textAlign: 'center', flex: 1, margin: '0.5rem' }}>
				{!process.env.DEMO && (
					<span className="ui__ button-choice-label">
						<T>prochainement</T>
					</span>
				)}
				{emoji('🚶‍♂️')}
				<T>Comparer les trois régimes</T>
			</Link>
		</p>
	</animate.fromBottom>
))

export default SchemeChoice
