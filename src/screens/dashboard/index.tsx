import React from 'react';

import { Page } from '@/components';
import { PanelContextProvider } from '@/components/context/PanelContext';
import { ContextTableProvider } from '@/components/context/ContextTable';
import PostIt from '@/components/post-it/Post-it';
import TableV1 from '@/components/tables/TableV1';
import Strings from '@/constants';
import TableFull from '@/components/tables/TableFull';
import { Panel, PanelBody, PanelHeader } from '@/components/panel/panel';

const tables = [{
	Name: 'Applications', Size: '100kb', Type: 'Folder',
	inside: {
		Name: 'React', Size: '25kb', Type: 'Folder',
		inside: {
			Name: 'React', Size: '25kb', Type: 'Folder',
			inside: { Name: 'React', Size: '25kb', Type: 'Folder' }
		}
	}
},
{
	Name: 'Cloud', Size: '20kb', Type: 'Folder',
	inside: { Name: 'React', Size: '25kb', Type: 'Folder' }
}]

const headers = {
	Canal: 'Canal',
	Quantidade: 'Quantidade',
	Valor: 'Valor',

}


const expTable2 = [{
	Canal: 'B2B', Quantidade: 131, Valor: 'R$ 1.087.835,33'
},
{
	Canal: 'B2C', Quantidade: 185, Valor: 'R$ 102.885,33'
},
{
	Canal: 'Totais Faturamento', Quantidade: 316, Valor: 'R$ 1.190.720,66'
}
]

const expTable = [{
	arquivo: 'teste', data_importacao: 'teste', hr_importacao: 'teste', status: 'teste',
	child: { arquivo: 'teste', data_importacao: 'teste', hr_importacao: 'teste', status: 'teste' }
}, {
	arquivo: '1teste', data_importacao: '1teste', hr_importacao: '1teste', status: '1teste'
},
]

export default () => {
	return (
		<Page title='Dashboard-V1'>
			<div>
				<div className="row" style={{ justifyContent: 'center' }}>

					<div className='col-xl-3' >
						<PostIt color='#143356' simbol='fa fa-dollar-sign' titulo='Projeção' valor='R$ 13.571.198,12' />
						<PostIt color='#a7d32c' simbol='fa fa-dollar-sign' titulo='Realizado' valor='R$ 951.664,60' />
					</div>
					<div className='col-xl-9'>
						<PanelContextProvider>
							<Panel>
								<PanelHeader>
									Table Full com footer
								</PanelHeader>
								<PanelBody>
									<TableFull
										saldos={expTable2}
										headers={headers}
										footer={true} />
								</PanelBody>
							</Panel>
						</PanelContextProvider>
					</div>
				</div>
				<div className="row">
					<PanelContextProvider>
						<div className='col-xl-12'>
							<Panel>
								<PanelHeader>
									{Strings.arquivosImportados.title}
								</PanelHeader>
								<TableV1 saldos={expTable} headers={Strings.arquivosImportados2.table.headers} />
							</Panel>
						</div>
					</PanelContextProvider>
				</div>
				<div className="row">
					<div className='col-xl-12'>
						<PanelContextProvider>
							<Panel>
								<PanelHeader>
									{Strings.arquivosImportados.title}
								</PanelHeader>
								<PanelBody>
									<TableFull
										saldos={expTable}
										headers={Strings.arquivosImportados.table.headers}
										collumnSelect={true} />
								</PanelBody>
							</Panel>
						</PanelContextProvider>
					</div>
				</div>

			</div >
		</Page >
	)
}