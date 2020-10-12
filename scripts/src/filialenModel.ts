import {Filiaal} from './filiaal';
import * as firebase from 'firebase/app';
import db from './firebase';

export class FilialenModel {
  database: firebase.database.Database
  db_root: firebase.database.Reference
  constructor() {
    this.database = db;
    this.db_root= this.database.ref();
  }

  async getFiliaalByNumber(filiaal_number: number): Promise<Filiaal> {
    return this.getBaseDataBasePromise(filiaal_number).then(
      (snapshot: firebase.database.DataSnapshot): Promise<Filiaal> => {
      if (!snapshot.exists()) return Promise.reject(`geen filiaal gevonden voor filiaalnummer: ${filiaal_number}`);
      return Promise.resolve(this.getSnapShotValue(snapshot));
    });
  };

  async getAllFilialen(): Promise<Array<Filiaal>> {
      const snapshot = await this.db_root.once('value');
      if (!snapshot.exists()) return Promise.reject('geen filialen uit de database kunnen halen');
      return Promise.resolve(Object.values(snapshot.val()));
  }

  private getBaseDataBasePromise(filiaal_number: number): Promise<firebase.database.DataSnapshot> {
    return this.db_root.orderByChild('filiaalnummer')
      .equalTo(filiaal_number)
      .once('value');
  }

  private getSnapShotValue(snapshot: firebase.database.DataSnapshot): Filiaal {
    return Object.values(snapshot.val())[0] as Filiaal;
  }
}
