import {FilialenModel} from './filialenModel';
import {Filiaal} from './filiaal';
import $ from 'jquery';

export class SearchFiliaalWidget {
  input_box: JQuery<HTMLInputElement>
  zoek_button: JQuery<HTMLButtonElement>
  filialen_list: JQuery<HTMLElement>
  filialen_model: FilialenModel

  constructor() {
    this.input_box = $('.input-box');
    this.zoek_button = $('.btn-search');
    this.filialen_list = $('.filialen-list');
    this.filialen_model = new FilialenModel();

    this.add_zoek_button_handler();
  }

  private add_zoek_button_handler() {
    this.zoek_button.on('click', () => {
      this.filialen_list.children().remove();

      const input: string = this.input_box.val() as string;
      const data = this.filialen_model.getFiliaalByNumber(Number(input));
      const filiaal_list_element = $('<li>');
      let filiaal_details = '';

      data.then((filiaal: Filiaal) => {
        for (const attr of SearchFiliaalWidget.sorted_filiaal_keys(Object.keys(filiaal))) {
          filiaal_details += SearchFiliaalWidget.decorate_filiaal_items(filiaal, attr);
        }

        filiaal_list_element.html(filiaal_details);
        this.filialen_list.append(filiaal_list_element);

      }).catch((error: string) => {
        filiaal_details += `<p>${error}</p>`;
        filiaal_list_element.html(filiaal_details);
        this.filialen_list.append(filiaal_list_element);
      });
      this.input_box.val('');
    });
  }

  static decorate_filiaal_items(filiaal: Filiaal, attr: string): string{
    let filiaal_html_attr = `<p class="filiaal-attr">${SearchFiliaalWidget.capitalize(attr)}</p>`;
    let filiaal_html_val = `<p class="filiaal-val">${filiaal[attr]}</p>`;
    filiaal_html_val = SearchFiliaalWidget.add_link(attr, filiaal, filiaal_html_val);
    return filiaal_html_attr + filiaal_html_val;
  }

  static sorted_filiaal_keys(keys: Array<string>): Array<string>{
    const sort_schema: {[index: string]: number} = {
      filiaalnummer: 1,
      address: 2,
      postcode: 3,
      telnum: 4,
      info: 5,
      mededeling: 6,
  };
  return keys.sort((a: string, b: string): number => {
    return sort_schema[a] - sort_schema[b];
    });
  }

  static capitalize(input: string): string {
    return input.replace(input[0], input[0].toUpperCase());
  }

  static add_link(attr: string, filiaal: Filiaal, html_element: string): string {
    if (attr.toLowerCase() === 'address') {
      return `<a href="https://maps.google.com/?q=${filiaal.address}">${html_element}</a>`
    }
    else {
      return html_element;
    }
  }
}
