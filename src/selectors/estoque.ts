import { EstoqueSaldo } from '@/models'
import { StoreState } from '@/redux'
import { EstoqueStoreState } from '@/redux/estoque'

const getEstoqueStore = (store: StoreState): EstoqueStoreState => store.estoque

const getSaldos = (store: StoreState): Array<EstoqueSaldo> => getEstoqueStore(store).saldos
const getPaginas = (store: StoreState): number => getEstoqueStore(store).paginas

export default {
  getSaldos,
  getPaginas,
}
