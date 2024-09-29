import StoreModule from '../module';



class Pagination extends StoreModule {
  initState() {
    return {
      totalPage: 55,
      currentPage: 1,
      itemsOnPage: 10
    };

  }


}

export default Pagination;