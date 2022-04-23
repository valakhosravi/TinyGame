import { TestBed } from '@angular/core/testing';

import { WarriorService } from './warrior.service';

describe('WarriorService', () => {
  let service: WarriorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarriorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
