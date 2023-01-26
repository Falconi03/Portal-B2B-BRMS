import { TitulosReceber } from '@/models'
import { StoreState } from '@/redux'
import { TitulosReceberStoreState } from '@/redux/titulosreceber'

const getTitulosReceberStore = (store: StoreState): TitulosReceberStoreState => store.titulosReceber

const getTitulos = (store: StoreState): Array<TitulosReceber> => getTitulosReceberStore(store).titulos
const getPaginas = (store: StoreState): number => getTitulosReceberStore(store).paginas

export default {
  getTitulos,
  getPaginas,
}