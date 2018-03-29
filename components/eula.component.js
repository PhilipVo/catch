import React, { Component } from 'react';
import {
	AsyncStorage,
	ScrollView,
	Text,
	TouchableHighlight,
	View
} from 'react-native';

module.exports = class EULAComponent extends Component {
	render() {
		return (
			<View style={{ backgroundColor: '#f74434', flex: 1, padding: 20, paddingTop: 40 }}>
				<View style={{ flex: 11 }}>
					<ScrollView>
						<Text style={{ color: 'white' }}>
							{`End-User License Agreement ("Agreement")

Last updated: October 26, 2017

Please read this End-User License Agreement ("Agreement") carefully before clicking the "I Agree" button, downloading or using Catch ("Application").

By clicking the "I Agree" button, downloading or using the Application, you are agreeing to be bound by the terms and conditions of this Agreement.

This Agreement is a legal agreement between you (either an individual or a single entity) and Catch Inc. and it governs your use of the Application made available to you by Catch Inc. .

If you do not agree to the terms of this Agreement, do not click on the "I Agree" button and do not download or use the Application.

The Application is licensed, not sold, to you by Catch Inc. for use strictly in accordance with the terms of this Agreement.

License
Catch Inc. grants you a revocable, non-exclusive, non-transferable, limited license to download, install and use the Application strictly in accordance with the terms of this Agreement.

Restrictions
You agree not to, and you will not permit others to:
remove, alter or obscure any proprietary notice (including any notice of copyright or trademark) of Catch Inc. or its affiliates, partners, suppliers or the licensors of the Application.

Intellectual Property
The Application, including without limitation all copyrights, patents, trademarks, trade secrets and other intellectual property rights are, and shall remain, the sole and exclusive property of Catch Inc. .

Your Suggestions
Any feedback, comments, ideas, improvements or suggestions (collectively, "Suggestions") provided by you to Catch Inc. with respect to the Application shall remain the sole and exclusive property of Catch Inc. .

Catch Inc. shall be free to use, copy, modify, publish, or redistribute the Suggestions for any purpose and in any way without any credit or any compensation to you.

Modifications to Application
Catch Inc. reserves the right to modify, suspend or discontinue, temporarily or permanently, the Application or any service to which it connects, with or without notice and without liability to you.

Updates to Application
Catch Inc. may from time to time provide enhancements or improvements to the features/functionality of the Application, which may include patches, bug fixes, updates, upgrades and other modifications ("Updates").

Updates may modify or delete certain features and/or functionalities of the Application. You agree that Catch Inc. has no obligation to (i) provide any Updates, or (ii) continue to provide or enable any particular features and/or functionalities of the Application to you.

You further agree that all Updates will be (i) deemed to constitute an integral part of the Application, and (ii) subject to the terms and conditions of this Agreement.

Third-Party Services
The Application may display, include or make available third-party content (including data, information, applications and other products services) or provide links to third-party websites or services ("Third-Party Services").

You acknowledge and agree that Catch Inc. shall not be responsible for any Third-Party Services, including their accuracy, completeness, timeliness, validity, copyright compliance, legality, decency, quality or any other aspect thereof. Catch Inc. does not assume and shall not have any liability or responsibility to you or any other person or entity for any Third-Party Services.

Third-Party Services and links thereto are provided solely as a convenience to you and you access and use them entirely at your own risk and subject to such third parties' terms and conditions.

Privacy Policy
Catch Inc. collects, stores, maintains, and shares information about you in accordance with its Privacy Policy, which is available at https://app.termly.io/document/privacy-policy-for-mobile-app/35f58541-1568-4b2b-bab0-cb1aed6f9449. By accepting this Agreement, you acknowledge that you hereby agree and consent to the terms and conditions of our Privacy Policy.

Term and Termination
This Agreement shall remain in effect until terminated by you or Catch Inc. .

Catch Inc. may, in its sole discretion, at any time and for any or no reason, suspend or terminate this Agreement with or without prior notice.

This Agreement will terminate immediately, without prior notice from Catch Inc. , in the event that you fail to comply with any provision of this Agreement. You may also terminate this Agreement by deleting the Application and all copies thereof from your mobile device or from your computer.

Upon termination of this Agreement, you shall cease all use of the Application and delete all copies of the Application from your mobile device or from your computer.

Termination of this Agreement will not limit any of Catch Inc. 's rights or remedies at law or in equity in case of breach by you (during the term of this Agreement) of any of your obligations under the present Agreement.

Disputes
If anyone brings a claim against us related to your actions, content or information on Catch, you will indemnify and hold us harmless from and against all damages, losses, and expenses of any kind (including reasonable legal fees and costs) related to such claim. Although we provide rules for user conduct, we do not control or direct users' actions on Catch and are not responsible for the content or information users transmit or share on Catch. We are not responsible for any offensive, inappropriate, obscene, unlawful or otherwise objectionable content or information you may encounter on Catch. We are not responsible for the conduct, whether online or offline, of any user of Catch.

For U.S. Government End Users
The Application and related documentation are "Commercial Items", as that term is defined under 48 C.F.R. §2.101, consisting of "Commercial Computer Software" and "Commercial Computer Software Documentation", as such terms are used under 48 C.F.R. §12.212 or 48 C.F.R. §227.7202, as applicable. In accordance with 48 C.F.R. §12.212 or 48 C.F.R. §227.7202-1 through 227.7202-4, as applicable, the Commercial Computer Software and Commercial Computer Software Documentation are being licensed to U.S. Government end users (a) only as Commercial Items and (b) with only those rights as are granted to all other end users pursuant to the terms and conditions herein.

Export Compliance
You may not export or re-export the Application except as authorized by United States law and the laws of the jurisdiction in which the Application was obtained.

In particular, but without limitation, the Application may not be exported or re-exported (a) into or to a nation or a resident of any U.S. embargoed countries or (b) to anyone on the U.S. Treasury Department's list of Specially Designated Nationals or the U.S. Department of Commerce Denied Person's List or Entity List.

By installing or using any component of the Application, you represent and warrant that you are not located in, under control of, or a national or resident of any such country or on any such list.

Amendments to this Agreement
Catch Inc. reserves the right, at its sole discretion, to modify or replace this Agreement at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.

By continuing to access or use our Application after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Application.

Governing Law
The laws of North Carolina, United States, excluding its conflicts of law rules, shall govern this Agreement and your use of the Application. Your use of the Application may also be subject to other local, state, national, or international laws.

This Agreement shall not be governed by the United Nations Convention on Contracts for the International Sale of Good.

Contact Information
If you have any questions about this Agreement, please contact us.

Entire Agreement
The Agreement constitutes the entire agreement between you and Catch Inc. regarding your use of the Application and supersedes all prior and contemporaneous written or oral agreements between you and Catch Inc. .

You may be subject to additional terms and conditions that apply when you use or purchase other Catch Inc. 's services, which Catch Inc. will provide to you at the time of such use or purchase.`}
						</Text>
					</ScrollView>
				</View>
				<View style={{ alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
					<Text
						onPress={() => this.props.navigation.goBack()}
						style={{
							borderColor: 'white',
							borderRadius: 5,
							borderWidth: 1,
							color: 'white',
							padding: 10
						}}
						underlayColor='transparent'>
						I Agree
					</Text>
				</View>
			</View>
		);
	}
}