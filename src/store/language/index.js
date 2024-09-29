
import StoreModule from '../module';



class Language extends StoreModule {
  initState() {
    return {
      language: localStorage.getItem('language'),
    };

  }


  languageSelection(meaning) {
    this.setState(
      {
        ...this.getState(),
        language: meaning,
      },
    );
  
    localStorage.setItem('language', meaning);

  }

}

export default Language;