import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-customize-settings-modal',
  templateUrl: './customize-settings-modal.component.html',
  styleUrls: ['./customize-settings-modal.component.scss']
})
export class CustomizeSettingsModalComponent implements OnInit {
  items: SelectItem[] = [
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test1' },
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test2' },
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test3' },
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test4' },
    { label: 'Okay how about this', value: 'test5' },
    { label: 'B-but memes!!!111', value: 'test6' },
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test7' },
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test8' },
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test9' },
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test1' },
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test2' },
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test3' },
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test4' },
    { label: 'Okay how about this', value: 'test5' },
    { label: 'B-but memes!!!111', value: 'test6' },
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test7' },
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test8' },
    { label: 'Do not allow Blind Items at all, at any time, ever, unless?', value: 'test9' },
  ];
  selected: SelectItem[] = [];
  private open: boolean = false;
  private form: FormGroup;

  constructor() { }

  ngOnInit() {
    const fb = new FormBuilder();
    this.form = fb.group({
      settings: [null]
    });
  }

  getForm(): FormGroup {
    return this.form;
  }

  getOpen(): boolean {
    return this.open;
  }

  setOpen(open: boolean) {
    this.open = open;
  }
}
