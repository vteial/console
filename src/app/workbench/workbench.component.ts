import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../@shared/base.component';
import {ApiService} from "../@shared/api.service";
import {ToastrService} from "ngx-toastr";
import {RxFormBuilder} from "@rxweb/reactive-form-validators";

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.css']
})
export class WorkbenchComponent extends BaseComponent implements OnInit {

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private formBuilder: RxFormBuilder) {
    super();
    super.viewName = 'Workbench';
  }

  ngOnInit(): void {
  }

}
