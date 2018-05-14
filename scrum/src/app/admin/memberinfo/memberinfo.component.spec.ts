import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberinfoComponent } from './memberinfo.component';

describe('MemberinfoComponent', () => {
  let component: MemberinfoComponent;
  let fixture: ComponentFixture<MemberinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
