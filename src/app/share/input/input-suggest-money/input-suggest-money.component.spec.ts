import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSuggestMoneyComponent } from './input-suggest-money.component';

describe('InputSuggestMoneyComponent', () => {
  let component: InputSuggestMoneyComponent;
  let fixture: ComponentFixture<InputSuggestMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSuggestMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSuggestMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
