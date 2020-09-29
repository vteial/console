import {Model} from './core';
import {HttpParams} from '@angular/common/http';
import {prop, required} from '@rxweb/reactive-form-validators';

export class Doc extends Model {

  static TYPES = [
    {name: 'profilePhoto', type: 'image', label: 'Profile Photo'},
    {name: 'drivingLicence', type: 'image', label: 'Driving Licence'},
  ];

  static asTypesMap(): {} {
    const typesMap = {};
    Doc.TYPES.forEach(docType => {
      typesMap[docType.name] = docType;
    });
    return typesMap;
  }

  @required()
  name: string;

  type: string;

  fileName: string;

  @required()
  file: any;

  label: string;

  srcPath: string;

  srcUrl: string;

  constructor() {
    super();
  }

}
