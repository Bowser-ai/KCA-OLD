import {FilialenModel} from './filialenModel';
import {SearchFiliaalWidget} from './searchFiliaalWidget';
import {Filiaal} from './filiaal';
import $ from 'jquery';


class FilialenList {
  filialen_model: FilialenModel
  filialen_list_container: JQuery<HTMLElement>
  filialen_list: Array<Filiaal>

  constructor() {
    this.filialen_model = new FilialenModel();
    this.filialen_list_container = $('.filialen-list');
    this.filialen_list = [];
    this.create_filialen_list();
    this.add_search_bar_handler();
  }

  async create_filialen_list(list: Array<Filiaal>|null = null) {
    if (list === null || this.filialen_list.length === 0) {
      this.filialen_list = await this.filialen_model.getAllFilialen();
    }
    for (const filiaal of (list || this.filialen_list)) {
      const li_element = $('<li>');
      let filiaal_details = '';
      for (const attr of SearchFiliaalWidget.sorted_filiaal_keys(Object.keys(filiaal))){
        filiaal_details += SearchFiliaalWidget.decorate_filiaal_items(filiaal, attr);
      }
      li_element.html(filiaal_details);
      this.filialen_list_container.append(li_element);
    }
  }
  add_search_bar_handler(){
    const search_bar_elem = $('.search-bar');
    search_bar_elem.on('keypress', (e) => {
      if (e.which === 13){
        const value = search_bar_elem.val() as string;
        this.filialen_list_container.children().remove();
        if (value === '' || value === null) {
          this.create_filialen_list();
        }
        const filtered_list = this.filialen_list.filter((filiaal: Filiaal): boolean => {
          return filiaal['address'].toLowerCase().includes(value.toLowerCase());
        });
        this.create_filialen_list(filtered_list);
      }
    });
  }
}
new FilialenList();
