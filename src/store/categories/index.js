import StoreModule from '../module';

class Categories extends StoreModule {
  initState() {
    return {
      list: [],
      value: 'categories',
      selected: 0,
    };
  }

    async load(){
        const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
        const json = await response.json();
        this.setState(
          {
            ...this.getState(),
            list: json.result.items,
          },)
    }

    selectedCategory(num) {
      this.setState(
        {
          ...this.getState(),
          selected: Number(num),
        },
      );
  
    }




}

export default Categories;