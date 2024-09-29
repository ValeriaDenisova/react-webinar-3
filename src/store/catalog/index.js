import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      listEn: [],
    };
  }

  async load(num) {
    let response = await fetch(`/api/v1/articles?lang=ru&limit=10&skip=${(num - 1) * 10}`);
    let json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ',
    );

    response = await fetch(`/api/v1/articles?lang=en&limit=10&skip=${(num - 1) * 10}`);
    json = await response.json();
    this.setState(
      {
        ...this.getState(),
        listEn: json.result.items,
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
