import LangSwitcher from 'Components/LangSwitcher'
import React, { Component } from 'react'
import emoji from 'react-easy-emoji'
import { Trans, withNamespaces } from 'react-i18next'
import screenfull from 'screenfull'
import { isIE } from '../../../utils'

export default withNamespaces()(
	class IframeFooter extends Component {
		componentDidMount() {
			screenfull.enabled && screenfull.onchange(() => this.forceUpdate())
		}

		render() {
			return (
				<div
					className="ui__ container"
					style={{
						textAlign: 'right',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between'
					}}>
					<LangSwitcher className="ui__ button simple" />
					{screenfull.enabled && !screenfull.isFullscreen && !isIE() && (
						<button
							className="ui__ button small"
							onClick={() => {
								screenfull.toggle()
							}}>
							{emoji('🖵')}&nbsp;
							<Trans>Plein écran</Trans>
						</button>
					)}
					<button className="ui__ button small" onClick={() => window.print()}>
						{emoji('🖨')}
						<Trans>Imprimer</Trans>
					</button>
				</div>
			)
		}
	}
)
