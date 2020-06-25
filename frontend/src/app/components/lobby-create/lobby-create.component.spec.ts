import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyCreateComponent } from './lobby-create.component';

describe('LobbyCreateComponent', () => {
  let component: LobbyCreateComponent;
  let fixture: ComponentFixture<LobbyCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LobbyCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
