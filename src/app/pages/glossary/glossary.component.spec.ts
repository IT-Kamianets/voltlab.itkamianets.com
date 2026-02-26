import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlossaryComponent } from './glossary.component';

describe('GlossaryComponent', () => {
  let component: GlossaryComponent;
  let fixture: ComponentFixture<GlossaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlossaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlossaryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
