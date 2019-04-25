import { TestBed } from '@angular/core/testing';

import { DBService } from './db.service';

describe('SensorDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DBService = TestBed.get(DBService);
    expect(service).toBeTruthy();
  });
});
