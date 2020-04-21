import React, { useState } from 'react'
import { Trans } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from 'Reducers/rootReducer'
import Answers from './AnswerList'
import './conversation.css'

export default function SeeAnswersButton() {
	const arePreviousAnswers = !!useSelector(
		(state: RootState) => state.simulation?.foldedSteps.length
	)
	const [showAnswerModal, setShowAnswerModal] = useState(false)
	return (
		<>
			{arePreviousAnswers && (
				<button
					className="ui__ small simple  button "
					onClick={() => setShowAnswerModal(true)}
				>
					<Trans>Modifier mes réponses</Trans>
				</button>
			)}
			{showAnswerModal && <Answers onClose={() => setShowAnswerModal(false)} />}
		</>
	)
}
