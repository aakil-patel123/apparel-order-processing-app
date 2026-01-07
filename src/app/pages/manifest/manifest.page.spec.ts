import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManifestPage } from './manifest.page';

describe('ManifestPage', () => {
  let component: ManifestPage;
  let fixture: ComponentFixture<ManifestPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManifestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
