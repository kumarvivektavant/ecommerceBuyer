import { TestBed } from '@angular/core/testing';

import { BuyerserviceService } from './buyerservice.service';

describe('BuyerserviceService', () => {
  let service: BuyerserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyerserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
